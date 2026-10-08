import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

// A slow fluid field behind the whole site: domain-warped noise in the glass
// palette (soft white, mist, logo teal, cool stone). The pointer stirs the
// flow locally. Rendered at reduced resolution — the field is soft, so it
// scales up cleanly — paused in hidden tabs, and a single still frame when
// the viewer prefers reduced motion. Without WebGL the CSS gradient on
// .fluid-bg shows instead.

const VERT = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }`

const FRAG = `
precision mediump float;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_stir;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 3; i++) { v += a * noise(p); p = p * 2.03 + 11.7; a *= 0.5; }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  float aspect = u_res.x / u_res.y;
  vec2 p = vec2(uv.x * aspect, uv.y) * 0.62;
  vec2 m = vec2(u_mouse.x * aspect, u_mouse.y) * 0.62;
  float t = u_time * 0.028;

  // Local stir around the pointer: a soft rotational push that fades out.
  vec2 dm = p - m;
  float fall = exp(-dot(dm, dm) * 9.0) * u_stir;
  vec2 stir = vec2(-dm.y, dm.x) * fall * 1.6;

  vec2 q = vec2(fbm(p + vec2(0.0, t)), fbm(p + vec2(5.2, 1.3) - t));
  vec2 r = vec2(fbm(p + 2.2 * q + vec2(1.7, 9.2) + t * 1.2 + stir),
                fbm(p + 2.2 * q + vec2(8.3, 2.8) - t * 0.9 - stir));
  float f = fbm(p + 2.0 * r);

  vec3 ivory = vec3(0.949, 0.980, 0.980);
  vec3 sand  = vec3(0.776, 0.898, 0.898);
  vec3 clay  = vec3(0.561, 0.827, 0.839);
  vec3 stone = vec3(0.718, 0.843, 0.843);
  vec3 ember = vec3(0.310, 0.714, 0.729);

  // Large, soft colour fields — an iOS-style wallpaper, not marbling.
  vec3 col = mix(ivory, sand, smoothstep(0.25, 0.75, f));
  col = mix(col, clay, smoothstep(0.3, 0.8, q.x));
  col = mix(col, stone, smoothstep(0.35, 0.75, r.y) * 0.95);
  col = mix(col, ember, smoothstep(0.5, 0.85, q.y * r.x * 1.6) * 0.7);
  col = mix(col, ivory, smoothstep(0.68, 0.92, f) * 0.18);

  // Fine grain to avoid banding.
  col += (hash(gl_FragCoord.xy + fract(u_time)) - 0.5) * 0.012;
  gl_FragColor = vec4(col, 1.0);
}
`

const SCALE = 0.45

export function FluidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = canvas.getContext('webgl', { antialias: false, depth: false, alpha: false, powerPreference: 'low-power' })
    if (!gl) return

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!
      gl.shaderSource(s, src)
      gl.compileShader(s)
      return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null
    }
    const vs = compile(gl.VERTEX_SHADER, VERT)
    const fs = compile(gl.FRAGMENT_SHADER, FRAG)
    if (!vs || !fs) return
    const prog = gl.createProgram()!
    gl.attachShader(prog, vs)
    gl.attachShader(prog, fs)
    gl.linkProgram(prog)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return
    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(prog, 'p')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

    const uRes = gl.getUniformLocation(prog, 'u_res')
    const uTime = gl.getUniformLocation(prog, 'u_time')
    const uMouse = gl.getUniformLocation(prog, 'u_mouse')
    const uStir = gl.getUniformLocation(prog, 'u_stir')

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.max(1, Math.round(window.innerWidth * dpr * SCALE))
      canvas.height = Math.max(1, Math.round(window.innerHeight * dpr * SCALE))
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform2f(uRes, canvas.width, canvas.height)
    }
    resize()

    // Pointer: eased position, and a stir amount driven by pointer speed.
    const target = { x: 0.5, y: 0.5 }
    const mouse = { x: 0.5, y: 0.5 }
    let stir = 0
    let lastX = 0
    let lastY = 0
    const onMove = (e: PointerEvent) => {
      const x = e.clientX / window.innerWidth
      const y = 1 - e.clientY / window.innerHeight
      stir = Math.min(1, stir + Math.hypot(x - lastX, y - lastY) * 6)
      lastX = x
      lastY = y
      target.x = x
      target.y = y
    }

    const start = performance.now()
    let frame = 0
    const draw = (now: number) => {
      mouse.x += (target.x - mouse.x) * 0.06
      mouse.y += (target.y - mouse.y) * 0.06
      stir *= 0.965
      gl.uniform1f(uTime, reduced ? 12.0 : (now - start) / 1000 + 12.0)
      gl.uniform2f(uMouse, mouse.x, mouse.y)
      gl.uniform1f(uStir, stir)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }
    const loop = (now: number) => {
      draw(now)
      frame = requestAnimationFrame(loop)
    }

    const onVisibility = () => {
      cancelAnimationFrame(frame)
      if (!document.hidden && !reduced) frame = requestAnimationFrame(loop)
    }

    canvas.classList.add('is-ready')
    if (reduced) {
      draw(performance.now())
    } else {
      frame = requestAnimationFrame(loop)
      window.addEventListener('pointermove', onMove, { passive: true })
      document.addEventListener('visibilitychange', onVisibility)
    }
    const onResize = () => {
      resize()
      if (reduced) draw(performance.now())
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibility)
      // Release GPU objects but keep the context alive: StrictMode remounts
      // this effect on the same canvas, and a lost context cannot be reused.
      gl.deleteBuffer(buf)
      gl.deleteProgram(prog)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
    }
  }, [reduced])

  return (
    <div className="fluid-bg" aria-hidden="true">
      <canvas ref={canvasRef} key={String(reduced)} />
    </div>
  )
}
