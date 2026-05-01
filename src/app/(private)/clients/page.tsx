import { ClientFormModal } from '@/components/clients/client-form-modal'
import { ClientsTable } from '@/components/clients/clients-table'
import { getClients } from '@/services/clients.service'
import type { Client } from '@/types/client'
import { unstable_cache } from 'next/cache'
import Link from 'next/link'

type ClientsPageProps = {
  searchParams: Promise<{
    q?: string
  }>
}

function normalizeSearch(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

function getSummary(clients: Client[]) {
  const originCounts = clients.reduce<Record<string, number>>((acc, client) => {
    if (client.origin) {
      acc[client.origin] = (acc[client.origin] ?? 0) + 1
    }

    return acc
  }, {})
  const origins = Object.entries(originCounts)
    .sort(([, a], [, b]) => b - a)
    .map(([origin, count]) => ({
      origin,
      count,
      percentage: clients.length
        ? Math.round((count / clients.length) * 100)
        : 0,
    }))

  return {
    totalClients: clients.length,
    lifetimeClients: clients.length,
    activeProjects: 0,
    origins,
  }
}

function getClientsSignature(clients: Client[]) {
  return clients.map((client) => `${client.id}:${client.updated_at}`).join('|')
}

async function getCachedFilteredClients(clients: Client[], query: string) {
  const normalizedQuery = normalizeSearch(query)
  const clientsSignature = getClientsSignature(clients)

  return unstable_cache(
    async () => {
      if (!normalizedQuery) {
        return clients
      }

      return clients.filter((client) =>
        [
          client.name,
          client.profession,
          client.city,
          client.email,
          client.phone,
          client.origin,
        ]
          .filter(Boolean)
          .some((value) =>
            normalizeSearch(String(value)).includes(normalizedQuery)
          )
      )
    },
    ['clients-search', normalizedQuery, clientsSignature],
    {
      revalidate: 60,
      tags: ['clients-search'],
    }
  )()
}

export default async function ClientsPage({ searchParams }: ClientsPageProps) {
  const [{ q }, clientsResult] = await Promise.all([
    searchParams,
    getClients()
      .then((clients) => ({ clients, error: null }))
      .catch(() => ({
        clients: [] as Client[],
        error:
          'Não foi possível carregar os clientes da API. Verifique a tabela clients, RLS e permissões do Supabase.',
      })),
  ])
  const clients = clientsResult.clients
  const summary = getSummary(clients)
  const query = String(q ?? '').trim()
  const filteredClients = await getCachedFilteredClients(clients, query)
  const clientOptions = clients.map(({ id, name }) => ({ id, name }))

  return (
    <main className='min-h-[calc(100vh-73px)] px-4 py-6 md:px-8 lg:px-10'>
      <div className='mx-auto flex w-full max-w-7xl flex-col gap-8'>
        <section className='grid gap-5 lg:grid-cols-[1fr_340px]'>
          <div className='border-outline-variant bg-surface-container-low rounded-lg border p-6'>
            <h2 className='text-primary mt-2 font-serif text-2xl font-semibold'>
              Análise de relacionamento
            </h2>
            <div className='mt-5 grid gap-5 sm:grid-cols-2'>
              <div>
                <p className='text-secondary text-xs font-bold tracking-widest uppercase'>
                  Projetos ativos
                </p>
                <p className='text-primary font-serif text-3xl'>
                  {summary.activeProjects}
                </p>
              </div>
              <div>
                <p className='text-secondary text-xs font-bold tracking-widest uppercase'>
                  Clientes totais
                </p>
                <p className='text-primary font-serif text-3xl'>
                  {summary.lifetimeClients}
                </p>
              </div>
            </div>
          </div>

          <div className='bg-primary text-on-primary rounded-lg p-6'>
            <p className='text-primary-fixed text-xl font-bold tracking-widest uppercase'>
              Origens
            </p>
            {summary.origins.length ? (
              <ul className='mt-4 flex flex-col gap-3'>
                {summary.origins.map((origin) => (
                  <li
                    key={origin.origin}
                    className='flex items-center justify-between gap-4'
                  >
                    <span className='text-sm font-medium'>{origin.origin}</span>
                    <span className='text-primary-fixed text-sm font-bold'>
                      {origin.percentage}%
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className='text-primary-fixed mt-4 text-sm leading-6'>
                Sem dados de origem.
              </p>
            )}
          </div>
        </section>

        <section className='flex flex-col justify-between gap-4 xl:flex-row xl:items-center'>
          <form className='flex w-full max-w-2xl gap-3' action='/clients'>
            <input
              name='q'
              defaultValue={query}
              placeholder='Buscar cliente, cidade, origem ou contato...'
              className='border-outline-variant bg-surface-container-lowest text-on-surface placeholder:text-on-surface-variant focus:ring-secondary/15 focus:border-secondary min-h-11 flex-1 rounded border px-4 text-sm transition-all outline-none focus:ring-2'
            />
            <button
              type='submit'
              className='font-body border-primary text-primary hover:bg-primary-fixed/60 inline-flex min-h-11 cursor-pointer items-center justify-center rounded border bg-transparent px-4 text-sm font-semibold transition-all duration-200'
            >
              Buscar
            </button>
            {query ? (
              <Link
                href='/clients'
                className='font-body text-on-surface-variant hover:text-primary inline-flex min-h-11 cursor-pointer items-center justify-center rounded px-3 text-sm font-semibold transition-colors'
              >
                Limpar filtro
              </Link>
            ) : null}
          </form>

          <ClientFormModal
            clients={clientOptions}
            trigger={
              <span className='font-body bg-primary text-on-primary hover:bg-primary-container inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded px-4 text-sm font-semibold transition-all duration-200'>
                Cadastrar novo cliente
              </span>
            }
          />
        </section>

        {clientsResult.error ? (
          <div
            className='border-error/30 bg-error-container text-on-error-container rounded-lg border px-5 py-4 text-sm'
            role='status'
          >
            {clientsResult.error}
          </div>
        ) : null}

        <ClientsTable clients={filteredClients} />
      </div>
    </main>
  )
}
