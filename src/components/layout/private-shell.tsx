'use client'

import { signOut } from '@/services/auth.service'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

const navigation = [
  { href: '/dashboard', label: 'Dashboard', icon: '▦' },
  { href: '/clients', label: 'Clientes', icon: '◉' },
  { href: '/projects', label: 'Projetos', icon: '▤' },
  { href: '/financials', label: 'Financeiro', icon: '▣' },
  { href: '/assistants', label: 'Assistentes', icon: '◌' },
]

export function PrivateShell({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  return (
    <div className='min-h-screen bg-background text-on-surface lg:grid lg:grid-cols-[280px_1fr]'>
      <aside className='border-outline-variant bg-surface-container-lowest hidden min-h-screen flex-col border-r lg:flex'>
        <div className='px-8 py-10'>
          <Link href='/dashboard' className='block'>
            <p className='font-serif text-xl font-medium text-primary'>
              Letícia Martins
            </p>
            <p className='text-on-surface-variant mt-2 text-xs tracking-[0.32em] uppercase'>
              Personal Organizer
            </p>
          </Link>
        </div>

        <nav className='flex flex-1 flex-col gap-1 py-8'>
          {navigation.map((item) => {
            const active = pathname.startsWith(item.href)

            return (
              <Link
                key={item.href}
                href={item.href}
                className={
                  active
                    ? 'border-primary bg-surface-container-low text-primary flex items-center gap-4 border-r-2 px-8 py-4 text-sm font-bold tracking-widest uppercase'
                    : 'text-on-surface-variant hover:bg-surface-container-low flex items-center gap-4 border-r-2 border-transparent px-8 py-4 text-sm font-semibold tracking-widest uppercase transition-colors'
                }
              >
                <span className='w-5 text-center text-lg leading-none'>
                  {item.icon}
                </span>
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className='mx-8 border-t border-outline-variant py-8'>
          <div className='flex items-center gap-3'>
            <div className='bg-primary text-on-primary flex size-10 items-center justify-center rounded-full font-serif text-sm'>
              LM
            </div>
            <div>
              <p className='text-sm font-bold text-primary'>Letícia Martins</p>
              <p className='text-on-surface-variant text-xs uppercase'>
                Plano Pro
              </p>
            </div>
          </div>
        </div>
      </aside>

      <div className='min-w-0'>
        <header className='border-outline-variant bg-surface-container-lowest/85 sticky top-0 z-20 flex items-center justify-between gap-4 border-b px-4 py-4 backdrop-blur md:px-8 lg:px-10'>
          <div className='relative w-full max-w-xl'>
            <span className='text-outline absolute top-1/2 left-4 -translate-y-1/2'>
              ⌕
            </span>
            <input
              type='search'
              placeholder='Buscar no sistema...'
              className='bg-surface-container-low text-on-surface placeholder:text-on-surface-variant focus:ring-secondary/15 w-full rounded-lg border border-transparent py-3 pr-4 pl-11 text-sm outline-none transition-all focus:border-outline-variant focus:ring-2'
            />
          </div>

          <div className='hidden items-center gap-4 md:flex'>
            <span className='text-primary font-serif text-base'>
              Letícia Martins
            </span>
            <form action={signOut}>
              <button
                type='submit'
                className='border-outline-variant text-on-surface-variant hover:text-primary rounded border px-3 py-2 text-xs font-bold tracking-widest uppercase transition-colors'
              >
                Sair
              </button>
            </form>
          </div>
        </header>

        {children}
      </div>
    </div>
  )
}
