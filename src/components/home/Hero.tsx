import { Container } from '../ui/Container'
import { Button } from '../ui/Button'
import { CodePreview } from '../ui/CodePreview'
import { useEffect, useRef } from 'react'

const SAMPLE_CODE = `// Welcome to Error by Night 🌙
function startCodingJourney() {
  const skills = [
    'React ⚛️',
    'TypeScript 💪',
    'Node.js 🚀'
  ]
  
  const passion = {
    goal: 'Mastering Web Dev',
    approach: 'Learn by Building',
    motto: 'Code Never Sleeps'
  }
  
  return {
    status: 'Ready to Code',
    mode: 'Night Mode: ON',
    vibes: '✨ Excellent ✨'
  }
}`

export function Hero() {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = grid.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      grid.style.setProperty('--mouse-x', `${x}px`)
      grid.style.setProperty('--mouse-y', `${y}px`)
    }

    grid.addEventListener('mousemove', handleMouseMove)
    return () => grid.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section className="relative min-h-[100vh] flex items-center overflow-hidden">
      {/* Animated Grid Background */}
      <div
        ref={gridRef}
        className="absolute inset-0"
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background/90" />
        
        {/* Glow effect */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_var(--mouse-x,100px)_var(--mouse-y,100px),rgba(255,255,255,0.07),transparent_80%)]" />
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
              <span className="text-gradient">Real-World Projects</span>
            </h1>
            <p className="mt-6 text-lg text-text-secondary">
              Join our community of developers learning to build professional applications
              through practical tutorials and hands-on projects. No fluff, just code.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button size="lg">Start Learning</Button>
              <Button variant="secondary" size="lg">
                Browse Projects
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-accent/20 to-secondary/20 blur-xl opacity-50" />
            <CodePreview
              title="welcome.ts"
              language="typescript"
              code={SAMPLE_CODE}
            />
          </div>
        </div>
      </Container>
    </section>
  )
}
