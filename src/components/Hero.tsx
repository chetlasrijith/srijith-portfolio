import { useEffect, useState } from 'react'
import { profile, codingStats } from '../data/portfolio'
import { SplitText } from './ui/SplitText'
import { PillButton } from './ui/PillButton'
import { useInView } from '../hooks/useInView'
import { useCountUp } from '../hooks/useCountUp'

/** Rotates the mono line under the name. Tab-free, pauses when off-screen. */
function useRotatingRole() {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const id = window.setInterval(
      () => setI((v) => (v + 1) % profile.roles.length),
      2600
    )
    return () => window.clearInterval(id)
  }, [paused])

  return { value: profile.roles[i], setPaused }
}

function HeroStat({ value, label, suffix }: { value: number; label: string; suffix?: string }) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0 })
  const n = useCountUp(value, inView)
  return (
    <div ref={ref} className="flex items-baseline gap-3">
      <span className="text-[21px] leading-none tracking-[-0.02em] text-paper tabular-nums">
        {n.toLocaleString('en-US')}
        {suffix ? <span className="text-stone">{suffix}</span> : null}
      </span>
      <span className="eyebrow text-stone">{label}</span>
    </div>
  )
}

export function Hero() {
  const role = useRotatingRole()
  const s = codingStats.headline

  return (
    /* min-h, not a fixed height — content decides. The scroll cue sits in flow
       so it can never land on top of the stat strip on a short viewport. */
    <section id="hero" className="relative z-10 flex min-h-[100svh] flex-col justify-center pt-28 pb-24 md:pt-32 md:pb-28">
      <div className="shell">
        {/* Availability — the only editorial annotation above the name. */}
        <div className="mb-8 flex items-center gap-3">
          <span className="anim-dot h-1.5 w-1.5 rounded-full bg-paper" />
          <span className="eyebrow">{profile.availability}</span>
        </div>

        {/* The sculptural block. Capped at the theme's 96px display step so the
            name stays a block rather than swallowing the fold. */}
        <h1 className="text-paper">
          <span className="block text-[clamp(44px,8.4vw,96px)] leading-[0.96] tracking-[-0.04em]">
            <SplitText text={profile.headline[0]} stagger={26} />
          </span>
          <span className="block text-[clamp(44px,8.4vw,96px)] leading-[0.96] tracking-[-0.04em]">
            <SplitText text={profile.headline[1]} stagger={26} delay={120} />
          </span>
        </h1>

        {/* Mono line: role rotates, caret blinks. */}
        <div
          className="mt-8 flex items-center gap-1 font-mono text-[15px] text-ash"
          onMouseEnter={() => role.setPaused(true)}
          onMouseLeave={() => role.setPaused(false)}
        >
          <span className="text-stone">~/</span>
          <span key={role.value} className="anim-fade text-pearl">
            {role.value}
          </span>
          <span className="anim-caret text-paper">▍</span>
        </div>

        {/* Subhead caption, 16px pearl. */}
        <p className="mt-10 max-w-[560px] text-body-lg leading-[1.5] text-pearl">
          I design and build distributed systems, developer tooling and the interfaces in
          front of them — mostly in TypeScript, Go and an unreasonable amount of Rust.
        </p>

        <div className="mt-12 flex flex-wrap items-center gap-12">
          {/* The one filled action in this viewport. */}
          <PillButton variant="primary" href="#work">
            See the work
          </PillButton>
          <PillButton href={profile.resumeUrl} download={profile.resumeFileName}>
            Download résumé
          </PillButton>
        </div>

        {/* Ledger teaser — the numbers are already counting. */}
        <div className="mt-16 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-slate pt-8 sm:grid-cols-4 md:mt-20">
          <HeroStat value={s.totalSolved} label="Problems solved" />
          <HeroStat value={codingStats.ratings[0].rating} label="LeetCode rating" />
          <HeroStat value={s.currentStreak} label="Day streak" suffix="d" />
          <HeroStat value={s.totalContributions} label="Contributions" />
        </div>
      </div>

      {/* Scroll cue: a 1px rule that falls forever. In flow, centred below the
          stats, so it never overlaps them on a short viewport. */}
      <div className="pointer-events-none absolute bottom-6 right-6 hidden flex-col items-center gap-3 lg:flex">
        <span className="eyebrow text-stone">Scroll</span>
        <span className="relative h-10 w-px overflow-hidden bg-slate">
          <span className="absolute inset-x-0 top-0 h-4 animate-[sc-fall_2.4s_ease-in-out_infinite] bg-paper" />
        </span>
      </div>

      <style>{`@keyframes sc-fall{0%{transform:translateY(-100%)}100%{transform:translateY(250%)}}
      .anim-fade{animation:sc-fade 500ms var(--ease-out-expo) both}`}</style>
    </section>
  )
}