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

  const movementChars = ['0', '1', '{', '}', '<', '>','=','[',']','~','`']
  
  const syntaxSnippets = [
    'const', 'let', 'function', 
    'def', 'class',
    'if else', 'try catch',
    'useState', 'useEffect',
    'console.log()','export',
    'class','print()',''
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
    
    const speed = burst 
      ? Math.random() * 2.5  // Increased burst speed
      : Math.random() * 1.3 + 0.4 // Increased movement speed

    return {
      x,
      y,
      text,
      alpha: 1,
      velocity: {
        x: Math.cos(angle) * speed,
        y: Math.sin(angle) * speed
      },
      life: idle ? 4 : 2,
      size: idle ? Math.random() * 20 + 16 : Math.random() * 18 + 14,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 180
    }
  }

  const updateParticles = () => {
    particlesRef.current = particlesRef.current.filter(particle => {
      particle.x += particle.velocity.x * 1.2
      particle.y += particle.velocity.y * 1.2
      particle.velocity.y += 0.025
      particle.alpha -= particle.life > 2 ? 0.004 : 0.006
      particle.life -= 0.01
      particle.rotation += 0.6
      return particle.life > 0
    })
  }

  const renderParticles = () => {
    if (!cursorRef.current) return
    const container = cursorRef.current
    container.innerHTML = ''

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
      
      if (Math.random() > 0.82) {
        particlesRef.current.push(createParticle(e.clientX, e.clientY))
      }

      clearTimeout(idleTimeout.current)
      idleTimeout.current = setTimeout(() => {
        isIdle.current = true
      }, 2000)
    }

    const handleClick = (e: MouseEvent) => {
      for (let i = 0; i < 6; i++) {
        particlesRef.current.push(createParticle(e.clientX, e.clientY, true))
      }
    }

    const animate = () => {
      if (isIdle.current && Math.random() > 0.97) {
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
      className="fixed inset-0 pointer-events-none z-[100] overflow-hidden mix-blend-screen"
    />
  )
}
