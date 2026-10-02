import { useRef } from 'react'
import { experience } from '../data/portfolio'
import { SectionHeader } from './ui/SectionHeader'
import { useInView } from '../hooks/useInView'

function Role({
  role,
  index,
  last,
}: {
  role: (typeof experience)[number]
  index: number
  last: boolean
}) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.25, once: false })

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 gap-6 pb-20 md:grid-cols-[1fr_auto] md:gap-12"
      style={{ opacity: inView ? 1 : 0.28, transition: 'opacity 700ms var(--ease-out-expo)' }}
    >
      {/* Rail marker — a hollow ring that fills as the role comes into view. */}
      <div className="hidden md:block">
        <span
          className="block h-[11px] w-[11px] rounded-full border transition-all duration-700"
          style={{
            borderColor: inView ? '#1500ff' : '#2f2f2f',
            background: inView ? '#1500ff' : 'transparent',
            marginTop: '7px',
          }}
        />
      </div>

      <div className="max-w-[760px]">
        <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
          <span className="font-mono text-[13px] tracking-[0.195px] text-stone">
            {String(index + 1).padStart(2, '0')}
          </span>
          <h3 className="text-[24px] tracking-[-0.24px] text-paper">{role.title}</h3>
          <span className="eyebrow text-ash">{role.company}</span>
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
          <span className="eyebrow">{role.period}</span>
          <span className="h-1 w-1 rounded-full bg-slate" />
          <span className="eyebrow text-stone">{role.location}</span>
        </div>

        <p className="mt-6 max-w-[620px] text-[16px] leading-[1.5] text-pearl">{role.summary}</p>

        <ul className="mt-6 space-y-3">
          {role.points.map((p, i) => (
            <li
              key={p}
              className="flex gap-4 text-[15px] leading-[1.5] text-ash"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(10px)',
                transition: `opacity 700ms var(--ease-out-expo) ${120 + i * 80}ms, transform 700ms var(--ease-out-expo) ${120 + i * 80}ms`,
              }}
            >
              <span className="mt-2.5 h-px w-4 shrink-0 bg-slate" />
              {p}
            </li>
          ))}
        </ul>

        <div className="mt-7 flex flex-wrap gap-2">
          {role.stack.map((s) => (
            <span
              key={s}
              className="rounded-full border border-silver/12 px-3 py-1 text-[13px] text-ash"
            >
              {s}
            </span>
          ))}
        </div>

        {last ? <div className="mt-10" /> : <div className="mt-14 h-px w-full bg-slate" />}
      </div>
    </div>
  )
}

export function Experience() {
  const rail = useRef<HTMLDivElement | null>(null)

  return (
    <section id="experience" className="relative z-10 py-24 md:py-32">
      <div className="shell">
        <SectionHeader
          index="03"
          label="Experience"
          title="Six years, three chapters."
          note="The through-line is systems: queues, schedulers, ingestion, and the unglamorous reliability work that keeps them honest."
        />

        <div className="grid grid-cols-1 md:grid-cols-[24px_1fr] md:gap-12">
          {/* The rail. One hairline, and the single accent dot riding it. */}
          <div ref={rail} className="relative hidden md:block">
            <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-slate" />
            <div className="sticky top-[42vh] flex h-0 justify-center">
              <span className="anim-dot h-[9px] w-[9px] -translate-y-1/2 rounded-full bg-electric-indigo" />
            </div>
          </div>

          <div>
            {experience.map((role, i) => (
              <Role
                key={role.company}
                role={role}
                index={i}
                last={i === experience.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}