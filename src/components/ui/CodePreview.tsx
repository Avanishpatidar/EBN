import { useEffect, useState } from 'react'

interface CodePreviewProps {
  title: string
  code: string
  language: string
}

export function CodePreview({ title, code }: CodePreviewProps) {
  const [displayedCode, setDisplayedCode] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < code.length) {
      const timeout = setTimeout(() => {
        setDisplayedCode(prev => prev + code[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, 30) // Adjust typing speed here

      return () => clearTimeout(timeout)
    }
  }, [code, currentIndex])

  return (
    <div className="overflow-hidden rounded-lg bg-zinc-900/50 backdrop-blur-sm border border-white/10">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-white/5">
        <span className="text-sm font-medium text-white/70">{title}</span>
        <div className="flex space-x-2">
          <div className="h-3 w-3 rounded-full bg-red-500/50" />
          <div className="h-3 w-3 rounded-full bg-yellow-500/50" />
          <div className="h-3 w-3 rounded-full bg-green-500/50" />
        </div>
      </div>
      
      {/* Code */}
      <div className="p-4 font-mono text-sm overflow-x-auto">
        <pre className="language-typescript">
          <code className="block whitespace-pre">
            {displayedCode.split('\n').map((line, i) => (
              <div key={i} className="line">
                {formatCodeLine(line)}
                {currentIndex < code.length && i === displayedCode.split('\n').length - 1 && (
                  <span className="animate-blink">|</span>
                )}
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  )
}

function formatCodeLine(line: string): JSX.Element {
  // Basic syntax highlighting
  return (
    <>
      {line.split(' ').map((word, i) => {
        let className = ''
        
        if (word.startsWith('//')) {
          className = 'text-zinc-500'
        } else if (['function', 'const', 'let', 'var', 'return'].includes(word)) {
          className = 'text-purple-400'
        } else if (word.startsWith("'") || word.startsWith('"')) {
          className = 'text-green-400'
        } else if (['true', 'false', 'null', 'undefined'].includes(word)) {
          className = 'text-yellow-400'
        } else if (word.includes('(') || word.includes(')')) {
          className = 'text-blue-400'
        } else if (word.includes(':')) {
          className = 'text-cyan-400'
        } else if (word.includes('[') || word.includes(']')) {
          className = 'text-orange-400'
        }

        return (
          <span key={i} className={className}>
            {word}{' '}
          </span>
        )
      })}
    </>
  )
} 