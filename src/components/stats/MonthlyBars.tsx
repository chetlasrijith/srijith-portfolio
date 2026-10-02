import { useInView } from '../../hooks/useInView'
import { useCountUp } from '../../hooks/useCountUp'

const SERIES = [
  { key: 'leetcode', label: 'LeetCode', opacity: 1 },
  { key: 'codeforces', label: 'Codeforces', opacity: 0.55 },
  { key: 'other', label: 'Everything else', opacity: 0.24 },
] as const

/**
 * Twelve columns, stacked by platform, bars clipped to a pill. The whole
 * stack scales from its baseline when it scrolls into view.
 */
export function MonthlyBars({ data }: { data: typeof import('../../data/portfolio').codingStats.monthly }) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.2 })
  const max = Math.max(...data.map((d) => d.leetcode + d.codeforces + d.other))
  const total = data.reduce(
    (sum, d) => sum + d.leetcode + d.codeforces + d.other,
    0
  )
  const shownTotal = useCountUp(total, inView, 1100)

  return (
    <div ref={ref}>
      <div className="flex h-[220px] items-end gap-[6px]">
        {data.map((d, i) => {
          const t = d.leetcode + d.codeforces + d.other
          const h = (t / max) * 100
          return (
            <div key={d.month} className="group/bar relative flex flex-1 flex-col justify-end">
              {/* Hover readout — a graphite pill, not a tooltip bubble. */}
              <div className="pointer-events-none absolute -top-2 left-1/2 z-10 hidden -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-full border border-silver/15 bg-graphite px-3 py-1.5 group-hover/bar:block">
                <span className="font-mono text-[11px] text-paper tabular-nums">{t}</span>
                <span className="ml-2 font-mono text-[11px] text-stone">{d.month}</span>
              </div>

              <div
                className="flex flex-col-reverse overflow-hidden rounded-full bg-graphite"
                style={{
                  height: `${h}%`,
                  transform: inView ? 'scaleY(1)' : 'scaleY(0)',
                  transformOrigin: 'bottom',
                  transition: `transform 900ms var(--ease-out-expo) ${i * 45}ms`,
                }}
              >
                {SERIES.map((s) => (
                  <div
                    key={s.key}
                    style={{
                      height: `${(d[s.key] / t) * 100}%`,
                      background: '#fdfdfd',
                      opacity: s.opacity,
                    }}
                  />
                ))}
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-4 flex gap-[6px]">
        {data.map((d) => (
          <span
            key={d.month}
            className="flex-1 text-center font-mono text-[10px] tracking-[0.02em] text-stone"
          >
            {d.month}
          </span>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-6 border-t border-slate pt-6">
        <div className="flex flex-wrap items-center gap-6">
          {SERIES.map((s) => (
            <span key={s.key} className="flex items-center gap-2">
              <span
                className="h-2 w-2 rounded-full bg-paper"
                style={{ opacity: s.opacity }}
              />
              <span className="eyebrow text-ash">{s.label}</span>
            </span>
          ))}
        </div>
        <div className="text-right">
          <span className="text-[21px] leading-none tracking-[-0.02em] text-paper tabular-nums">
            {shownTotal}
          </span>
          <span className="eyebrow ml-2 text-stone">in 12 months</span>
        </div>
      </div>
    </div>
  )
}