import { useMemo } from 'react'
import { codingStats } from '../../data/portfolio'
import { useInView } from '../../hooks/useInView'

/** Deterministic PRNG so the "history" is stable across reloads. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const DAYS = ['Mon', '', 'Wed', '', 'Fri', '', 'Sun']
const LEVEL_OPACITY = [0.06, 0.2, 0.42, 0.72, 1]

/**
 * A year of days as a dot matrix. White at five opacities. Exactly one cell —
 * the record streak — carries the single accent colour the system allows.
 */
export function ContributionGrid() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.15 })
  const { weeks, days, recordStreakIndex } = codingStats.contribution

  const cells = useMemo(() => {
    const rand = mulberry32(20260213)
    return Array.from({ length: weeks * days }, (_, i) => {
      const r = rand()
      const weekend = i % 7 === 5 || i % 7 === 6
      const base = weekend ? r * 0.75 : r
      // A believable rhythm: a base of daily work plus a burst of intensity.
      const level = base > 0.93 ? 4 : base > 0.78 ? 3 : base > 0.55 ? 2 : base > 0.3 ? 1 : 0
      return level
    })
  }, [weeks, days])

  return (
    <div ref={ref}>
      <div className="flex">
        {/* Weekday gutter */}
        <div className="mr-3 flex flex-col gap-[3px] pt-0">
          {DAYS.map((d, i) => (
            <span key={i} className="h-[10px] w-6 font-mono text-[9px] leading-[10px] text-stone">
              {d}
            </span>
          ))}
        </div>

        <div className="min-w-0 flex-1 overflow-x-auto no-scrollbar">
          {/* Month rail */}
          <div className="mb-2 flex gap-[3px]">
            {Array.from({ length: weeks }).map((_, w) => (
              <span
                key={w}
                className="h-3 w-[10px] shrink-0 font-mono text-[9px] leading-3 text-stone"
              >
                {w % 4 === 1 ? MONTHS[Math.floor(w / 4.5) % 12] : ''}
              </span>
            ))}
          </div>

          <div className="flex gap-[3px]">
            {Array.from({ length: weeks }).map((_, w) => (
              <div key={w} className="flex flex-col gap-[3px]">
                {Array.from({ length: days }).map((_, d) => {
                  const i = w * days + d
                  const isRecord = i === recordStreakIndex
                  return (
                    <span
                      key={i}
                      title={`${LEVEL_OPACITY[cells[i]] === 1 ? 6 : Math.round(LEVEL_OPACITY[cells[i]] * 8)} contributions`}
                      className="h-[10px] w-[10px] shrink-0 rounded-full transition-transform duration-200 hover:scale-150"
                      style={{
                        background: isRecord ? '#1500ff' : '#fdfdfd',
                        opacity: isRecord ? 1 : LEVEL_OPACITY[cells[i]],
                        transform: inView
                          ? 'scale(1)'
                          : `scale(${0.2 + (i % 5) * 0.06})`,
                        transitionDelay: inView ? `${Math.floor(i / 26) * 14}ms` : '0ms',
                      }}
                    />
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend + the one accent, named honestly. */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
        <span className="eyebrow text-stone">Last 12 months · {weeks * days} days</span>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] text-stone">Fewer</span>
            {LEVEL_OPACITY.map((o) => (
              <span
                key={o}
                className="h-[10px] w-[10px] rounded-full bg-paper"
                style={{ opacity: o }}
              />
            ))}
            <span className="font-mono text-[11px] text-stone">More</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-[10px] w-[10px] rounded-full bg-electric-indigo" />
            <span className="eyebrow text-ash">Record streak</span>
          </div>
        </div>
      </div>
    </div>
  )
}