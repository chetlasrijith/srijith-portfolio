import { profile, codingStats } from '../data/portfolio'
import { useLocalTime } from '../hooks/useLocalTime'
import { Marquee } from './Marquee'

export function Footer() {
  const time = useLocalTime(profile.timezone)
  const year = new Date().getFullYear()

  return (
    <footer className="relative z-10">
      {/* The only structural border in the system. */}
      <div className="h-px w-full bg-slate" />

      <div className="shell py-16">
        <Marquee items={profile.marquee} variant="none" />

        <div className="mt-16 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-[21px] tracking-[-0.02em] text-paper">{profile.name}</div>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="eyebrow text-stone">
                {profile.location} · {time} local
              </span>
              <span className="h-1 w-1 rounded-full bg-slate" />
              <span className="eyebrow text-stone">{profile.availability}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <div className="flex flex-wrap gap-5">
              {profile.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-[14px] tracking-[0.015em] text-ash transition-colors hover:text-paper"
                >
                  {s.label}
                </a>
              ))}
            </div>
            <a
              href="#hero"
              className="rounded-full border border-silver/20 px-4 py-2 text-[13px] text-ash transition-colors hover:border-silver/50 hover:text-paper"
            >
              ↑ Top
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-slate pt-8">
          <span className="eyebrow text-stone">
            © {year} {profile.name}
          </span>
          <span className="eyebrow text-stone">
            {codingStats.headline.totalSolved} problems · {codingStats.headline.totalContributions}{' '}
            commits · built by hand
          </span>
        </div>
      </div>
    </footer>
  )
}