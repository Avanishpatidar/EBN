import { Container } from '../ui/Container'
import { Badge } from '../ui/Badge'
import { SectionHeader } from '../ui/SectionHeader'

const TECH_CATEGORIES = [
  {
    name: 'Frontend',
    technologies: [
      { name: 'React', icon: '⚛️', level: 'Advanced' },
      { name: 'TypeScript', icon: '📘', level: 'Advanced' },
      { name: 'Next.js', icon: '▲', level: 'Advanced' },
      { name: 'Tailwind CSS', icon: '🎨', level: 'Advanced' },
    ],
  },
  {
    name: 'Backend',
    technologies: [
      { name: 'Node.js', icon: '🟢', level: 'Advanced' },
      { name: 'Express', icon: '🚂', level: 'Advanced' },
      { name: 'PostgreSQL', icon: '🐘', level: 'Advanced' },
      { name: 'MongoDB', icon: '🍃', level: 'Advanced' },
    ],
  },
  {
    name: 'DevOps & Tools',
    technologies: [
      { name: 'Docker', icon: '🐳', level: 'Intermediate' },
      { name: 'Git', icon: '📦', level: 'Advanced' },
      { name: 'AWS', icon: '☁️', level: 'Intermediate' },
      { name: 'CI/CD', icon: '🔄', level: 'Intermediate' },
    ],
  },
]

export function TechStack() {
  return (
    <section className="section-padding bg-primary/5">
      <Container>
        <SectionHeader
          title="Technologies We Cover"
          description="Learn modern web development with industry-standard technologies"
        />
        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {TECH_CATEGORIES.map((category) => (
            <div
              key={category.name}
              className="rounded-lg bg-primary/10 p-6 backdrop-blur-sm"
            >
              <h3 className="text-xl font-semibold text-text-primary">
                {category.name}
              </h3>
              <div className="mt-6 grid gap-4">
                {category.technologies.map((tech) => (
                  <div
                    key={tech.name}
                    className="flex items-center justify-between rounded-lg bg-primary/20 p-4"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{tech.icon}</span>
                      <span className="font-medium text-text-primary">
                        {tech.name}
                      </span>
                    </div>
                    <Badge variant="outline">{tech.level}</Badge>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
} 