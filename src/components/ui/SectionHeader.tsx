import { useInView } from '../../hooks/useInView'

type Props = {
  index: string
  label: string
  title: string
  /** Optional deck under the title, 18px pearl. */
  note?: string
}

/**
 * Catalogue entry header: numbered eyebrow, a hairline that draws left to
 * right, then the heading.
 */
export function SectionHeader({ index, label, title, note }: Props) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.4 })

  return (
    <header ref={ref} className="mb-12 md:mb-16">
      <div className="flex items-baseline gap-4">
        <span className="eyebrow text-ash">{index}</span>
        <span className="eyebrow">{label}</span>
        <span
          className="h-px flex-1 origin-left bg-silver/15"
          style={{
            transform: inView ? 'scaleX(1)' : 'scaleX(0)',
            transition: 'transform 1100ms var(--ease-out-expo) 120ms',
          }}
        />
      </div>

      <div className="reveal-line mt-6">
        <span
          style={{
            transform: inView ? 'translate3d(0,0,0)' : 'translate3d(0,110%,0)',
            transition: 'transform 900ms var(--ease-out-expo) 60ms',
          }}
        >
          <h2 className="max-w-[820px] text-[26px] leading-[1.2] tracking-[-0.3px] text-paper md:text-[30px] md:leading-[1.25] md:tracking-[-0.3px]">
            {title}
          </h2>
        </span>
      </div>

      {note ? (
        <p className="mt-4 max-w-[560px] text-body-lg text-pearl">{note}</p>
      ) : null}
    </header>
  )
}