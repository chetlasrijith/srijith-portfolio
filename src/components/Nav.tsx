import { useEffect, useState } from 'react'
import { profile } from '../data/portfolio'

const links = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'ledger', label: 'Ledger' },
  { id: 'awards', label: 'Awards' },
  { id: 'contact', label: 'Contact' },
]

export function Nav({ active }: { active: string }) {
  const [condensed, setCondensed] = useState(false)

  useEffect(() => {
    const onScroll = () => setCondensed(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    /* Text on the void. No background fill until it condenses into a pill dock. */
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Once condensed the bar takes a scrim. Without it the wordmark sits on
          a transparent header and section headings scroll straight through it. */}
      <nav
        className={`shell relative flex items-center justify-between transition-all duration-500 ${
          condensed ? 'bg-obsidian/85 py-3 backdrop-blur-md' : 'py-6'
        }`}
      >
        <a
          href="#hero"
          className="flex shrink-0 items-baseline gap-2 text-[15px] font-medium tracking-[-0.15px] text-paper"
        >
          SC
          <span
            className={`eyebrow transition-opacity duration-300 ${
              condensed ? 'hidden' : 'hidden opacity-0 md:inline'
            }`}
          >
            / {profile.role}
          </span>
        </a>

        {/* Centre links dissolve on the way down so the dock stays quiet. Held back
            to xl so they can never collide with the wordmark. */}
        <ul
          className={`absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 transition-all duration-500 xl:flex ${
            condensed ? 'pointer-events-none -translate-y-1 opacity-0' : 'translate-y-0 opacity-100'
          }`}
        >
          {links.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                className={`relative text-[14px] tracking-[0.015em] transition-colors duration-200 ${
                  active === l.id ? 'text-paper' : 'text-pearl hover:text-paper'
                }`}
              >
                {l.label}
                <span
                  className="absolute -bottom-1.5 left-0 h-px w-full origin-left bg-paper transition-transform duration-300"
                  style={{ transform: active === l.id ? 'scaleX(1)' : 'scaleX(0)' }}
                />
              </a>
            </li>
          ))}
        </ul>

        {/* The condensed dock. shrink-0 plus a scroll escape hatch so it can never
            squeeze into the wordmark on a narrow window. */}
        <div
          className={`no-scrollbar flex shrink-0 items-center gap-1 overflow-x-auto rounded-full border border-silver/15 bg-charcoal/90 px-2 py-1 transition-all duration-500 ${
            condensed
              ? 'translate-y-0 opacity-100'
              : 'pointer-events-none absolute -translate-y-2 border-transparent bg-transparent opacity-0'
          }`}
        >
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={`shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 text-[13px] tracking-[0.015em] transition-colors duration-200 ${
                active === l.id ? 'bg-graphite text-paper' : 'text-ash hover:text-paper'
              }`}
            >
              {l.label}
            </a>
          ))}
          <a
            href={profile.resumeUrl}
            download={profile.resumeFileName}
            className="rounded-full px-3 py-1.5 text-[13px] font-medium text-paper transition-colors duration-200 hover:bg-graphite"
          >
            Résumé
          </a>
        </div>
      </nav>
    </header>
  )
}