import { Container } from '../ui/Container'
import { VideoGrid } from './VideoGrid'
import { Button } from '../ui/Button'
import { useState } from 'react'
import { motion } from 'framer-motion'

export function FeaturedVideos() {
  const [showAll, setShowAll] = useState(false)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
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

  return (
    <section id="FeaturedVideos" className="relative bg-black text-white py-24">
      <Container>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h2 
            className="text-4xl font-bold text-center mb-12 text-text-primary"
            variants={itemVariants}
          >
            <span className="animated-gradient-text">Featured Videos</span>
          </motion.h2>
          <motion.div variants={itemVariants}>
            <VideoGrid 
              limit={showAll ? undefined : 3} 
              channelId="UCKJxvfhbJVoXaIeuE9a1IYw" 
            />
          </motion.div>
          <motion.div className="mt-12 text-center" variants={itemVariants}>
            <Button 
              variant="secondary" 
              size="lg"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? 'Show Less' : 'View All Tutorials'}
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
