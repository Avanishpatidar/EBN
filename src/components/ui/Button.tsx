import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '../../utils/cn'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          // Base styles
          'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200',
          'focus-ring disabled:opacity-50 disabled:pointer-events-none',
          
          // Size variants
          size === 'sm' && 'h-8 px-3 text-sm',
          size === 'md' && 'h-10 px-4 text-base',
          size === 'lg' && 'h-12 px-6 text-lg',
          
          // Variant styles
          variant === 'primary' && [
            'bg-black hover:bg-zinc-900 text-white border border-white/10',
            'shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-black/30',
            'active:shadow-md active:translate-y-0.5',
          ],
          variant === 'secondary' && [
            'bg-white/5 hover:bg-white/10 text-white border border-white/10',
            'shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-black/30',
            'active:shadow-md active:translate-y-0.5',
          ],
          variant === 'ghost' && [
            'bg-transparent hover:bg-zinc-800/10 text-zinc-400 hover:text-zinc-50',
            'active:bg-zinc-800/20',
          ],
          variant === 'outline' && [
            'border-2 border-zinc-800/20 hover:border-zinc-800/40',
            'text-zinc-400 hover:text-zinc-50',
            'active:bg-zinc-800/10',
          ],
          
          // Loading state
          isLoading && 'relative text-transparent hover:text-transparent',
          
          className
        )}
        disabled={isLoading}
        {...props}
      >
        {children}
        {isLoading && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <svg
              className="h-5 w-5 animate-spin text-zinc-50"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
          </div>
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'