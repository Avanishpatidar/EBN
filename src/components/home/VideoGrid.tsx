import { Container } from '../ui/Container'
import { VideoCard } from '../ui/VideoCard'
import { SectionHeader } from '../ui/SectionHeader'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

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

const COLORS = [
  "from-blue-400 to-blue-600",
  "from-purple-400 to-purple-600",
  "from-green-400 to-green-600",
  "from-red-400 to-red-600",
  "from-yellow-400 to-yellow-600",
];

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {displayedVideos.map((video, index) => (
          <motion.div key={video.id} variants={itemVariants}>
            <VideoCard
              title={video.title}
              duration={video.duration}
              thumbnail={video.thumbnail}
              url={video.url}
              views={video.views}
              likes={video.likes}
              color={COLORS[index % COLORS.length]}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
