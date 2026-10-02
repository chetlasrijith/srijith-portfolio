import { useInView } from '../../hooks/useInView'
import { useCountUp } from '../../hooks/useCountUp'

type Rating = { platform: string; handle: string; rating: number; max: number; percentile: string }

const R = 54
const C = 2 * Math.PI * R

function Arc({ rating, delay }: { rating: Rating; delay: number }) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.3 })
  const pct = Math.min(1, rating.rating / rating.max)
  const shown = useCountUp(rating.rating, inView, 1100)

  // Arc head position, so the travelling dot rides the end of the stroke.
  const angle = -Math.PI / 2 + pct * Math.PI * 2
  const hx = 60 + Math.cos(angle) * R
  const hy = 60 + Math.sin(angle) * R

  return (
    <div ref={ref} className="flex flex-col items-center">
      <div className="relative h-[132px] w-[132px]">
        <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
          <circle cx="60" cy="60" r={R} fill="none" stroke="#1e1e1e" strokeWidth="3" />
          <circle
            cx="60"
            cy="60"
            r={R}
            fill="none"
            stroke="#fdfdfd"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={C}
            strokeDashoffset={C}
            style={{
              strokeDashoffset: inView ? C * (1 - pct) : C,
              transition: `stroke-dashoffset 1400ms var(--ease-out-expo) ${delay}ms`,
            }}
          />
        </svg>
        {/* The head of the arc gets the one dot the palette allows here. */}
        <span
          className="absolute h-[5px] w-[5px] rounded-full bg-electric-indigo transition-opacity duration-500"
          style={{
            left: `${(hx / 120) * 100}%`,
            top: `${(hy / 120) * 100}%`,
            transform: 'translate(-50%,-50%)',
            opacity: inView ? 1 : 0,
            transitionDelay: `${delay + 900}ms`,
          }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-[24px] leading-none tracking-[-0.24px] text-paper tabular-nums">
            {shown}
          </span>
        </div>
      </div>

      <div className="mt-5 text-center">
        <div className="text-[15px] font-medium text-paper">{rating.platform}</div>
        <div className="eyebrow mt-1.5 text-stone">{rating.handle}</div>
        <div className="mt-3 inline-block rounded-full border border-silver/15 px-3 py-1">
          <span className="eyebrow text-ash">{rating.percentile}</span>
        </div>
      </div>
    </div>
  )
}

export function RatingArcs({ ratings }: { ratings: Rating[] }) {
  return (
    <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
      {ratings.map((r, i) => (
        <Arc key={r.platform} rating={r} delay={i * 160} />
      ))}
    </div>
  )
}