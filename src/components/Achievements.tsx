import { achievements } from '../data/portfolio'
import { SectionHeader } from './ui/SectionHeader'
import { Reveal } from './ui/Reveal'

export function Achievements() {
  return (
    <section id="awards" className="relative z-10 py-24 md:py-32">
      <div className="shell">
        <SectionHeader
          index="05"
          label="Recognition"
          title="A few receipts."
          note="Competitions, talks and the occasional internal award. Listed in reverse order because that is how everyone lists them."
        />

        <div className="border-t border-slate">
          {achievements.map((a, i) => (
            <Reveal key={`${a.title}-${a.year}`} delay={i * 70} className="reveal-pad">
              <article className="group grid grid-cols-[1fr] items-baseline gap-x-8 gap-y-2 border-b border-slate py-7 transition-colors duration-300 hover:bg-[#0a0a0a] md:grid-cols-[72px_1fr] md:py-8 lg:grid-cols-[72px_1fr_auto]">
                <span className="font-mono text-[13px] tracking-[0.195px] text-stone">
                  {a.year}
                </span>

                <div>
                  <h3 className="text-[20px] leading-[1.29] tracking-[-0.2px] text-paper">
                    {a.title}
                  </h3>
                  <p className="mt-2 max-w-[620px] text-body leading-[1.5] text-ash">
                    {a.detail}
                  </p>
                </div>

                <span className="eyebrow whitespace-nowrap text-ash lg:text-right">{a.org}</span>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}