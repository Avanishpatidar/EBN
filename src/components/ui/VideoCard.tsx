import { cn } from '../../utils/cn'
import { useState } from 'react'

interface VideoCardProps {
  title: string
  duration: string
  thumbnail: string
  url: string
  // date: string
  views: string
  likes: string
}

export function VideoCard({
  title,
  duration,
  thumbnail,
  url,
  // date,
  views,
  likes,
}: VideoCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <a
      href={url}
      className="group relative flex flex-col overflow-hidden rounded-lg bg-primary/5 transition-all hover:-translate-y-1 hover:bg-primary/10"
    >
      {/* Thumbnail with Duration */}
      <div className="aspect-video w-full overflow-hidden relative">
        <img
          src={thumbnail}
          alt={title}
          onLoad={() => setImageLoaded(true)}
          className={cn(
            'h-full w-full object-cover transition-transform duration-300 group-hover:scale-105',
            !imageLoaded && 'blur-sm'
          )}
        />
        <div className="absolute bottom-2 right-2 rounded bg-black/80 px-2 py-1 text-xs font-medium text-white">
          {duration}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        {/* Title and Stats */}
        <div className="mb-2 flex flex-col space-y-1">
          <h3 className="text-lg font-semibold text-text-primary line-clamp-2">
            {title}
          </h3>
          <div className="flex items-center space-x-2 text-sm text-text-secondary">
            <span>{views} views</span>
            <span>•</span>
            <span>{likes} likes</span>
          </div>
        </div>

        {/* Footer */}
        {/* <div className="mt-auto flex items-center justify-between">
          <span className="text-xs text-text-secondary">
            {new Date(date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </span>
        </div> */}
      </div>
    </a>
  )
}
