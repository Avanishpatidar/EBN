import { cn } from '../../utils/cn'
import { HTMLAttributes, forwardRef } from 'react'

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'default' | 'small' | 'large'
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = 'default', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'mx-auto w-full px-4 sm:px-6 lg:px-8',
          size === 'small' && 'max-w-4xl',
          size === 'default' && 'max-w-6xl',
          size === 'large' && 'max-w-7xl',
          className
        )}
        {...props}
      />
    )
  }
)

Container.displayName = 'Container'
