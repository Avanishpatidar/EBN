import { cn } from '../../utils/cn'
import { HTMLAttributes } from 'react'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'outline' | 'secondary'
}

export function Badge({ 
  className, 
  variant = 'default', 
  ...props 
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors',
        variant === 'default' && 'bg-primary/10 text-text-primary',
        variant === 'secondary' && 'bg-secondary/10 text-secondary',
        variant === 'outline' && 'border border-primary/20 text-text-secondary',
        className
      )}
      {...props}
    />
  )
} 