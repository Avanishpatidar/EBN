import { useEffect } from 'react'
import { Layout } from './components/layout/Layout'
import { Hero } from './components/home/Hero'
import { Stats } from './components/home/Stats'
import { TechStack } from './components/home/TechStack'
import { FeaturedVideos } from './components/home/FeaturedVideos'
import { Projects } from './components/home/Projects'
import { About } from './components/home/About'
import { Newsletter } from './components/home/Newsletter'
import { initMouseGlow } from './utils/mouseGlow'

function App() {
  useEffect(() => {
    initMouseGlow()
  }, [])

  return (
    <Layout>
      <Hero />
      <Stats />
      <FeaturedVideos />
      <TechStack />
      <Projects />
      <About />
      <Newsletter />
    </Layout>
  )
}

export default App
