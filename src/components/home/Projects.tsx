import { Container } from '../ui/Container'
import { ProjectCard } from '../ui/ProjectCard'
import { SectionHeader } from '../ui/SectionHeader'

const FEATURED_PROJECTS = [
  {
    title: 'Modern E-commerce Platform',
    description: 'A full-stack e-commerce application with React, Node.js, and PostgreSQL',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    imageUrl: '/images/projects/ecommerce.jpg',
    demoUrl: '#',
    githubUrl: '#',
  },
  {
    title: 'Real-time Chat Application',
    description: 'Chat application with WebSocket integration and user authentication',
    technologies: ['Next.js', 'Socket.io', 'MongoDB', 'TypeScript'],
    imageUrl: '/images/projects/chat.jpg',
    demoUrl: '#',
    githubUrl: '#',
  },
  {
    title: 'Task Management Dashboard',
    description: 'Project management tool with drag-and-drop interface and team collaboration',
    technologies: ['React', 'Redux', 'Express', 'Docker'],
    imageUrl: '/images/projects/dashboard.jpg',
    demoUrl: '#',
    githubUrl: '#',
  },
]

export function Projects() {
  return (
    <section className="section-padding">
      <Container>
        <SectionHeader
          title="Featured Projects"
          description="Check out some of our recent projects and learn how they were built"
        />
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURED_PROJECTS.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </Container>
    </section>
  )
} 