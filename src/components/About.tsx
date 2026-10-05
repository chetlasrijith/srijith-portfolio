import { profile, skills } from '../data/portfolio'
import { SectionHeader } from './ui/SectionHeader'
import { Reveal } from './ui/Reveal'

export function About() {
  return (
    <section id="about" className="relative z-10 pb-24 md:pb-32">
      <div className="shell">
        <SectionHeader index="01" label="About" title="Who is writing this." />

        <div className="grid grid-cols-1 gap-x-12 gap-y-14 lg:grid-cols-12">
          {/* Editorial body block — prose held at a readable editorial scale. */}
          <div className="lg:col-span-8">
            {profile.about.map((para, i) => (
              <Reveal key={i} delay={i * 110}>
                <p
                  className={`max-w-[680px] text-[19px] leading-[1.38] tracking-[-0.01em] md:text-[24px] md:leading-[1.29] md:tracking-[-0.24px] ${
                    i === 0 ? 'text-paper' : 'text-pearl'
                  }`}
                >
                  {para}
                </p>
              </Reveal>
            ))}
          </div>

          {/* Quiet facts rail. One rigid two-column grid, revealed as a single block —
                per-row clipping masks let the rows slide through each other. */}
          <aside className="lg:col-span-4 lg:border-l lg:border-slate lg:pl-10">
            <Reveal travel={22}>
              <dl className="grid grid-cols-[76px_minmax(0,1fr)] items-baseline gap-x-4 gap-y-5">
                {[
                  ['Based in', profile.location],
                  ['Building', 'AI & Software Systems'],
                  ['Working with', 'Python, AI/ML, APIs & Automation'],
                  ['Exploring','LLMs, Computer Vision & Distributed Workloads'],
                  ['Offline', 'Problem sets, side projects and long walks'],
                ].map(([k, v]) => (
                  <div key={k} className="contents">
                    <dt className="eyebrow pt-0.5 text-stone">{k}</dt>
                    <dd className="min-w-0 text-[15px] leading-[1.5] text-pearl">{v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </aside>
        </div>

        {/* Technical skills — grouped, quiet, no icons. */}
        <div className="mt-16 border-t border-slate pt-12 md:mt-20">
          <div className="flex items-baseline gap-4">
            <span className="eyebrow text-ash">Technical skills</span>
            <span className="h-px flex-1 bg-silver/12" />
          </div>

          <div className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((group) => (
              <div key={group.label}>
                <div className="eyebrow text-stone">{group.label}</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-silver/12 px-3 py-1 text-[13px] tracking-[0.015em] text-ash"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}