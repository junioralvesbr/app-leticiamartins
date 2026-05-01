import { cn } from '@/lib/utils'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  variant?: ButtonVariant
}

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-on-primary hover:bg-primary-container disabled:opacity-60',
  secondary:
    'border border-primary bg-transparent text-primary hover:bg-primary-fixed/60 disabled:opacity-60',
}

export function Button({
  children,
  className,
  variant = 'primary',
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'font-body focus-visible:ring-secondary inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded px-4 text-sm font-semibold transition-all duration-200 focus-visible:ring-2 focus-visible:outline-none active:scale-[0.98] disabled:cursor-not-allowed',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
