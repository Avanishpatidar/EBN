import { useState, useEffect } from 'react'
import { Container } from '../ui/Container'
import { Button } from '../ui/Button'
import { cn } from '../../utils/cn'

const NAVIGATION_ITEMS = [
  { label: 'Tutorials', href: '#tutorials' },
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="fixed inset-x-0 top-0 z-50 pointer-events-none">
      <Container className="relative px-4">
        <div className="py-4">
          <div className="relative">
            {/* Enhanced glowing line */}
            <div className="absolute -inset-[2px] rounded-xl overflow-hidden">
              <div 
                className="absolute h-[3px] w-[20%] top-0 left-0 bg-blue-400/80 blur-[3px] animate-border-line"
                style={{
                  boxShadow: '0 0 20px 3px rgba(56, 189, 248, 0.8), 0 0 40px 6px rgba(56, 189, 248, 0.4)',
                }}
              />
            </div>
            
            {/* Header content */}
            <header
              className={cn(
                'relative rounded-xl pointer-events-auto',
                'bg-zinc-900/50 backdrop-blur-xl',
                'transition-all duration-300',
                isScrolled 
                  ? 'shadow-lg shadow-black/10' 
                  : 'shadow-md shadow-black/5',
              )}
            >
              <nav className="flex items-center justify-between h-16 px-6 sm:h-16 sm:px-8">
                {/* Updated Logo with Animation */}
                <a 
                  href="/" 
                  className="group relative"
                >
                  <div className="flex flex-col">
                    <span className="text-2xl font-orbitron font-black tracking-wider">
                      <span className="error-by-night-text">
                        ERROR BY NIGHT
                      </span>
                    </span>
                    <span className="text-[10px] font-orbitron tracking-[0.3em] text-blue-400/70 group-hover:text-blue-400 transition-colors pl-1">
                      CODING • BLOGS • PROJECTS
                    </span>
                  </div>
                </a>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-8">
                  {NAVIGATION_ITEMS.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className={cn(
                        "text-sm font-medium transition-colors relative",
                        "after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0",
                        "after:bg-text-primary after:transition-all after:duration-300",
                        "hover:text-text-primary hover:after:w-full",
                        "text-text-secondary/90 hover:text-text-primary"
                      )}
                    >
                      {item.label}
                    </a>
                  ))}
                  <Button 
                    variant="primary" 
                    size="sm"
                    className="shadow-lg shadow-black/10 hover:shadow-xl hover:shadow-black/20 transition-all duration-300"
                  >
                    Join Discord
                  </Button>
                </div>

                {/* Mobile Menu Button */}
                <button
                  className="md:hidden p-2 text-text-secondary hover:text-text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  <span className="sr-only">Open menu</span>
                  {isMobileMenuOpen ? (
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  )}
                </button>
              </nav>

              {/* Mobile Navigation */}
              {isMobileMenuOpen && (
                <div className="md:hidden py-4 px-6 sm:px-8 border-t border-white/[0.08]">
                  <div className="flex flex-col space-y-4">
                    {NAVIGATION_ITEMS.map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.label}
                      </a>
                    ))}
                    <Button 
                      variant="primary" 
                      size="sm" 
                      className="w-full shadow-lg shadow-black/10 hover:shadow-xl hover:shadow-black/20 transition-all duration-300"
                    >
                      Join Discord
                    </Button>
                  </div>
                </div>
              )}
            </header>
          </div>
        </div>
      </Container>
    </div>
  )
}
