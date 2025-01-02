// components/Blog.tsx
import { Container } from '../ui/Container'
import { Button } from '../ui/Button'
import { motion } from 'framer-motion'
import { cn } from "../../utils/cn";

// Mock blog data
const blogPosts = [
  { id: 1, title: "Getting Started with React", excerpt: "Learn the basics of React and start building your first component.", date: "2023-05-01", color: "from-blue-400 to-blue-600" },
  { id: 2, title: "Advanced TypeScript Techniques", excerpt: "Dive deep into TypeScript and explore advanced features for better type safety.", date: "2023-05-15", color: "from-purple-400 to-purple-600" },
  { id: 3, title: "Building Scalable Node.js Applications", excerpt: "Discover best practices for creating large-scale Node.js applications.", date: "2023-06-01", color: "from-green-400 to-green-600" },
];

export function Blog() {
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
    <section id="Blogs" className="relative bg-black text-white py-24">
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
            <span className="animated-gradient-text">Latest Blog Posts</span>
          </motion.h2>
          <div className="grid gap-8 md:grid-cols-3">
            {blogPosts.map((post) => (
              <motion.div
                key={post.id}
                variants={itemVariants}
                className="relative"
              >
                <div className="absolute -inset-[2px] rounded-xl overflow-hidden">
                  <div
                    className={cn(
                      "absolute inset-0 blur-[2px]",
                      `bg-gradient-to-r ${post.color}`
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
                <div className="relative rounded-xl bg-zinc-900/50 backdrop-blur-xl shadow-lg h-full flex flex-col overflow-hidden">
                  <div className="h-48 bg-gray-700 relative">
                    {/* Image placeholder */}
                    <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                      Image Placeholder
                    </div>
                  </div>
                  <div className="p-6 flex-grow">
                    <h3 className="text-xl font-semibold mb-2 text-text-primary">{post.title}</h3>
                    <p className="text-text-secondary text-sm">{post.excerpt}</p>
                  </div>
                  <div className="p-6 flex justify-between items-center border-t border-gray-700">
                    <span className="text-sm text-text-secondary">{post.date}</span>
                    <Button variant="secondary" size="sm">Read More</Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div className="mt-12 text-center" variants={itemVariants}>
            <Button variant="primary" size="lg">View All Posts</Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
