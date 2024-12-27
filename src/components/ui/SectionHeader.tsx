import { cn } from '../../utils/cn'

interface SectionHeaderProps {
  title: string
  description?: string
  alignment?: 'left' | 'center'
}

export function SectionHeader({
  title,
  description,
  alignment = 'left',
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'max-w-3xl',
        alignment === 'center' && 'mx-auto text-center'
      )}
    >
      <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-lg text-text-secondary">
          {description}
        </p>
      )}
    </div>
  )
} 