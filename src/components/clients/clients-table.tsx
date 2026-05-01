'use client'

import { ClientActions } from '@/components/clients/client-actions'
import type { Client } from '@/types/client'
import { ArrowDown } from 'lucide-react'
import Link from 'next/link'
import { useMemo, useState } from 'react'

type ClientsTableProps = {
  clients: Client[]
}

const PAGE_SIZE = 10

function getInitial(name: string) {
  return name.trim().charAt(0).toUpperCase()
}

function getSubtitle(client: Client) {
  if (client.referrer?.name) {
    return `Indicado por: ${client.referrer.name}`
  }

  if (client.notes) {
    return client.notes
  }

  return ''
}

function displayValue(value: string | null) {
  return value?.trim() || ''
}

export function ClientsTable({ clients }: ClientsTableProps) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const visibleClients = useMemo(
    () => clients.slice(0, visibleCount),
    [clients, visibleCount]
  )
  const hasMoreClients = visibleCount < clients.length

  function handleLoadMore() {
    setVisibleCount((current) => Math.min(current + PAGE_SIZE, clients.length))
  }

  if (!clients.length) {
    return (
      <div className='border-outline-variant bg-surface-container-lowest rounded-lg border px-6 py-16 text-center'>
        <h2 className='text-primary font-serif text-2xl font-semibold'>
          Nenhum cliente cadastrado
        </h2>
        <p className='text-on-surface-variant mx-auto mt-2 max-w-md text-sm leading-6'>
          Cadastre o primeiro cliente para começar a organizar origem, contatos
          e histórico de relacionamento.
        </p>
      </div>
    )
  }

  return (
    <section className='border-outline-variant bg-surface-container-lowest overflow-hidden rounded-lg border'>
      <div className='border-outline-variant text-on-surface-variant hidden grid-cols-[1.35fr_0.95fr_0.65fr_1.2fr_0.7fr_1.1fr] items-center gap-6 border-b px-6 py-4 text-xs font-bold tracking-widest uppercase lg:grid'>
        <span className='pl-[60px]'>Nome</span>
        <span>Profissão</span>
        <span>Cidade</span>
        <span>Contato</span>
        <span>Origem</span>
        <span className='text-center'>Ações</span>
      </div>

      <div className='divide-outline-variant divide-y'>
        {visibleClients.map((client) => {
          const subtitle = getSubtitle(client)

          return (
            <article
              key={client.id}
              className='hover:bg-surface-container-low/70 grid gap-4 px-5 py-5 transition-colors lg:grid-cols-[1.35fr_0.95fr_0.65fr_1.2fr_0.7fr_1.1fr] lg:items-center lg:gap-6 lg:px-6'
            >
              <Link
                href={`/clients/${client.id}`}
                className='grid cursor-pointer grid-cols-[44px_1fr] items-center gap-4'
              >
                <span className='bg-primary-fixed text-primary flex size-11 items-center justify-center rounded font-serif text-lg'>
                  {getInitial(client.name)}
                </span>
                <span>
                  <strong className='text-primary block text-base font-bold'>
                    {client.name}
                  </strong>
                  {subtitle ? (
                    <span className='text-on-surface-variant line-clamp-2 text-sm italic'>
                      {subtitle}
                    </span>
                  ) : null}
                </span>
              </Link>

              <p className='text-on-surface text-sm lg:text-base'>
                <span className='text-on-surface-variant mr-2 text-xs font-bold uppercase lg:hidden'>
                  Profissão
                </span>
                {displayValue(client.profession)}
              </p>

              <p className='text-on-surface text-sm lg:text-base'>
                <span className='text-on-surface-variant mr-2 text-xs font-bold uppercase lg:hidden'>
                  Cidade
                </span>
                {displayValue(client.city)}
              </p>

              <div className='text-sm'>
                <p className='text-on-surface'>{displayValue(client.email)}</p>
                <p className='text-on-surface-variant'>
                  {displayValue(client.phone)}
                </p>
              </div>

              <div>
                <span className='bg-primary-fixed text-secondary inline-flex rounded-full px-3 py-1 text-xs font-bold tracking-widest uppercase'>
                  {displayValue(client.origin)}
                </span>
              </div>

              <ClientActions client={client} />
            </article>
          )
        })}
      </div>

      {hasMoreClients ? (
        <div className='border-outline-variant flex justify-center border-t px-6 py-5'>
          <button
            type='button'
            onClick={handleLoadMore}
            className='border-primary text-primary hover:bg-primary-fixed/60 inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded border bg-transparent px-5 text-sm font-semibold transition-all duration-200'
          >
            <ArrowDown className='size-4' aria-hidden='true' />
            Carregar mais
          </button>
        </div>
      ) : null}
    </section>
  )
}
