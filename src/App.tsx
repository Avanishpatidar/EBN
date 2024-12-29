import { useEffect } from 'react'
import { Layout } from './components/layout/Layout'
import { Hero } from './components/home/Hero'
import { Stats } from './components/home/Stats'
import { TechStack } from './components/home/TechStack'
import { FeaturedVideos } from './components/home/FeaturedVideos'
import { Projects } from './components/home/Projects'
import { About } from './components/home/About'
import { Newsletter } from './components/home/Newsletter'
import { CodeCursor } from './components/ui/CodeCursor'

function App() {
  useEffect(() => {
    // Ensure cursor is hidden on initial load
    document.body.style.cursor = 'none'
  }, [])

  return (
    <>
      <CodeCursor />
      <Layout>
        <Hero />
        <Stats />
        <FeaturedVideos />
        <TechStack />
        <Projects />
        <About />
        <Newsletter />
      </Layout>
    </>
  )
}

export default App
