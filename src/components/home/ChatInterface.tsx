import { useState, useRef } from 'react'
import { Button } from '../ui/Button'
import { motion, AnimatePresence } from 'framer-motion'

interface ChatInterfaceProps {
  onMessageSent: (message: string) => void
}

export function ChatInterface({ onMessageSent }: ChatInterfaceProps) {
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    setIsLoading(true)
    const message = input
    setInput('') // Clear input immediately for better UX

    onMessageSent(`// User: ${message}`)

    try {
      const response = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      })

      if (!response.ok) throw new Error('Failed to get response')

      const data = await response.json()
      onMessageSent(`// AI: ${data.response}`)
    } catch (error) {
      console.error('Error:', error)
      onMessageSent(`// Error: Failed to get response. Please try again.`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AnimatePresence>
      <motion.div 
        className="mt-4 flex gap-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        <motion.input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask me anything..."
          className="flex-grow px-3 py-2 bg-zinc-800 rounded-md text-white"
          disabled={isLoading}
          ref={inputRef}
          initial={{ scale: 1 }}
          whileFocus={{ scale: 1.02 }}
          transition={{ duration: 0.1 }}
        />
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.1 }}
        >
          <Button 
            onClick={handleSend} 
            disabled={isLoading || !input.trim()}
          >
            {isLoading ? 'Sending...' : 'Send'}
          </Button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
