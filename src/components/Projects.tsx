import { useMemo, useState } from 'react'
import { projects, type Project } from '../data/portfolio'
import { SectionHeader } from './ui/SectionHeader'
import { ProjectPreview } from './ProjectPreview'
import { PillButton } from './ui/PillButton'

/** Compact links keep the project cards quick to scan. */
function Links({ p }: { p: Project }) {
  const cls =
    'inline-flex items-center gap-2 rounded-full border border-silver/25 px-3 py-1.5 text-[12px] font-medium text-paper transition-colors duration-200 hover:border-paper/70 hover:bg-graphite'
  return (
    <div className="flex flex-wrap items-center gap-3">
      {p.liveUrl ? (
        <a
          href={p.liveUrl}
          target="_blank"
          rel="noreferrer noopener"
          className={`group ${cls}`}
          aria-label={`${p.name} live demo`}
        >
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-paper transition-transform duration-200 group-hover:scale-125" />
            Live demo
          </span>
          <svg
            width="11"
            height="11"
            viewBox="0 0 12 12"
            fill="none"
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          >
            <path
              d="M3 9L9 3M9 3H4.2M9 3v4.8"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      ) : (
        <span className={`${cls} cursor-not-allowed border-silver/12 text-stone`}>
          Demo unavailable
        </span>
      )}

      {p.repoUrl ? (
        <a
          href={p.repoUrl}
          target="_blank"
          rel="noreferrer noopener"
          className={`group ${cls}`}
          aria-label={`${p.name} source on GitHub`}
        >
          <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
          </svg>
          Source
        </a>
      ) : null}

    </div>
  )
}

function Card({ p }: { p: Project }) {
  return (
    <article className="group relative overflow-hidden rounded-xl bg-charcoal">
      {/* Hover elevation is a surface step, never a shadow. */}
      <div className="transition-colors duration-500 group-hover:bg-[#1a1a1a]" />

      {/* A 1px silver border draws itself in from the left on hover. */}
      <div
        className="pointer-events-none absolute inset-0 rounded-xl border border-silver/25 transition-[clip-path] duration-500 ease-[cubic-bezier(.16,1,.3,1)]"
        style={{ clipPath: 'inset(0 100% 0 0)' }}
      />

      <div className="relative grid grid-cols-1 gap-4 p-4 sm:p-5">
        {/* ── Left: the argument ── */}
        <div className="min-w-0">
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-[13px] tracking-[0.195px] text-stone">
              {p.index}
            </span>
            <span className="h-px flex-1 bg-silver/12" />
            <span className="eyebrow text-ash">
              {p.status} · {p.year}
            </span>
          </div>

          <h3 className="mt-3 text-[21px] leading-[1.25] tracking-normal text-paper">
            {p.name}
          </h3>
          <p className="mt-1 text-[14px] leading-[1.45] text-pearl">{p.summary}</p>

          <details className="mt-3 border-t border-slate pt-3">
            <summary className="cursor-pointer text-[12px] text-ash">More details</summary>
            <div className="pt-3">
              <p className="text-[13px] leading-[1.5] text-ash">{p.description}</p>

              {p.highlights.length ? (
                <ul className="mt-3 space-y-2">
                  {p.highlights.map((h) => (
                    <li key={h} className="flex gap-2 text-[12px] leading-[1.5] text-pearl">
                      <span className="mt-2 h-px w-2.5 shrink-0 bg-slate" />
                      {h}
                    </li>
                  ))}
                </ul>
              ) : null}

              {p.metrics ? (
                <dl className="mt-4 grid grid-cols-3 gap-2 border-t border-slate pt-3">
                  {p.metrics.map((m) => (
                    <div key={m.label}>
                      <dt className="text-[16px] text-paper tabular-nums">{m.value}</dt>
                      <dd className="eyebrow mt-1 text-stone">{m.label}</dd>
                    </div>
                  ))}
                </dl>
              ) : null}

              <p className="mt-3 text-[11px] text-stone">Stack: {p.stack.join(' · ')}</p>
            </div>
          </details>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {p.stack.slice(0, 4).map((s) => (
              <span
                key={s}
                className="rounded-full border border-silver/15 px-2 py-0.5 text-[11px] text-ash"
              >
                {s}
              </span>
            ))}
            {p.stack.length > 4 ? (
              <span className="px-1 py-0.5 font-mono text-[11px] text-stone">
                +{p.stack.length - 4}
              </span>
            ) : null}
          </div>

          <div className="mt-4">
            <Links p={p} />
          </div>
        </div>

        {/* Preview stays visible; longer project details open on demand. */}
        <div className="relative order-first">
          <div className="overflow-hidden rounded-xl transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.012]">
            <ProjectPreview variant={p.preview} name={p.name} />
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
            <a
              href={p.liveUrl ?? p.repoUrl ?? '#'}
              target="_blank"
              rel="noreferrer noopener"
              className="min-w-0 truncate font-mono text-[11px] text-stone underline decoration-silver/20 underline-offset-4 transition-colors hover:text-pearl hover:decoration-paper/60"
            >
              {p.liveUrl ? p.liveUrl.replace(/^https?:\/\//, '') : (p.repoUrl ?? '').replace(/^https?:\/\//, '')}
            </a>
            <span className="eyebrow text-stone">Preview</span>
          </div>
        </div>
      </div>
    </article>
  )
}

export function Projects() {
  const tags = useMemo(() => {
    const set = new Set<string>()
    projects.forEach((p) => p.stack.forEach((s) => set.add(s)))
    return ['All', ...Array.from(set)].slice(0, 9)
  }, [])

  const [filter, setFilter] = useState('All')
  const shown = filter === 'All' ? projects : projects.filter((p) => p.stack.includes(filter))

  return (
    <section id="work" className="relative z-10 py-24 md:py-32">
      <div className="shell">
        <SectionHeader
          index="02"
          label="Selected work"
          title="Some things I built because they were missing."
          note="Every project below is open to inspection — a live deployment you can break, and the repository that explains why it works. No screenshots standing in for substance."
        />

        {/* Filter pills — the system's only control geometry. */}
        <div className="no-scrollbar -mx-6 mb-12 flex gap-2 overflow-x-auto px-6 md:mb-16">
          {tags.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setFilter(t)}
              className={`shrink-0 rounded-full border px-4 py-2 text-[13px] tracking-[0.015em] transition-colors duration-200 ${
                filter === t
                  ? 'border-silver/30 bg-graphite text-paper'
                  : 'border-silver/12 text-ash hover:border-silver/30 hover:text-paper'
              }`}
            >
              {t}
            </button>
          ))}
          <span className="eyebrow ml-auto hidden shrink-0 items-center pl-4 text-stone md:flex">
            {shown.length} of {projects.length}
          </span>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {shown.map((p) => (
            <Card key={p.id} p={p} />
          ))}
        </div>

        {/* Secondary proof wall — compact, single column, no previews. */}
        <div className="mt-20 border-t border-slate pt-12">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h3 className="max-w-[520px] text-[26px] leading-[1.2] tracking-[-0.3px] text-paper md:text-[30px]">
              Smaller things, same obsession.
            </h3>
            <PillButton href="https://github.com" external>
              Everything on GitHub
            </PillButton>
          </div>

          <div className="mt-10 grid gap-x-12 md:grid-cols-2">
            {[
              { name: 'Sift VS Code', note: 'Extension that explains a stack trace inside the editor.', url: 'https://github.com' },
              { name: 'ledger-cli', note: 'Tiny dependency-free ledger parser. 4KB.', url: 'https://github.com' },
              { name: 'graphql-cost', note: 'Static analysis that fails a query over budget.', url: 'https://github.com' },
              { name: 'dotfiles', note: 'Neovim, tmux, and a decade of bad shortcuts.', url: 'https://github.com' },
            ].map((x) => (
              <a
                key={x.name}
                href={x.url}
                target="_blank"
                rel="noreferrer noopener"
                className="group flex items-baseline justify-between gap-6 border-b border-slate py-5 transition-colors duration-200 hover:border-silver/25"
              >
                <span>
                  <span className="text-subheading tracking-[-0.02em] text-paper">{x.name}</span>
                  <span className="mt-1 block text-[14px] text-ash">{x.note}</span>
                </span>
                <span className="text-ash transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}