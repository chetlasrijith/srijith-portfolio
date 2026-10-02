import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'ghost'
  /** Renders the external-link affordance. */
  external?: boolean
  className?: string
  download?: string
  ariaLabel?: string
}

const base =
  'inline-flex items-center justify-center gap-8 rounded-full font-medium text-body leading-none transition-colors duration-200'

const sizes = 'px-6 py-3 text-[15px]'

const variants = {
  /* The only filled element in the system. Max one per viewport. */
  primary: 'bg-electric-indigo text-paper hover:bg-[#2b17ff]',
  /* Transparent, hairline border, defers to the primary for hierarchy. */
  ghost: 'border border-silver/30 text-paper hover:border-paper/70 hover:bg-graphite',
}

/**
 * The system's only control geometry: fully rounded pills. No in-between radii.
 */
export function PillButton({
  children,
  href,
  onClick,
  variant = 'ghost',
  external,
  className,
  download,
  ariaLabel,
}: Props) {
  const cls = `${base} ${sizes} ${variants[variant]} ${className ?? ''}`

  const inner = (
    <>
      <span>{children}</span>
      {external ? (
        <svg
          width="11"
          height="11"
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
          className="transition-transform duration-200 group-hover:-translate-y-px group-hover:translate-x-px"
        >
          <path
            d="M3 9L9 3M9 3H4.2M9 3v4.8"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : null}
    </>
  )

  if (href) {
    return (
      <a
        href={href}
        aria-label={ariaLabel}
        download={download}
        target={external ? '_blank' : undefined}
        rel={external ? 'noreferrer noopener' : undefined}
        className={`group ${cls}`}
      >
        {inner}
      </a>
    )
  }

  return (
    <button type="button" onClick={onClick} aria-label={ariaLabel} className={`group ${cls}`}>
      {inner}
    </button>
  )
}