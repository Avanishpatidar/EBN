import { PropsWithChildren } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'
import { ScrollToTop } from '../ui/ScrollToTop'

export function Layout({ children }: PropsWithChildren) {
  return (
    <div className="relative min-h-screen bg-background">
      <Header />
      <main className="relative">
        {children}
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}
