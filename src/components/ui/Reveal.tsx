import type { ReactNode } from 'react'
import { useInView } from '../../hooks/useInView'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

type RevealProps = {
  children: ReactNode
  /** Stagger in ms. Multiply by the index for a cascade. */
  delay?: number
  /** Distance to travel, as a percentage of the block's own height. Tall
   *  blocks need a small number or the travel reads as a slide, not a reveal. */
  travel?: number
  className?: string
}

/**
 * Mask-wipe reveal. The line rises out of its own overflow clip — geometry,
 * never an opacity fade. Fires once.
 */
export function Reveal({ children, delay = 0, travel = 110, className }: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.2 })
  const reduced = usePrefersReducedMotion()

  return (
    <div ref={ref} className={`reveal-line ${className ?? ''}`}>
      <span
        style={
          reduced
            ? { opacity: inView ? 1 : 0, transition: 'opacity 120ms linear' }
            : {
                transform: inView ? 'translate3d(0,0,0)' : `translate3d(0,${travel}%,0)`,
                transition: `transform 900ms var(--ease-out-expo) ${delay}ms`,
              }
        }
      >
        {children}
      </span>
    </div>
  )
}