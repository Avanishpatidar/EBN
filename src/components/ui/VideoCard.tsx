import { cn } from '../../utils/cn'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiPlay, FiThumbsUp } from 'react-icons/fi'

interface VideoCardProps {
  title: string
  duration: string
  thumbnail: string
  url: string
  views: string
  likes: string
  color: string
}

export function VideoCard({
  title,
  duration,
  thumbnail,
  url,
  views,
  likes,
  color,
}: VideoCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <motion.div
      className="relative"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute -inset-[2px] rounded-xl overflow-hidden">
        <div
          className={cn(
            "absolute inset-0 blur-[2px]",
            `bg-gradient-to-r ${color}`
          )}
          style={{
            maskImage: 'linear-gradient(black, black), linear-gradient(black, black)',
            maskSize: '100% 3px, 3px 100%',
            maskPosition: '0 0, 100% 0',
            maskRepeat: 'no-repeat',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            animation: 'rotate-glow 4s linear infinite',
          }}
        />
      </div>
      <a
        href={url}
        className="relative flex flex-col overflow-hidden rounded-xl bg-zinc-900/50 backdrop-blur-xl shadow-lg h-full"
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
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <FiPlay className="w-12 h-12 text-white" />
          </div>
          <div className="absolute bottom-2 right-2 rounded bg-black/80 px-2 py-1 text-xs font-medium text-white">
            {duration}
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-6">
          <h3 className="text-xl font-semibold text-text-primary line-clamp-2 mb-4">
            {title}
          </h3>
          <div className="mt-auto flex items-center justify-between text-text-secondary">
            <div className="flex items-center space-x-2">
              <FiPlay className="w-4 h-4" />
              <span className="text-sm">{views} views</span>
            </div>
            <div className="flex items-center space-x-2">
              <FiThumbsUp className="w-4 h-4" />
              <span className="text-sm">{likes} likes</span>
            </div>
          </div>
        </div>
      </a>
    </motion.div>
  )
}
