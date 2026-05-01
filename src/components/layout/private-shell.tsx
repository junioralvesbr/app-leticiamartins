'use client'

import { signOut } from '@/services/auth.service'
import {
  Bot,
  FolderKanban,
  LayoutDashboard,
  UsersRound,
  WalletCards,
  type LucideIcon,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

type NavigationItem = {
  href: string
  label: string
  icon: LucideIcon
}

const navigation: NavigationItem[] = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/clients', label: 'Clientes', icon: UsersRound },
  { href: '/projects', label: 'Projetos', icon: FolderKanban },
  { href: '/financials', label: 'Financeiro', icon: WalletCards },
  { href: '/assistants', label: 'Assistentes', icon: Bot },
]

function getPageTitle(pathname: string) {
  const pageTitle = navigation.map((item) => {
    if (pathname.startsWith(item.href)) {
      return item.label
    }
  })

  if (pageTitle) {
    return pageTitle
  }

  return 'Dashboard'
}

export function PrivateShell({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isClientDetailsPage = /^\/clients\/[^/]+$/.test(pathname)
  const pageTitle = getPageTitle(pathname)

  return (
    <div className='bg-background text-on-surface min-h-screen lg:grid lg:grid-cols-[280px_1fr]'>
      <aside className='border-outline-variant bg-surface-container-lowest hidden min-h-screen flex-col border-r lg:flex'>
        <div className='px-8 py-10'>
          <Link href='/dashboard' className='block cursor-pointer'>
            <p className='text-primary font-serif text-xl font-medium'>
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
            const Icon = item.icon

            return (
              <Link
                key={item.href}
                href={item.href}
                className={
                  active
                    ? 'border-primary bg-surface-container-low text-primary flex cursor-pointer items-center gap-4 border-r-2 px-8 py-4 text-sm font-bold tracking-widest uppercase'
                    : 'text-on-surface-variant hover:bg-surface-container-low flex cursor-pointer items-center gap-4 border-r-2 border-transparent px-8 py-4 text-sm font-semibold tracking-widest uppercase transition-colors'
                }
              >
                <Icon className='size-5 shrink-0' aria-hidden='true' />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className='border-outline-variant mx-8 border-t py-8'>
          <div className='flex items-center gap-3'>
            <div className='bg-primary text-on-primary flex size-10 items-center justify-center rounded-full font-serif text-sm'>
              LM
            </div>
            <div>
              <p className='text-primary text-sm font-bold'>Letícia Martins</p>
              <p className='text-on-surface-variant text-xs uppercase'>
                Plano Pro
              </p>
            </div>
          </div>
        </div>
      </aside>

      <div className='min-w-0'>
        {isClientDetailsPage ? null : (
          <header className='border-outline-variant bg-surface-container-lowest/85 sticky top-0 z-20 flex items-center justify-between gap-4 border-b px-4 py-4 backdrop-blur md:px-8 lg:px-10'>
            <h1 className='text-primary font-serif text-2xl font-semibold md:text-3xl'>
              {pageTitle}
            </h1>

            <div className='hidden items-center gap-4 md:flex'>
              <span className='text-primary font-serif text-base'>
                Letícia Martins
              </span>
              <form action={signOut}>
                <button
                  type='submit'
                  className='border-outline-variant text-on-surface-variant hover:text-primary cursor-pointer rounded border px-3 py-2 text-xs font-bold tracking-widest uppercase transition-colors'
                >
                  Sair
                </button>
              </form>
            </div>
          </header>
        )}

        {children}
      </div>
    </div>
  )
}
