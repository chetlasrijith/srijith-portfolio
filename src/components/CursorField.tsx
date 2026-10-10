import { useEffect, useRef } from 'react'

/**
 * A barely-there 1px grid across the whole canvas that brightens within ~380px
 * of the pointer. Silver at two very low opacities. The lightness comes from
 * the mask moving, never from a new colour. Retires on touch devices.
 */
export function CursorField({ faded }: { faded: boolean }) {
  const layer = useRef<HTMLDivElement | null>(null)
  const cursor = useRef<HTMLDivElement | null>(null)
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
      cursor.current?.style.setProperty('--px', `${point.current.x}px`)
      cursor.current?.style.setProperty('--py', `${point.current.y}px`)
    }
    const onMove = (e: PointerEvent) => {
      point.current = { x: e.clientX, y: e.clientY }
      const target = e.target instanceof Element ? e.target : null
      const cursorElement = cursor.current
      if (cursorElement) {
        cursorElement.dataset.visible = String(
          !target?.closest('input, textarea, select, [contenteditable="true"]')
        )
        cursorElement.dataset.hover = String(
          Boolean(target?.closest('a, button, [role="button"], summary, label'))
        )
      }
      if (!frame.current) frame.current = requestAnimationFrame(apply)
    }
    const onPointerDown = () => {
      if (cursor.current) cursor.current.dataset.pressed = 'true'
    }
    const onPointerUp = () => {
      if (cursor.current) delete cursor.current.dataset.pressed
    }
    const onPointerLeave = () => {
      if (cursor.current) cursor.current.dataset.visible = 'false'
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointerup', onPointerUp)
    window.addEventListener('pointercancel', onPointerUp)
    window.addEventListener('pointerleave', onPointerLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointerup', onPointerUp)
      window.removeEventListener('pointercancel', onPointerUp)
      window.removeEventListener('pointerleave', onPointerLeave)
      if (frame.current) cancelAnimationFrame(frame.current)
    }
  }, [])

  const grid = {
    backgroundImage:
      'linear-gradient(to right, rgba(229,229,229,0.24) 1px, transparent 1px),' +
      'linear-gradient(to bottom, rgba(229,229,229,0.24) 1px, transparent 1px)',
    backgroundSize: '88px 88px',
  }
  const baseGrid = {
    ...grid,
    backgroundImage:
      'linear-gradient(to right, rgba(229,229,229,0.12) 1px, transparent 1px),' +
      'linear-gradient(to bottom, rgba(229,229,229,0.12) 1px, transparent 1px)',
  }

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-0 hidden select-none md:block" aria-hidden="true">
        {/* Base grid, always on. */}
        <div className="absolute inset-0" style={{ ...baseGrid, opacity: 0.4 }} />
        {/* The pointer spotlight reveals a brighter grid around the cursor. */}
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
        {/* The grid retires as soon as you leave the hero because it is texture, not furniture. */}
        <div
          className={`absolute inset-0 bg-obsidian transition-opacity duration-700 ${
            faded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>

      <div ref={cursor} className="site-cursor" aria-hidden="true">
        <span className="site-cursor__ring" />
        <span className="site-cursor__tick site-cursor__tick--top" />
        <span className="site-cursor__tick site-cursor__tick--right" />
        <span className="site-cursor__tick site-cursor__tick--bottom" />
        <span className="site-cursor__tick site-cursor__tick--left" />
        <span className="site-cursor__center" />
      </div>
    </>
  )
}