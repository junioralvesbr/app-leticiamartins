'use client'

import type { Client } from '@/types/client'
import { Eye } from 'lucide-react'
import Link from 'next/link'

type ClientActionsProps = {
  client: Client
}

export function ClientActions({ client }: ClientActionsProps) {
  return (
    <div className='flex items-center justify-center'>
      <Link
        href={`/clients/${client.id}`}
        className='text-primary hover:bg-primary-fixed inline-flex cursor-pointer items-center gap-1.5 rounded px-3 py-2 text-xs font-bold tracking-widest uppercase transition-colors'
      >
        <Eye className='size-3.5' aria-hidden='true' />
        Detalhes
      </Link>
    </div>
  )
}
