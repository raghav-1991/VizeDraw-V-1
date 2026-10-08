// Shared drawing geometry for the studio illustrations.

/** Scalloped revision cloud around a rectangle. */
export function cloud(x: number, y: number, w: number, h: number, r = 6) {
  const nx = Math.max(2, Math.round(w / (r * 2)))
  const ny = Math.max(2, Math.round(h / (r * 2)))
  const dx = w / nx
  const dy = h / ny
  let d = `M${x} ${y}`
  for (let i = 0; i < nx; i++) d += ` a${r} ${r} 0 0 1 ${dx} 0`
  for (let i = 0; i < ny; i++) d += ` a${r} ${r} 0 0 1 0 ${dy}`
  for (let i = 0; i < nx; i++) d += ` a${r} ${r} 0 0 1 ${-dx} 0`
  for (let i = 0; i < ny; i++) d += ` a${r} ${r} 0 0 1 0 ${-dy}`
  return d + 'Z'
}
