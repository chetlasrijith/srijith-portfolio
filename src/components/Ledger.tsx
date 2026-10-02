import type { ReactNode } from 'react'
import { codingStats } from '../data/portfolio'
import { SectionHeader } from './ui/SectionHeader'
import { Stat } from './ui/Stat'
import { DifficultyLadder } from './stats/DifficultyLadder'
import { RatingArcs } from './stats/RatingArcs'
import { MonthlyBars } from './stats/MonthlyBars'
import { ContributionGrid } from './stats/ContributionGrid'
import { LanguageRibbon } from './stats/LanguageRibbon'

function Panel({
  label,
  title,
  children,
  className,
}: {
  label: string
  title: string
  children: ReactNode
  className?: string
}) {
  return (
    <section className={`overflow-hidden rounded-xl bg-charcoal p-5 sm:p-6 lg:p-8 ${className ?? ''}`}>
      <div className="mb-6 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 lg:mb-8">
        <h3 className="text-[19px] tracking-[-0.02em] text-paper">{title}</h3>
        <span className="eyebrow text-stone">{label}</span>
      </div>
      {children}
    </section>
  )
}

export function Ledger() {
  const s = codingStats.headline
  const tiers = [
    codingStats.difficulty.easy,
    codingStats.difficulty.medium,
    codingStats.difficulty.hard,
  ]

  return (
    <section id="ledger" className="relative z-10 py-24 md:py-32">
      <div className="shell">
        <SectionHeader
          index="04"
          label="The ledger"
          title="Every problem, accounted for."
          note="One figure per claim. No vanity percentages, no cherry-picked badges — just the raw tally of what I solved, where, and how consistently."
        />

        {/* Headline numbers. Each one counts itself up on arrival. */}
        <div className="mb-8 grid grid-cols-2 gap-x-8 gap-y-12 border-t border-slate pt-12 md:grid-cols-3 lg:grid-cols-5">
          <Stat value={s.totalSolved} label="Problems solved" />
          <Stat value={codingStats.ratings[0].rating} label="LeetCode rating" />
          <Stat value={s.topPercent} suffix="%" label="Global percentile" />
          <Stat value={s.currentStreak} label="Day streak" suffix="d" />
          <Stat value={s.longestStreak} label="Longest streak" suffix="d" />
        </div>

        <div className="space-y-8">
          <Panel label="By difficulty" title="The ladder">
            <DifficultyLadder tiers={tiers} />
          </Panel>

          <Panel label="Competitive programming" title="Rated where it counts">
            <RatingArcs ratings={codingStats.ratings} />
          </Panel>

          <Panel label="Rolling 12 months" title="Where the problems came from">
            <MonthlyBars data={codingStats.monthly} />
          </Panel>

          <Panel label="GitHub · last 12 months" title="A year of small commits">
            <ContributionGrid />
          </Panel>

          <Panel label="By lines written" title="The language split">
            <LanguageRibbon languages={codingStats.languages} />
          </Panel>
        </div>

        <p className="mt-8 text-[13px] text-stone">
          Figures are maintained by hand in a single data file — no third-party embed, no
          API that can go dark on a conference stage.
        </p>
      </div>
    </section>
  )
}