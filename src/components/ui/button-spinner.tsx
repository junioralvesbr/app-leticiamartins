import { cn } from '@/lib/utils'

type ButtonSpinnerProps = {
  className?: string
}

export function ButtonSpinner({ className }: ButtonSpinnerProps) {
  return (
    <span
      className={cn(
        'size-4 animate-spin rounded-full border-2 border-current/35 border-t-current',
        className
      )}
      aria-hidden='true'
    />
  )
}
