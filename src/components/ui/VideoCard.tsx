import { cn } from '../../utils/cn'
import { useState } from 'react'

interface VideoCardProps {
  title: string
  description: string
  duration: string
  thumbnail: string
  url: string
  category: string
  date: string
}

export function VideoCard({
  title,
  description,
  duration,
  thumbnail,
  url,
  category,
  date,
}: VideoCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <a
      href={url}
      className="group relative flex flex-col overflow-hidden rounded-lg bg-primary/5 transition-all hover:-translate-y-1 hover:bg-primary/10"
    >
      {/* Thumbnail */}
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={thumbnail}
          alt={title}
          onLoad={() => setImageLoaded(true)}
          className={cn(
            'h-full w-full object-cover transition-transform duration-300 group-hover:scale-105',
            !imageLoaded && 'blur-sm'
          )}
        />
        <div className="absolute bottom-2 right-2 rounded bg-background/80 px-2 py-1 text-xs font-medium backdrop-blur-sm">
          {duration}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 text-xs font-medium text-text-secondary">
          {new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </div>
        <h3 className="mb-2 text-lg font-semibold text-text-primary line-clamp-2">
          {title}
        </h3>
        <p className="mb-4 text-sm text-text-secondary line-clamp-2">
          {description}
        </p>
        <div className="mt-auto">
          <span className="inline-flex items-center rounded-full bg-primary/20 px-2.5 py-0.5 text-xs font-medium text-text-primary">
            {category}
          </span>
        </div>
      </div>
    </a>
  )
}
