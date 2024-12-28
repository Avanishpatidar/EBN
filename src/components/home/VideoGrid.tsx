import { Container } from '../ui/Container'
import { VideoCard } from '../ui/VideoCard'
import { SectionHeader } from '../ui/SectionHeader'
import { useEffect, useState } from 'react'

interface Video {
  id: string
  title: string
  description: string
  duration: string
  thumbnail: string
  url: string
  category: string
  date: string
  views: string
  likes: string
}

interface VideoGridProps {
  limit?: number
  channelId: string
}

export function VideoGrid({ limit, channelId }: VideoGridProps) {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true)
        const response = await fetch(
          `http://localhost:3001/api/youtube-rss?channelId=${channelId}`
        )
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        
        // Sort videos by date (newest first)
        const sortedVideos = data.items.sort((a: Video, b: Video) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        )
        
        setVideos(sortedVideos)
        setError(null)
      } catch (e: any) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }

    fetchVideos()
  }, [channelId])

  const displayedVideos = limit ? videos.slice(0, limit) : videos

  if (loading) {
    return (
      <section className="section-padding">
        <Container>
          <SectionHeader
            title="Latest Tutorials"
            description="Loading videos..."
          />
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(limit || 6)].map((_, index) => (
              <div 
                key={index}
                className="animate-pulse bg-primary/5 rounded-lg aspect-video"
              />
            ))}
          </div>
        </Container>
      </section>
    )
  }

  if (error) {
    return (
      <section className="section-padding">
        <Container>
          <SectionHeader
            title="Latest Tutorials"
            description="Unable to load videos. Please try again later."
          />
          <div className="mt-8 text-center text-text-secondary">
            Error: {error}
          </div>
        </Container>
      </section>
    )
  }

  if (!videos.length) {
    return (
      <section className="section-padding">
        <Container>
          <SectionHeader
            title="Latest Tutorials"
            description="No videos found."
          />
        </Container>
      </section>
    )
  }

  return (
    <section className="section-padding">
      <Container>
        <SectionHeader
          title="Latest Tutorials"
          description="Learn through comprehensive, project-based tutorials"
        />
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {displayedVideos.map((video) => (
            <VideoCard
              key={video.id}
              title={video.title}
              duration={video.duration}
              thumbnail={video.thumbnail}
              url={video.url}
              views={video.views}
              likes={video.likes}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}
