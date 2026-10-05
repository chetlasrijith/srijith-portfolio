import { useEffect, useState } from 'react'
import { profile } from '../data/portfolio'
import { SplitText } from './ui/SplitText'
import { PillButton } from './ui/PillButton'

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

export function Hero() {
  const role = useRotatingRole()

  return (
    <section id="hero" className="relative z-10 flex flex-col justify-center pt-28 pb-0 md:pt-32">
      <div className="shell">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(320px,1.05fr)] lg:gap-16">
          <div className="min-w-0">
            {/* Availability, the only editorial annotation above the name. */}
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
              I design and build intelligent systems, backend infrastructure and developer tooling, mostly in Python, with an unreasonable amount of AI,
              automation and distributed workloads in the mix. Currently
              an AI intern at Deloitte, graduating B.Tech in 2027.
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
          </div>

          <div className="mx-auto w-full max-w-[320px] sm:max-w-[400px] lg:mx-0 lg:ml-auto lg:max-w-[570px]">
            <img
              src="/srijith_hero_2.png"
              alt="Srijith Chetla"
              className="relative top-[17px] block h-auto max-h-[560px] w-full object-contain object-bottom"
            />
          </div>
        </div>

      </div>

      {/* Scroll cue: a 1px rule pinned near the lower-right edge. */}
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