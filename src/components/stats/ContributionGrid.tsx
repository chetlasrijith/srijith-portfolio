import { useMemo } from 'react'
import { useInView } from '../../hooks/useInView'
import type { ContributionDay } from '../../hooks/useLiveCodingStats'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const DAYS = ['Sun', '', 'Tue', '', 'Thu', '', 'Sat']
const LEVEL_OPACITY = [0.06, 0.2, 0.42, 0.72, 1]

type ContributionData = {
  total: number
  days: ContributionDay[]
}

export function ContributionGrid({
  data,
  loading,
}: {
  data: ContributionData | null
  loading: boolean
}) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.15 })
  const weeks = useMemo(() => {
    if (!data) return []
    return Array.from({ length: Math.ceil(data.days.length / 7) }, (_, week) =>
      data.days.slice(week * 7, week * 7 + 7)
    )
  }, [data])

  if (!data) {
    return (
      <p className="text-[13px] text-stone" role="status">
        {loading ? 'Loading GitHub contributions…' : 'GitHub contribution data is unavailable.'}
      </p>
    )
  }

  return (
    <div ref={ref}>
      <div className="flex">
        <div className="mr-3 flex flex-col gap-[3px] pt-0">
          {DAYS.map((day, index) => (
            <span key={index} className="h-[10px] w-6 font-mono text-[9px] leading-[10px] text-stone">
              {day}
            </span>
          ))}
        </div>

        <div className="min-w-0 flex-1 overflow-x-auto no-scrollbar">
          <div className="mb-2 flex gap-[3px]">
            {weeks.map((week, index) => {
              const month = week[0]
                ? new Date(`${week[0].date}T00:00:00Z`).getUTCMonth()
                : -1
              const previousMonth = weeks[index - 1]?.[0]
                ? new Date(`${weeks[index - 1][0].date}T00:00:00Z`).getUTCMonth()
                : -1

              return (
                <span key={index} className="h-3 w-[10px] shrink-0 font-mono text-[9px] leading-3 text-stone">
                  {month !== previousMonth ? MONTHS[month] : ''}
                </span>
              )
            })}
          </div>

          <div className="flex gap-[3px]">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-[3px]">
                {Array.from({ length: 7 }, (_, dayIndex) => {
                  const day = week[dayIndex]
                  const level = day ? Math.max(0, Math.min(4, day.level)) : 0

                  return (
                    <span
                      key={day?.date ?? dayIndex}
                      title={day ? `${day.date}: ${day.count} contributions` : ''}
                      aria-label={day ? `${day.count} contributions on ${day.date}` : undefined}
                      className="h-[10px] w-[10px] shrink-0 rounded-full transition-transform duration-200 hover:scale-150"
                      style={{
                        background: '#fdfdfd',
                        opacity: day ? LEVEL_OPACITY[level] : 0,
                        transform: inView ? 'scale(1)' : `scale(${0.2 + (weekIndex % 5) * 0.06})`,
                        transitionDelay: inView ? `${Math.floor(weekIndex / 4) * 14}ms` : '0ms',
                      }}
                    />
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
        <span className="eyebrow text-stone">Last 12 months · {data.total} contributions</span>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] text-stone">Fewer</span>
          {LEVEL_OPACITY.map((opacity) => (
            <span
              key={opacity}
              className="h-[10px] w-[10px] rounded-full bg-paper"
              style={{ opacity }}
            />
          ))}
          <span className="font-mono text-[11px] text-stone">More</span>
        </div>
      </div>
    </div>
  )
}