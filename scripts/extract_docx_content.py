"""
Generate src/content/pages.ts from VizeDraw_Optimized_Website_Content.docx.

The website copy is extracted verbatim (paragraphs, bold lead-ins, numbered
steps, tables and CTA lines) so the rendered site cannot drift from the
approved document. Presentation lives in React components; this file only
structures the text.

Usage:  python scripts/extract_docx_content.py path/to/content.docx
"""
import json
import re
import sys
import zipfile
from xml.etree import ElementTree as ET

W = "{http://schemas.openxmlformats.org/wordprocessingml/2006/main}"
OUT = "src/content/pages.ts"

# Prefixes that label implementation fields rather than visible copy.
KV_PREFIXES = ("Help text", "Privacy line", "Success message", "Submission error",
               "Plan selector", "Currency selector")
FAQ_SECTIONS = ("Homepage questions", "Enterprise questions")


def slug(value):
    return re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")


def runs(p):
    out = []
    for r in p.findall(W + "r"):
        text = "".join(t.text or "" for t in r.iter(W + "t"))
        rpr = r.find(W + "rPr")
        bold = rpr is not None and rpr.find(W + "b") is not None
        if text:
            out.append((bold, text))
    return out


def style(p):
    ppr = p.find(W + "pPr")
    if ppr is None:
        return ""
    s = ppr.find(W + "pStyle")
    return s.get(W + "val") if s is not None else ""


def split_term(rs):
    """Return (term, text) where term is the bold lead-in, if any."""
    if len(rs) > 1 and rs[0][0] and not rs[1][0]:
        return rs[0][1].strip(), "".join(t for _, t in rs[1:]).strip()
    return None, "".join(t for _, t in rs).strip()


def main(path):
    root = ET.fromstring(zipfile.ZipFile(path).read("word/document.xml"))
    body = root.find(W + "body")
    pages, page, section = [], None, None

    def block(b):
        section["blocks"].append(b)

    for el in body:
        if el.tag == W + "tbl":
            if page is None or section is None:
                continue
            rows = [[" / ".join("".join(t.text or "" for t in p.iter(W + "t"))
                                 for p in tc.iter(W + "p") if "".join(t.text or "" for t in p.iter(W + "t")).strip())
                     for tc in tr.findall(W + "tc")] for tr in el.findall(W + "tr")]
            block({"type": "table", "head": rows[0], "rows": rows[1:]})
            continue
        if el.tag != W + "p":
            continue
        rs = runs(el)
        text = "".join(t for _, t in rs).strip()
        if not text:
            continue
        st = style(el)
        m = re.match(r"Page (\d+) (.+)", text)
        if st == "Heading1":
            if m:
                page = {"id": int(m.group(1)), "name": m.group(2), "sections": []}
                pages.append(page)
                section = None
            else:
                page = None  # shared/implementation content is handled by hand
            continue
        if page is None:
            continue
        if st == "Heading2":
            section = {"heading": text, "id": slug(text), "blocks": []}
            page["sections"].append(section)
            continue
        meta = re.match(r"(Route|Page purpose|Title tag|Meta description|Primary search theme): (.*)", text)
        if section is None and meta:
            key = {"Route": "route", "Page purpose": "purpose", "Title tag": "title",
                   "Meta description": "description", "Primary search theme": "searchTheme"}[meta.group(1)]
            page[key] = meta.group(2).strip()
            continue
        cta = re.match(r"(Primary|Secondary) button:\s*(.+?)\s+Destination:\s*(.+)$", text)
        if cta:
            link = {"label": cta.group(2).strip(), "to": cta.group(3).strip()}
            last = section["blocks"][-1] if section["blocks"] else None
            if cta.group(1) == "Secondary" and last and last["type"] == "cta":
                last["secondary"] = link
            else:
                block({"type": "cta", "primary": link})
            continue
        kv = next((k for k in KV_PREFIXES if text.startswith(k + ":")), None)
        if kv:
            block({"type": "kv", "key": kv, "value": text[len(kv) + 1:].strip()})
            continue
        if st == "ListBullet":
            term, rest = split_term(rs)
            item = {"term": term, "text": rest} if term else {"text": rest}
            last = section["blocks"][-1] if section["blocks"] else None
            if last and last["type"] == "list":
                last["items"].append(item)
            else:
                block({"type": "list", "items": [item]})
            continue
        step = re.match(r"(\d+)\.\s", text)
        if step:
            term, rest = split_term(rs[1:]) if rs and re.fullmatch(r"\d+\.\s*", rs[0][1]) else (None, text[step.end():])
            item = {"term": term, "text": rest} if term else {"text": rest}
            last = section["blocks"][-1] if section["blocks"] else None
            if last and last["type"] == "steps":
                last["items"].append(item)
            else:
                block({"type": "steps", "items": [item]})
            continue
        block({"type": "p", "text": text})

    # Question/answer pairs become FAQ blocks.
    for page in pages:
        for s in page["sections"]:
            if s["heading"] in FAQ_SECTIONS:
                ps = [b["text"] for b in s["blocks"] if b["type"] == "p"]
                others = [b for b in s["blocks"] if b["type"] != "p"]
                s["blocks"] = [{"type": "faq", "items": [{"q": ps[i], "a": ps[i + 1]} for i in range(0, len(ps), 2)]}] + others

    header = ("// GENERATED from VizeDraw_Optimized_Website_Content.docx by\n"
              "// scripts/extract_docx_content.py. Copy is verbatim; do not rewrite it here.\n"
              "import type { Page } from './types'\n\n")
    with open(OUT, "w", encoding="utf-8", newline="\n") as f:
        f.write(header + "export const pages: Page[] = " + json.dumps(pages, ensure_ascii=False, indent=2) + "\n")
    print(f"Wrote {len(pages)} pages to {OUT}")


if __name__ == "__main__":
    main(sys.argv[1])
