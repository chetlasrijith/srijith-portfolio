import { codingStats, profile } from '../data/portfolio'
import { SectionHeader } from './ui/SectionHeader'
import { Reveal } from './ui/Reveal'
import { Stat } from './ui/Stat'

export function About() {
  return (
    <section id="about" className="relative z-10 py-24 md:py-32">
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
                  ['Doing', profile.role],
                  ['Writing', 'Mostly TypeScript, some Go'],
                  ['Reading', 'Distributed systems papers'],
                  ['Offline', 'Problem sets and long walks'],
                ].map(([k, v]) => (
                  <div key={k} className="contents">
                    <dt className="eyebrow pt-0.5 text-stone">{k}</dt>
                    <dd className="min-w-0 text-[15px] leading-[1.5] text-pearl">{v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <div className="mt-12 grid grid-cols-2 gap-8 border-t border-slate pt-8">
              <Stat value={codingStats.headline.totalSolved} label="Solved" size="md" />
              <Stat value={new Date().getFullYear() - 2020} label="Years shipping" size="md" />
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}