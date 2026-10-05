import type { ReactNode } from 'react'
import { SectionHeader } from './ui/SectionHeader'
import { Stat } from './ui/Stat'
import { DifficultyLadder } from './stats/DifficultyLadder'
import { RatingArcs } from './stats/RatingArcs'
import { ContributionGrid } from './stats/ContributionGrid'
import { useLiveCodingStats } from '../hooks/useLiveCodingStats'
import { codeChefProfile } from '../data/portfolio'

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
  const live = useLiveCodingStats()
  const tiers = live.leetcode
    ? [
        { label: 'Easy', count: live.leetcode.easySolved },
        { label: 'Medium', count: live.leetcode.mediumSolved },
        { label: 'Hard', count: live.leetcode.hardSolved },
      ]
    : []
  const ratings = [
    ...(live.contest
      ? [
        {
          platform: 'LeetCode',
          handle: '@thechetla',
          url: 'https://leetcode.com/u/thechetla/',
          rating: Math.round(live.contest.rating),
          max: 2200,
          percentile: `Top ${live.contest.topPercentage.toFixed(2)}% · #${live.contest.globalRanking.toLocaleString('en-US')}`,
        },
      ]
      : []),
    {
      platform: 'CodeChef',
      handle: `@${codeChefProfile.handle}`,
      url: codeChefProfile.url,
      rating: codeChefProfile.rating,
      max: 2100,
      percentile: ``,
    },
  ]

  return (
    <section id="ledger" className="relative z-10 py-24 md:py-32">
      <div className="shell">
        <SectionHeader
          index="04"
          label="The ledger"
          title="Every problem, accounted for."
          note={`Live coding & developer stats.`}
        />

        <div className="mb-8 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-slate pt-12 md:grid-cols-3 xl:grid-cols-6">
          <Stat size="md" value={live.leetcode?.totalSolved ?? null} label="LeetCode solved" />
          <Stat
            size="md"
            value={live.contest ? Math.round(live.contest.rating) : null}
            label="LeetCode rating"
          />
          <Stat size="md" value={live.contest?.globalRanking ?? null} label="LeetCode global rank" />
          <Stat size="md" value={codeChefProfile.rating} label="CodeChef rating" />
          <Stat size="md" value={live.publicCommits} label="Public commits " />
          <Stat size="md" value={live.github?.total ?? null} label="GitHub contributions" />
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <Panel label="LeetCode · all time" title="Problems by difficulty">
            {live.leetcode ? (
              <DifficultyLadder tiers={tiers} />
            ) : (
              <p className="text-[13px] text-stone">LeetCode problem counts are unavailable.</p>
            )}
          </Panel>

          <Panel label="LeetCode · CodeChef" title="Contest ratings">
            <RatingArcs ratings={ratings} />
          </Panel>

          <Panel label="GitHub · public activity" title="Contribution history" className="lg:col-span-2">
            <ContributionGrid data={live.github} loading={live.loading} />
          </Panel>
        </div>

        <p className="mt-6 text-[12px] text-stone">
          GitHub commit count covers public commits; the contribution map also includes other public GitHub activity. Unavailable sources show a dash.
        </p>
      </div>
    </section>
  )
}