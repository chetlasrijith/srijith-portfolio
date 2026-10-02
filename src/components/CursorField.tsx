import { useEffect, useRef } from 'react'

/**
 * A barely-there 1px grid across the whole canvas that brightens within ~380px
 * of the pointer. Silver at two very low opacities — the lightness comes from
 * the mask moving, never from a new colour. Retires on touch devices.
 */
export function CursorField({ faded }: { faded: boolean }) {
  const layer = useRef<HTMLDivElement | null>(null)
  const frame = useRef(0)
  const point = useRef({ x: -9999, y: -9999 })

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    const el = layer.current
    if (!el) return

    const apply = () => {
      frame.current = 0
      el.style.setProperty('--px', `${point.current.x}px`)
      el.style.setProperty('--py', `${point.current.y}px`)
    }
    const onMove = (e: PointerEvent) => {
      point.current = { x: e.clientX, y: e.clientY }
      if (!frame.current) frame.current = requestAnimationFrame(apply)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      if (frame.current) cancelAnimationFrame(frame.current)
    }
  }, [])

  const grid = {
    backgroundImage:
      'linear-gradient(to right, rgba(229,229,229,0.09) 1px, transparent 1px),' +
      'linear-gradient(to bottom, rgba(229,229,229,0.09) 1px, transparent 1px)',
    backgroundSize: '88px 88px',
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-0 hidden select-none md:block" aria-hidden="true">
      {/* Base grid, always on. */}
      <div className="absolute inset-0" style={{ ...grid, opacity: 0.35 }} />
      {/* Brighter grid, revealed only near the pointer. */}
      <div
        ref={layer}
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          ...grid,
          maskImage: 'radial-gradient(380px circle at var(--px, 50%) var(--py, 50%), #000 0%, transparent 72%)',
          WebkitMaskImage:
            'radial-gradient(380px circle at var(--px, 50%) var(--py, 50%), #000 0%, transparent 72%)',
        }}
      />
      {/* The grid retires as soon as you leave the hero — it is texture, not furniture. */}
      <div
        className={`absolute inset-0 bg-obsidian transition-opacity duration-700 ${
          faded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  )
}