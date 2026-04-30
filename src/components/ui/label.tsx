import { cn } from '@/lib/utils'
import type { LabelHTMLAttributes } from 'react'

export function Label({
  className,
  ...props
}: LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn(
        'font-body text-on-surface-variant mb-2 block text-xs font-bold tracking-widest uppercase',
        className
      )}
      {...props}
    />
  )
}
