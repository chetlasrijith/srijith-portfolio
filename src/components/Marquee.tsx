type Props = {
  items: string[]
  /** 'edge' alpha-masks both ends. 'none' for the full-bleed footer strip. */
  variant?: 'edge' | 'none'
  caption?: string
}

/**
 * Slow infinite ticker. Pauses on hover so a visitor can actually read it.
 */
export function Marquee({ items, variant = 'edge', caption }: Props) {
  const row = [...items, ...items]

  return (
    <div className="group relative">
      {caption ? <p className="eyebrow mb-4 text-center text-stone">{caption}</p> : null}
      <div
        className={
          variant === 'edge'
            ? 'overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]'
            : 'overflow-hidden'
        }
      >
        <div className="anim-marquee flex w-max group-hover:[animation-play-state:paused]">
          {row.map((item, i) => (
            <span key={`${item}-${i}`} className="flex items-center">
              <span className="eyebrow whitespace-nowrap px-8 text-stone">{item}</span>
              <span className="h-1 w-1 rounded-full bg-slate" />
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}