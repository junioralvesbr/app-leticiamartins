import { cn } from '@/lib/utils'
import type { InputHTMLAttributes } from 'react'

export function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        'border-outline-variant bg-surface-container-low/60 font-body text-on-surface placeholder:text-outline focus:border-secondary focus:ring-secondary/15 w-full rounded border px-4 py-3 text-sm transition-all duration-200 outline-none focus:ring-2',
        className
      )}
      {...props}
    />
  )
}
