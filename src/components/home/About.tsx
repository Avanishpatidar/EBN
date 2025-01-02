// components/About.tsx
import { Container } from '../ui/Container'
import { SectionHeader } from '../ui/SectionHeader'
import { motion } from 'framer-motion'

export function About() {
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
    <section id="About" className="section-padding">
      <Container size="small">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <SectionHeader
              title="About Error by Night"
              description="Learn to code through real-world projects and hands-on experience"
              alignment="center"
            />
          </motion.div>
          <motion.div className="mt-12 space-y-8 text-lg text-text-secondary" variants={itemVariants}>
            <p>
              Error by Night is a coding education platform focused on teaching modern web
              development through practical, project-based tutorials. Our goal is to help
              developers of all levels build real-world applications while learning
              industry best practices.
            </p>
            <p>
              We believe in learning by doing. Instead of just watching tutorials, you'll
              build complete applications from scratch, understand common pitfalls, and
              learn how to solve real-world problems.
            </p>
            <p>
              Join our community of developers, share your knowledge, and take your
              coding skills to the next level.
            </p>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
