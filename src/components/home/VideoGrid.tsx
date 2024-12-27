import { Container } from '../ui/Container'
import { VideoCard } from '../ui/VideoCard'
import { SectionHeader } from '../ui/SectionHeader'

interface Video {
  id: number
  title: string
  description: string
  duration: string
  thumbnail: string
  url: string
  category: string
  date: string
}

const ALL_VIDEOS: Video[] = [
  {
    id: 1,
    title: 'Building a Modern React Application',
    description: 'Learn how to build a full-stack application with React and TypeScript',
    duration: '45:22',
    thumbnail: '/images/tutorials/react-app.jpg',
    url: '/tutorials/react-app',
    category: 'React',
    date: '2024-03-15',
  },
  // Add more videos...
]

interface VideoGridProps {
  limit?: number
}

export function VideoGrid({ limit }: VideoGridProps) {
  const videos = limit ? ALL_VIDEOS.slice(0, limit) : ALL_VIDEOS

  return (
    <section className="section-padding">
      <Container>
        <SectionHeader
          title="Latest Tutorials"
          description="Learn through comprehensive, project-based tutorials"
        />
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => (
            <VideoCard key={video.id} {...video} />
          ))}
        </div>
      </Container>
    </section>
  )
}
