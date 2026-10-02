import { useInView } from '../../hooks/useInView'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

type SplitTextProps = {
  text: string
  className?: string
  /** ms between characters on the first sweep. */
  stagger?: number
  delay?: number
  /** Reverse the cascade — used for the hero, right to left. */
  from?: 'left' | 'right'
}

/**
 * Per-character clip reveal. Each glyph rises out of its own mask so the block
 * assembles rather than fades in.
 */
export function SplitText({
  text,
  className,
  stagger = 18,
  delay = 0,
  from = 'left',
}: SplitTextProps) {
  const { ref, inView } = useInView<HTMLSpanElement>({ threshold: 0.1 })
  const reduced = usePrefersReducedMotion()
  const chars = Array.from(text)

  return (
    <span ref={ref} className={className} aria-label={text}>
      {chars.map((char, i) => {
        const step = from === 'right' ? chars.length - 1 - i : i
        return (
          <span
            key={`${char}-${i}`}
            aria-hidden="true"
            className="inline-block overflow-hidden align-bottom"
            style={{ paddingBottom: '0.12em', marginBottom: '-0.12em' }}
          >
            <span
              className="inline-block"
              style={
                reduced
                  ? { opacity: inView ? 1 : 0, transition: 'opacity 120ms linear' }
                  : {
                      transform: inView ? 'translate3d(0,0,0)' : 'translate3d(0,115%,0)',
                      transition: `transform 1000ms var(--ease-out-expo) ${
                        delay + step * stagger
                      }ms`,
                    }
              }
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          </span>
        )
      })}
    </span>
  )
}