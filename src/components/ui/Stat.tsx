import { useInView } from '../../hooks/useInView'
import { useCountUp } from '../../hooks/useCountUp'

type Props = {
  value: number
  label: string
  note?: string
  /** 96px display by default; drop to the 60px step for dense rows. */
  size?: 'lg' | 'md'
  suffix?: string
}

/**
 * A number that counts itself up when it scrolls into view. Zero colour.
 */
export function Stat({ value, label, note, size = 'lg', suffix }: Props) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.4 })
  const n = useCountUp(value, inView)

  return (
    <div ref={ref}>
      <div
        className={
          size === 'lg'
            ? 'text-[38px] leading-none tracking-[-0.5px] text-paper tabular-nums sm:text-[44px] lg:text-[52px]'
            : 'text-[28px] leading-none tracking-[-0.3px] text-paper tabular-nums'
        }
      >
        {n.toLocaleString('en-US')}
        {suffix ? <span className="text-stone">{suffix}</span> : null}
      </div>
      <div className="eyebrow mt-3 text-ash">{label}</div>
      {note ? <p className="mt-2 max-w-[220px] text-caption text-stone">{note}</p> : null}
    </div>
  )
}