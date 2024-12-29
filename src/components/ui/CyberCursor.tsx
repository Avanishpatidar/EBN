// components/ui/CyberCursor.tsx
import { useEffect, useRef } from 'react'

interface Matrix {
  x: number
  y: number
  char: string
  alpha: number
  size: number
}

export function CyberCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const matrixRef = useRef<Matrix[]>([])
  const mousePos = useRef({ x: 0, y: 0 })
  const prevPos = useRef({ x: 0, y: 0 })
  const isHovering = useRef(false)

  const chars = '01'
  const glowColor = '#00ff9b'
  const primaryColor = '#ffffff'

  const createMatrix = (x: number, y: number) => ({
    x,
    y,
    char: chars[Math.floor(Math.random() * chars.length)],
    alpha: 1,
    size: Math.random() * 12 + 8
  })

  const renderCursor = () => {
    if (!cursorRef.current) return
    const container = cursorRef.current
    container.innerHTML = ''

    // Main cursor ring
    const ring = document.createElement('div')
    ring.className = 'fixed transform -translate-x-1/2 -translate-y-1/2 pointer-events-none'
    ring.style.left = `${mousePos.current.x}px`
    ring.style.top = `${mousePos.current.y}px`
    ring.innerHTML = `
      <svg width="40" height="40" viewBox="0 0 40 40">
        <circle 
          cx="20" 
          cy="20" 
          r="18" 
          fill="none" 
          stroke="${primaryColor}" 
          stroke-width="1"
          class="animate-spin-slow"
        />
        <circle 
          cx="20" 
          cy="20" 
          r="8" 
          fill="none" 
          stroke="${glowColor}" 
          stroke-width="1.5"
          stroke-dasharray="2 4"
        />
        <circle 
          cx="20" 
          cy="20" 
          r="2" 
          fill="${glowColor}"
        />
      </svg>
    `
    container.appendChild(ring)

    // Targeting lines
    const lines = document.createElement('div')
    lines.className = 'fixed transform -translate-x-1/2 -translate-y-1/2 pointer-events-none'
    lines.style.left = `${mousePos.current.x}px`
    lines.style.top = `${mousePos.current.y}px`
    lines.innerHTML = `
      <svg width="80" height="80" viewBox="0 0 80 80" style="opacity: ${isHovering.current ? '1' : '0.3'}">
        <line x1="0" y1="40" x2="30" y2="40" stroke="${glowColor}" stroke-width="0.5" />
        <line x1="50" y1="40" x2="80" y2="40" stroke="${glowColor}" stroke-width="0.5" />
        <line x1="40" y1="0" x2="40" y2="30" stroke="${glowColor}" stroke-width="0.5" />
        <line x1="40" y1="50" x2="40" y2="80" stroke="${glowColor}" stroke-width="0.5" />
      </svg>
    `
    container.appendChild(lines)

    // Matrix effect
    matrixRef.current.forEach((particle, index) => {
      const element = document.createElement('div')
      element.className = 'absolute pointer-events-none font-mono'
      element.style.left = `${particle.x}px`
      element.style.top = `${particle.y}px`
      element.style.color = glowColor
      element.style.opacity = particle.alpha.toString()
      element.style.fontSize = `${particle.size}px`
      element.style.textShadow = `0 0 5px ${glowColor}`
      element.textContent = particle.char
      container.appendChild(element)

      // Update matrix particles
      particle.alpha -= 0.05
      if (particle.alpha <= 0) {
        matrixRef.current.splice(index, 1)
      }
    })
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      prevPos.current = { ...mousePos.current }
      mousePos.current = { x: e.clientX, y: e.clientY }

      // Calculate velocity for particle emission
      const velocity = Math.hypot(
        mousePos.current.x - prevPos.current.x,
        mousePos.current.y - prevPos.current.y
      )

      if (velocity > 5) {
        matrixRef.current.push(createMatrix(e.clientX, e.clientY))
      }
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.hasAttribute('role')) {
        isHovering.current = true
      }
    }

    const handleMouseOut = () => {
      isHovering.current = false
    }

    const handleClick = (e: MouseEvent) => {
      // Create burst effect on click
      for (let i = 0; i < 8; i++) {
        matrixRef.current.push(createMatrix(e.clientX, e.clientY))
      }
    }

    const animate = () => {
      renderCursor()
      requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)
    document.addEventListener('click', handleClick)
    animate()

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
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
