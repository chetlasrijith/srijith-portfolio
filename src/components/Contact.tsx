import { profile } from '../data/portfolio'
import { SectionHeader } from './ui/SectionHeader'
import { PillButton } from './ui/PillButton'
import { SplitText } from './ui/SplitText'

type Props = {
  /** The hero owns the filled CTA until it leaves the viewport. This keeps one
   *  indigo pill on screen at a time. */
  claimPrimary: boolean
}

export function Contact({ claimPrimary }: Props) {
  return (
    <section id="contact" className="relative z-10 py-16 md:py-24">
      <div className="shell">
        <SectionHeader index="06" label="Contact" title="Say hello." />

        <p className="max-w-[680px] text-[21px] leading-[1.33] tracking-[-0.02em] text-paper md:text-[24px] md:leading-[1.29] md:tracking-[-0.24px]">
          I read everything that lands in my inbox, and I answer most of it within a day.
          If you are building something with a model in it, an automation that has to
          survive real-world mess, or a dataset nobody has looked at properly yet, I would
          genuinely like to hear about it.
        </p>

        {/* The address, set as type rather than a form. */}
        <a
          href={`mailto:${profile.email}`}
          className="group mt-10 inline-block max-w-full border-b border-silver/20 pb-2 transition-colors duration-300 hover:border-paper/60"
        >
          <span className="break-all text-[clamp(20px,3.4vw,36px)] leading-[1.15] tracking-[-0.4px] text-paper transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:-translate-y-1">
            {profile.email}
          </span>
        </a>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <PillButton
            variant={claimPrimary ? 'primary' : 'ghost'}
            href={profile.resumeUrl}
            download={profile.resumeFileName}
          >
            Download résumé
          </PillButton>

          {profile.socials.map((s) => (
            <PillButton key={s.label} href={s.url} external ariaLabel={s.label}>
              {s.label}
            </PillButton>
          ))}
        </div>

        {/* A tiny contact card instead of a form nobody fills in. */}
        <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-8 border-t border-slate pt-10 sm:grid-cols-3">
          <div>
            <div className="eyebrow text-stone">Email</div>
            <a
              href={`mailto:${profile.email}`}
              className="mt-2 block text-[15px] text-pearl underline decoration-silver/20 underline-offset-4 transition-colors hover:text-paper hover:decoration-paper/60"
            >
              {profile.email}
            </a>
          </div>
          <div>
            <div className="eyebrow text-stone">Phone</div>
            <a
              href={`tel:${profile.phone.replace(/\s/g, '')}`}
              className="mt-2 block text-[15px] text-pearl underline decoration-silver/20 underline-offset-4 transition-colors hover:text-paper hover:decoration-paper/60"
            >
              {profile.phone}
            </a>
          </div>
          <div>
            <div className="eyebrow text-stone">Based in</div>
            <div className="mt-2 text-[15px] text-pearl">{profile.location}</div>
          </div>
        </div>
      </div>

      {/* Full-bleed closer. Each glyph inverts on hover without adding colour. */}
      <div className="mt-16 select-none overflow-hidden border-t border-slate py-16 md:mt-20 md:py-20">
        <div className="flex justify-center text-center text-[clamp(30px,7vw,84px)] leading-[1.02] tracking-[-0.035em]">
          <SplitText text="LET'S WORK" stagger={22} className="text-paper" />
        </div>
        <div className="mt-1 flex justify-center text-center text-[clamp(30px,7vw,84px)] leading-[1.02] tracking-[-0.035em]">
          <SplitText text="TOGETHER" stagger={22} delay={260} className="text-slate" />
        </div>
      </div>
    </section>
  )
}