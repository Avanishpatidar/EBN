// components/Newsletter.tsx
import { Container } from '../ui/Container'
import { Button } from '../ui/Button'
import { useState } from 'react'
import { motion } from 'framer-motion'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [error, _setError ] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    // Simulate API call
    setTimeout(() => {
      setStatus('success')
      setEmail('')
    }, 1000)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="Newsletter" className="section-padding bg-primary/5">
      <Container size="small">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div className="text-center" variants={itemVariants}>
            <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
              Stay Updated
            </h2>
            <p className="mt-4 text-lg text-text-secondary">
              Get notified about new tutorials, projects, and coding tips.
            </p>
          </motion.div>
          <motion.form
            onSubmit={handleSubmit}
            className="mx-auto mt-10 flex max-w-md flex-col gap-4 sm:flex-row"
            variants={itemVariants}
          >
            <div className="flex-1">
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full rounded-lg bg-primary/10 px-4 py-2.5 text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
              />
            </div>
            <Button type="submit" isLoading={status === 'loading'}>
              Subscribe
            </Button>
          </motion.form>
          {status === 'success' && (
            <motion.p className="mt-4 text-center text-sm text-text-secondary" variants={itemVariants}>
              Thanks for subscribing! Check your email for confirmation.
            </motion.p>
          )}
          {error && (
            <motion.p className="mt-2 text-sm text-red-400" variants={itemVariants}>
              {error}
            </motion.p>
          )}
        </motion.div>
      </Container>
    </section>
  )
}
