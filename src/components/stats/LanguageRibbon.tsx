import { useInView } from '../../hooks/useInView'

type Lang = { name: string; pct: number }

const OPACITIES = [1, 0.72, 0.52, 0.36, 0.22, 0.12]

/**
 * Not a pie chart. One horizontal ribbon split proportionally, segments at
 * descending opacity, labels beneath. Reads as a printed figure, not a widget.
 */
export function LanguageRibbon({ languages }: { languages: Lang[] }) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.3 })

  return (
    <div ref={ref}>
      <div className="flex h-3 w-full gap-[3px] overflow-hidden rounded-full">
        {languages.map((l, i) => (
          <div
            key={l.name}
            className="h-full origin-left"
            style={{
              width: `${l.pct}%`,
              background: '#fdfdfd',
              opacity: OPACITIES[i] ?? 0.1,
              transform: inView ? 'scaleX(1)' : 'scaleX(0)',
              transition: `transform 800ms var(--ease-out-expo) ${i * 90}ms`,
            }}
            title={`${l.name} ${l.pct}%`}
          />
        ))}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-3">
        {languages.map((l, i) => (
          <div key={l.name} className="flex items-center gap-3">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full bg-paper"
              style={{ opacity: OPACITIES[i] ?? 0.1 }}
            />
            <span className="flex-1 text-[14px] text-pearl">{l.name}</span>
            <span className="font-mono text-[13px] text-stone tabular-nums">{l.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}