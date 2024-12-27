import { Container } from '../ui/Container'
import { VideoGrid } from './VideoGrid'
import { Button } from '../ui/Button'

export function FeaturedVideos() {
  return (
    <section className="section-padding">
      <Container>
        <VideoGrid limit={3} />
        <div className="mt-12 text-center">
          <Button variant="secondary" size="lg">
            View All Tutorials
          </Button>
        </div>
      </Container>
    </section>
  )
}
