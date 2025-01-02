import { Container } from '../ui/Container'
import { Button } from '../ui/Button'
import { CodePreview } from '../ui/CodePreview'
import { useEffect, useRef } from 'react'
import { cn } from "../../utils/cn";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      section.style.setProperty('--mouse-x', `${x}px`)
      section.style.setProperty('--mouse-y', `${y}px`)
    }

    section.addEventListener('mousemove', handleMouseMove)
    return () => section.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-[100vh] flex items-center overflow-hidden"
    >
      {/* Background with glow effect */}
      <div className="absolute inset-0">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background/90" />
        
        {/* Glow effect */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_var(--mouse-x,50%)_var(--mouse-y,50%),rgba(255,255,255,0.07),transparent_80%)]" />
        </div>

        {/* Grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>

      <Container className="relative py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-text-primary sm:text-6xl">
              Master Coding Through{' '}
              Real-World Projects
            </h1>
            <p className="mt-6 text-lg text-text-secondary">
              Join our community of developers learning to build professional applications
              through practical tutorials and hands-on projects. No fluff, just code.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href="#FeaturedVideos" onClick={(e) => handleNavClick(e, '#FeaturedVideos')}>
                <Button size="lg">Start Learning</Button>
              </a>
              <a href="#Blogs" onClick={(e) => handleNavClick(e, '#Blogs')}>
                <Button  size="lg">
                  Browse Projects
                </Button>
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-[2px] rounded-xl overflow-hidden">
              <div
                className={cn(
                  "absolute inset-0 blur-[2px]",
                  "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                )}
                style={{
                  maskImage: 'linear-gradient(black, black), linear-gradient(black, black)',
                  maskSize: '100% 3px, 3px 100%',
                  maskPosition: '0 0, 100% 0',
                  maskRepeat: 'no-repeat',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude',
                  animation: 'rotate-glow 4s linear infinite',
                }}
              />
            </div>
            <div className="relative rounded-xl overflow-hidden bg-zinc-900/80 backdrop-blur-sm shadow-2xl">
              <CodePreview
                title="EBN.chat"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
