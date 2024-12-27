import { Container } from '../ui/Container'
import { SectionHeader } from '../ui/SectionHeader'

export function About() {
  return (
    <section className="section-padding">
      <Container size="small">
        <SectionHeader
          title="About Error by Night"
          description="Learn to code through real-world projects and hands-on experience"
          alignment="center"
        />
        <div className="mt-12 space-y-8 text-lg text-text-secondary">
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
        </div>
      </Container>
    </section>
  )
}
