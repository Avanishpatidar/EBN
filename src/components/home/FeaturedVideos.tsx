import { Container } from '../ui/Container'
import { VideoGrid } from './VideoGrid'
import { Button } from '../ui/Button'
import { useState } from 'react'

export function FeaturedVideos() {
  const [showAll, setShowAll] = useState(false)

  return (
    <section className="section-padding">
      <Container>
        <VideoGrid 
          limit={showAll ? undefined : 3} 
          channelId="UCKJxvfhbJVoXaIeuE9a1IYw" 
        />
        <div className="mt-12 text-center">
          <Button 
            variant="secondary" 
            size="lg"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? 'Show Less' : 'View All Tutorials'}
          </Button>
        </div>
      </Container>
    </section>
  )
}
