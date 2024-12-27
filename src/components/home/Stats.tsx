import { Container } from '../ui/Container'

const STATS = [
  {
    label: 'Video Tutorials',
    value: '100+',
    description: 'In-depth coding tutorials',
    icon: '🎥',
  },
  {
    label: 'Active Students',
    value: '5,000+',
    description: 'Learning and building',
    icon: '👨‍💻',
  },
  {
    label: 'Projects',
    value: '50+',
    description: 'Real-world applications',
    icon: '🚀',
  },
  {
    label: 'Community',
    value: '10,000+',
    description: 'Discord members',
    icon: '🤝',
  },
]

export function Stats() {
  return (
    <section className="section-padding bg-primary/5">
      <Container>
        <div className="grid gap-8 md:grid-cols-4">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="group relative rounded-lg bg-primary/10 p-6 transition-colors hover:bg-primary/20"
            >
              <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-accent/20 to-secondary/20 opacity-0 blur transition-opacity group-hover:opacity-100" />
              <div className="relative flex flex-col items-center text-center">
                <span className="text-4xl mb-4">{stat.icon}</span>
                <div className="text-3xl font-bold text-text-primary">
                  {stat.value}
                </div>
                <div className="mt-1 font-medium text-text-primary">
                  {stat.label}
                </div>
                <div className="mt-1 text-sm text-text-secondary">
                  {stat.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
} 