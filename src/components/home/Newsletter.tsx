import { Container } from '../ui/Container'
import { Button } from '../ui/Button'
import { useState } from 'react'

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

  return (
    <section className="section-padding bg-primary/5">
      <Container size="small">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            Stay Updated
          </h2>
          <p className="mt-4 text-lg text-text-secondary">
            Get notified about new tutorials, projects, and coding tips.
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-10 flex max-w-md flex-col gap-4 sm:flex-row"
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
        </form>
        {status === 'success' && (
          <p className="mt-4 text-center text-sm text-text-secondary">
            Thanks for subscribing! Check your email for confirmation.
          </p>
        )}
        {error && (
          <p className="mt-2 text-sm text-red-400">
            {error}
          </p>
        )}
      </Container>
    </section>
  )
} 