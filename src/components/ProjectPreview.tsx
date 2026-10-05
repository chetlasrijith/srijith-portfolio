import type { Project } from '../data/portfolio'

/**
 * Each project gets a distinct silhouette so the wall of cards reads as a
 * gallery of different work. Drawn entirely in surface steps and silver
 * hairlines — no imagery, no colour, no icons from a library.
 */
export function ProjectPreview({ variant, name }: { variant: Project['preview']; name: string }) {
  const hair = 'stroke-silver/12'

  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-graphite">
      {/* Window chrome — 1px dots, no colour. */}
      <div className="flex items-center gap-2 border-b border-silver/10 px-5 py-4">
        <span className="h-1.5 w-1.5 rounded-full bg-slate" />
        <span className="h-1.5 w-1.5 rounded-full bg-slate" />
        <span className="h-1.5 w-1.5 rounded-full bg-slate" />
        <span className="eyebrow ml-3 truncate">{name.toLowerCase()}.dev</span>
      </div>

      <div className="relative h-[calc(100%-49px)]">
        {variant === 'canvas' ? (
          <svg viewBox="0 0 320 180" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
            <g className={hair} strokeWidth="1">
              <path d="M0 45H320M0 90H320M0 135H320M80 0V180M160 0V180M240 0V180" />
            </g>
            <rect x="40" y="34" width="86" height="58" rx="6" fill="#2a2a2a" />
            <rect x="150" y="70" width="112" height="72" rx="6" fill="#242424" />
            <circle cx="96" cy="120" r="22" fill="#2e2e2e" />
            <path d="M196 140c26-38 58-44 88-22" stroke="#fdfdfd" strokeOpacity=".14" strokeWidth="1.5" fill="none" />
            <path d="M286 96l4 12 12 4-12 4-4 12-4-12-12-4 12-4z" fill="#fdfdfd" fillOpacity=".2" />
          </svg>
        ) : null}

        {variant === 'streams' ? (
          <svg viewBox="0 0 320 180" className="h-full w-full" preserveAspectRatio="none">
            {[...Array(46)].map((_, i) => {
              const h = 14 + Math.abs(Math.sin(i * 0.7)) * 62 + ((i * 13) % 23)
              return (
                <rect
                  key={i}
                  x={i * 7 + 2}
                  y={180 - h}
                  width="3.5"
                  height={h}
                  rx="1.75"
                  fill="#fdfdfd"
                  fillOpacity={0.08 + ((i * 7) % 10) / 60}
                />
              )
            })}
            <path d="M0 132C58 118 92 146 150 126s92-46 170-16" stroke="#fdfdfd" strokeOpacity=".28" strokeWidth="1.25" fill="none" />
          </svg>
        ) : null}

        {variant === 'queue' ? (
          <div className="flex h-full flex-col gap-2.5 p-5">
            {[92, 74, 61, 45, 30].map((w, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="h-5 w-5 shrink-0 rounded-full bg-[#2a2a2a]" />
                <span className="eyebrow w-16 shrink-0 text-stone">
                  {['build', 'lint', 'test', 'ship', 'audit'][i]}
                </span>
                <span className="h-1 flex-1 overflow-hidden rounded-full bg-slate">
                  <span
                    className="block h-full rounded-full bg-paper/25"
                    style={{ width: `${w}%` }}
                  />
                </span>
                <span className="eyebrow w-8 shrink-0 text-right text-stone">{w}%</span>
              </div>
            ))}
          </div>
        ) : null}

        {variant === 'terminal' ? (
          <div className="flex h-full flex-col gap-2.5 p-5 font-mono text-[11px] leading-relaxed text-ash">
            <p>
              <span className="text-stone">$</span> sift app.log --explain
            </p>
            <p className="text-stone">
              ┌─ <span className="text-paper">RangeError: cannot read map of undefined</span>
            </p>
            <p className="text-stone">
              │&nbsp;&nbsp;at <span className="text-pearl">hydrate</span> (render.tsx:88:14)
            </p>
            <p className="text-stone">│&nbsp;&nbsp;at commitRoot (react-dom.js:1)</p>
            <p className="text-stone">└─ lockfile matched: <span className="text-paper">react@19.0.0</span></p>
            <p className="mt-1 text-stone">
              <span className="text-paper">→</span> useSearchParams() read during render.
            </p>
            <p className="text-stone">&nbsp;&nbsp;wrap the component in Suspense.</p>
          </div>
        ) : null}

        {variant === 'orbit' ? (
          <svg viewBox="0 0 320 180" className="h-full w-full">
            <g transform="translate(160 90)">
              {[26, 44, 62, 80].map((r, i) => (
                <circle
                  key={r}
                  r={r}
                  fill="none"
                  stroke="#e5e5e5"
                  strokeOpacity={0.05 + i * 0.035}
                  strokeWidth="1"
                  strokeDasharray={i % 2 ? '3 7' : undefined}
                />
              ))}
              <circle r="9" fill="#fdfdfd" fillOpacity=".22" />
              {[
                [26, 0.4],
                [44, 2.1],
                [62, 4.0],
                [80, 5.2],
              ].map(([r, a]) => (
                <circle
                  key={`${r}`}
                  r="3.5"
                  cx={Math.cos(a) * (r as number)}
                  cy={Math.sin(a) * (r as number)}
                  fill="#fdfdfd"
                  fillOpacity=".3"
                />
              ))}
            </g>
          </svg>
        ) : null}
      </div>
    </div>
  )
}