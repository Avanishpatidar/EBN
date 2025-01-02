import { useEffect, useState, useRef } from 'react'
import { TypeAnimation } from 'react-type-animation'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { ClipboardIcon } from '@heroicons/react/24/outline'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../ui/Button'

interface CodePreviewProps {
  title: string
}

type MessageType = 'user' | 'ai' | 'system'

interface Message {
  type: MessageType
  content: string
}

const WELCOME_TEXT = [
  "// Welcome to Error by Night 🌙",
  "// Your coding adventure begins here...",
  "// Search your error in the box below ⬇️"
]

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
    setInput('')

    onMessageSent(`// User: ${message}`)

    try {
      const response = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      })

      if (!response.ok) throw new Error('Failed to get response')

      const data = await response.json()
      
      // Split the response into separate files
      const files = data.response.split(/(?=\*\*File \d+:)/)
      
      // Send each file as a separate message
      files.forEach(file => {
        if (file.trim()) {
          onMessageSent(`${file.trim()}`)
        }
      })
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
        className="mt-4 flex gap-2 px-4 pb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div className="flex-grow relative">
          <motion.input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask me anything..."
            className="w-full px-3 py-2 bg-zinc-800 rounded-md text-white border border-transparent focus:border-zinc-600 transition-all"
            disabled={isLoading}
            ref={inputRef}
            initial={{ scale: 1 }}
            whileFocus={{ scale: 1.01 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          />
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <Button 
            onClick={handleSend} 
            disabled={isLoading || !input.trim()}
            className="min-w-[80px]"
          >
            {isLoading ? 'Sending...' : 'Send'}
          </Button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export function CodePreview({ title }: CodePreviewProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [showChat, setShowChat] = useState(false)
  const chatRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowChat(true)
    }, 500)
    return () => clearTimeout(timeout)
  }, [])

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [messages])

  const handleMessageSent = (message: string) => {
    const newMessage: Message = {
      type: message.startsWith('// User:') ? 'user' : 'ai',
      content: message
    }
    setMessages(prev => [...prev, newMessage])
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  }

  const welcomeVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.5, 
        ease: "easeOut",
        staggerChildren: 0.5
      } 
    }
  }

  const lineVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  }

  const renderMessage = (message: Message, index: number) => {
    const parts = message.content.split(/```/)
  
    return (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`mb-4 whitespace-pre-wrap break-words ${
          message.type === 'user' 
            ? 'text-blue-400' 
            : message.type === 'ai' 
            ? 'text-green-400' 
            : 'text-gray-400'
        }`}
      >
        {message.type === 'ai' && (
          <TypeAnimation
            sequence={['// AI:', 1000]}
            wrapper="span"
            cursor={false}
            repeat={1}
            speed={50}
            style={{ 
              fontSize: '1em', 
              display: 'inline-block',
              marginRight: '0.5em'
            }}
          />
        )}
        {parts.map((part, i) => {
          if (i % 2 === 0) {
            // Text content
            return (
              <TypeAnimation
                key={i}
                sequence={[part]}
                wrapper="div"
                cursor={false}
                repeat={1}
                speed={75}
                style={{ 
                  fontSize: '1em', 
                  display: 'inline-block',
                  width: '100%'
                }}
              />
            )
          } else {
            // Code content
            return (
              <motion.div 
                key={i}
                className="mt-2 relative"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2, delay: 0.3 }}
                >
                  <SyntaxHighlighter
                    language="javascript"
                    style={vscDarkPlus}
                    customStyle={{
                      margin: 0,
                      borderRadius: '0.375rem',
                      padding: '1rem',
                      maxHeight: '500px',
                      overflow: 'auto'
                    }}
                  >
                    {part.trim()}
                  </SyntaxHighlighter>
                </motion.div>
                <motion.button
                  onClick={() => navigator.clipboard.writeText(part.trim())}
                  className="absolute top-2 right-2 text-gray-400 hover:text-white"
                  title="Copy code"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ClipboardIcon className="h-5 w-5" />
                </motion.button>
              </motion.div>
            )
          }
        })}
      </motion.div>
    )
  }
  
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="overflow-hidden rounded-lg bg-zinc-900/50 backdrop-blur-sm border border-white/10"
    >
      <div className="flex items-center justify-between px-4 py-2 bg-white/5">
        <span className="text-sm font-medium text-white/70">{title}</span>
        <div className="flex space-x-2">
          <div className="h-3 w-3 rounded-full bg-red-500/50" />
          <div className="h-3 w-3 rounded-full bg-yellow-500/50" />
          <div className="h-3 w-3 rounded-full bg-green-500/50" />
        </div>
      </div>
      
      <div 
        ref={chatRef} 
        className="p-4 font-mono text-sm overflow-y-auto max-h-[400px]"
        style={{ 
          alignSelf: 'stretch'
        }}
      >
        <AnimatePresence>
          {showChat && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={welcomeVariants}
              className="mb-8"
            >
              {WELCOME_TEXT.map((line, index) => (
                <motion.div
                  key={index}
                  variants={lineVariants}
                  className="mb-2"
                >
                  <TypeAnimation
                    sequence={[line]}
                    wrapper="p"
                    cursor={false}
                    repeat={1}
                    speed={50}
                    className="text-gray-400 text-xl font-bold"
                    style={{ 
                      textShadow: '0 0 10px rgba(255,255,255,0.5)',
                      letterSpacing: '1px'
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        {messages.map(renderMessage)}
      </div>

      {showChat && <ChatInterface onMessageSent={handleMessageSent} />}
    </motion.div>
  )
}
