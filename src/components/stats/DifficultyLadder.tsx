import { useInView } from '../../hooks/useInView'

type Tier = { label: string; count: number; note?: string }

/**
 * One row of the ladder: the tier's name, its odometer, and a row of tally
 * marks where each mark stands for ten problems. Hard is the only tier that
 * spends the accent colour.
 */
function TierRow({
  tier,
  index,
  widest,
  active,
}: {
  tier: Tier
  index: number
  widest: number
  active: boolean
}) {
  const marks = Math.max(3, Math.round(tier.count / 10))
  const isHard = tier.label === 'Hard'

  return (
    <div>
      <div className="flex items-baseline justify-between gap-6">
        <div className="flex items-baseline gap-4">
          <span className="text-heading-sm tracking-[-0.24px] text-paper">{tier.label}</span>
          <span className="text-[21px] leading-none tracking-[-0.02em] text-paper tabular-nums">
            {tier.count.toLocaleString('en-US')}
          </span>
        </div>
        {tier.note ? (
          <span className="hidden max-w-[300px] text-right text-[13px] text-stone sm:block">
            {tier.note}
          </span>
        ) : null}
      </div>

      {/* Tally marks use one mark per ten problems. */}
      <div className="mt-4 flex flex-wrap gap-[6px]">
        {Array.from({ length: marks }).map((_, m) => (
          <span
            key={m}
            className="block h-4 w-[3px] origin-bottom rounded-full"
            style={{
              background: isHard ? '#1500ff' : '#fdfdfd',
              opacity: isHard ? 1 : Math.max(0.16, 0.55 - index * 0.18),
              transform: active ? 'scaleY(1)' : 'scaleY(0)',
              transition: `transform 700ms var(--ease-out-expo) ${index * 120 + m * 18}ms`,
            }}
          />
        ))}
      </div>

      {/* Share of the widest tier, as a surface-stepped rule. */}
      <div className="mt-4 h-px w-full bg-slate">
        <div
          className="h-px origin-left bg-paper"
          style={{
            width: `${(tier.count / widest) * 100}%`,
            transform: active ? 'scaleX(1)' : 'scaleX(0)',
            transition: `transform 1100ms var(--ease-out-expo) ${index * 140}ms`,
          }}
        />
      </div>
    </div>
  )
}

export function DifficultyLadder({ tiers }: { tiers: Tier[] }) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.25 })
  const total = tiers.reduce((s, t) => s + t.count, 0)
  const widest = Math.max(...tiers.map((t) => t.count))

  return (
    <div ref={ref} className="space-y-6">
      {tiers.map((t, i) => (
        <TierRow key={t.label} tier={t} index={i} widest={widest} active={inView} />
      ))}

      <div className="flex items-baseline justify-between border-t border-slate pt-6">
        <span className="eyebrow text-stone">Total LeetCode solved</span>
        <span className="text-[21px] leading-none tracking-[-0.02em] text-paper tabular-nums">
          {total}
        </span>
      </div>
    </div>
  )
}