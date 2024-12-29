// components/ui/CodeCursor.tsx
import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  text: string
  alpha: number
  velocity: {
    x: number
    y: number
  }
  life: number
  size: number
  color: string
  rotation: number
}

export function CodeCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mousePos = useRef({ x: 0, y: 0 })
  const isIdle = useRef(false)
  const idleTimeout = useRef<NodeJS.Timeout>()

  // Simplified movement characters for better visibility
  const movementChars = ['0', '1', '{', '}', '<', '>']
  
  const syntaxSnippets = [
    'const', 'let', 'function', 
    'def', 'class',
    'if else', 'try catch',
    'useState', 'useEffect',
    'console.log()'
  ]

  const colors = [
    '#00ff9b', // cyber green
    '#00b3ff', // bright blue
    '#ff3366', // pink
    '#ffcc00', // yellow
    '#00ffff'  // cyan
  ]

  const createParticle = (x: number, y: number, burst: boolean = false, idle: boolean = false) => {
    const text = idle 
      ? syntaxSnippets[Math.floor(Math.random() * syntaxSnippets.length)]
      : movementChars[Math.floor(Math.random() * movementChars.length)]
    
    const angle = burst 
      ? Math.random() * Math.PI * 2 
      : Math.random() * Math.PI - Math.PI / 2
    
    // Even slower speeds
    const speed = burst 
      ? Math.random() * 2 + 1 // Significantly reduced burst speed
      : Math.random() * 1 + 0.3 // Very slow movement speed

    return {
      x,
      y,
      text,
      alpha: 1,
      velocity: {
        x: Math.cos(angle) * speed,
        y: Math.sin(angle) * speed
      },
      // Longer life duration
      life: idle ? 4 : 2, // Increased life duration
      // Bigger sizes for movement particles
      size: idle ? Math.random() * 20 + 16 : Math.random() * 18 + 14, // Increased movement particle size
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 180 // Reduced rotation range
    }
  }

  const updateParticles = () => {
    particlesRef.current = particlesRef.current.filter(particle => {
      particle.x += particle.velocity.x
      particle.y += particle.velocity.y
      // Very light gravity
      particle.velocity.y += 0.02 // Minimal gravity effect
      // Much slower fade out
      particle.alpha -= particle.life > 2 ? 0.003 : 0.005
      particle.life -= 0.008 // Slower life reduction
      // Very slow rotation
      particle.rotation += 0.5 // Minimal rotation speed
      return particle.life > 0
    })
  }

  const renderParticles = () => {
    if (!cursorRef.current) return
    const container = cursorRef.current
    container.innerHTML = ''

    // Enhanced cursor
    const cursorOuter = document.createElement('div')
    cursorOuter.className = 'fixed transform -translate-x-1/2 -translate-y-1/2 pointer-events-none'
    cursorOuter.style.left = `${mousePos.current.x}px`
    cursorOuter.style.top = `${mousePos.current.y}px`
    cursorOuter.innerHTML = `
      <div class="relative">
        <div class="absolute w-10 h-10 border-2 border-white rounded-full opacity-80 cursor-pulse"
             style="box-shadow: 0 0 20px rgba(255, 255, 255, 0.5); transition: all 0.4s ease"></div>
        <div class="absolute w-3 h-3 bg-white rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
             style="box-shadow: 0 0 15px rgba(255, 255, 255, 0.8); transition: all 0.3s ease"></div>
      </div>
    `
    container.appendChild(cursorOuter)

    // Render particles with enhanced visibility
    particlesRef.current.forEach(particle => {
      const element = document.createElement('div')
      element.className = 'absolute pointer-events-none font-mono font-bold transition-all duration-500'
      element.style.left = `${particle.x}px`
      element.style.top = `${particle.y}px`
      element.style.color = particle.color
      element.style.opacity = particle.alpha.toString()
      element.style.fontSize = `${particle.size}px`
      element.style.transform = `rotate(${particle.rotation}deg)`
      element.style.textShadow = `0 0 15px ${particle.color}`
      element.style.transition = 'all 0.4s ease'
      element.textContent = particle.text
      container.appendChild(element)
    })
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
      isIdle.current = false
      
      // Reduced emission rate for movement
      if (Math.random() > 0.85) { // Further reduced particle emission
        particlesRef.current.push(createParticle(e.clientX, e.clientY))
      }

      clearTimeout(idleTimeout.current)
      idleTimeout.current = setTimeout(() => {
        isIdle.current = true
      }, 2000)
    }

    const handleClick = (e: MouseEvent) => {
      // Reduced burst particles
      for (let i = 0; i < 6; i++) { // Reduced burst count
        particlesRef.current.push(createParticle(e.clientX, e.clientY, true))
      }
    }

    const animate = () => {
      // Much reduced idle particle emission
      if (isIdle.current && Math.random() > 0.97) { // Significantly reduced idle emission rate
        particlesRef.current.push(
          createParticle(mousePos.current.x, mousePos.current.y, false, true)
        )
      }
      
      updateParticles()
      renderParticles()
      requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('click', handleClick)
    animate()

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('click', handleClick)
    }
  }, [])

  return (
    <div 
      ref={cursorRef} 
      className="fixed inset-0 pointer-events-none z-50 overflow-hidden mix-blend-screen"
    />
  )
}
