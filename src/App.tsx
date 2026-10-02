import { useEffect, useState } from 'react'
import { Nav } from './components/Nav'
import { CursorField } from './components/CursorField'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Projects } from './components/Projects'
import { Experience } from './components/Experience'
import { Ledger } from './components/Ledger'
import { Achievements } from './components/Achievements'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { useScrollProgress } from './hooks/useScrollProgress'
import { useActiveSection } from './hooks/useActiveSection'

const SECTIONS = ['hero', 'about', 'work', 'experience', 'ledger', 'awards', 'contact']

export default function App() {
  const progress = useScrollProgress()
  const active = useActiveSection(SECTIONS)
  const [pastHero, setPastHero] = useState(false)

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.6)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* Cursor field retires once you leave the hero. */}
      <CursorField faded={pastHero} />

      {/* Scroll progress — a 1px silver rule pinned to the top of the viewport. */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-px bg-silver/10">
        <div
          className="h-full origin-left bg-silver/40"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>

      <Nav active={active} />

      <main className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Ledger />
        <Achievements />
        {/* The hero owns the filled CTA until it scrolls away. */}
        <Contact claimPrimary={pastHero} />
      </main>

      <Footer />
    </>
  )
}