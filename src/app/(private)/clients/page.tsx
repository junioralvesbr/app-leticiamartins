import { ClientFormModal } from '@/components/clients/client-form-modal'
import { ClientsTable } from '@/components/clients/clients-table'
import { getClients } from '@/services/clients.service'
import type { Client, ClientOrigin } from '@/types/client'

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
  const topOriginEntry = Object.entries(originCounts).sort(
    ([, a], [, b]) => b - a
  )[0]

  return {
    totalClients: clients.length,
    lifetimeClients: clients.length,
    activeProjects: 0,
    topOrigin: {
      origin: (topOriginEntry?.[0] as ClientOrigin | undefined) ?? null,
      percentage: clients.length
        ? Math.round(((topOriginEntry?.[1] ?? 0) / clients.length) * 100)
        : 0,
    },
  }
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
  const normalizedQuery = normalizeSearch(query)
  const filteredClients = normalizedQuery
    ? clients.filter((client) =>
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
    : clients
  const clientOptions = clients.map(({ id, name }) => ({ id, name }))

  return (
    <main className='min-h-[calc(100vh-73px)] px-4 py-8 md:px-8 lg:px-10 lg:py-12'>
      <div className='mx-auto flex w-full max-w-7xl flex-col gap-10'>
        <section className='flex flex-col justify-between gap-6 xl:flex-row xl:items-end'>
          <div>
            <p className='text-secondary text-xs font-bold tracking-widest uppercase'>
              Gestão
            </p>
            <h1 className='mt-3 font-serif text-4xl font-semibold text-primary md:text-5xl'>
              Diretório de clientes
            </h1>
            <p className='text-on-surface-variant mt-3 max-w-2xl text-base leading-7'>
              Organize relacionamento, origem, contatos e histórico de cada
              cliente em uma visão única e consultiva.
            </p>
          </div>

          <ClientFormModal
            clients={clientOptions}
            trigger={
              <span className='font-body inline-flex min-h-11 items-center justify-center gap-2 rounded bg-primary px-4 text-sm font-semibold text-on-primary transition-all duration-200 hover:bg-primary-container'>
                Cadastrar novo cliente
              </span>
            }
          />
        </section>

        <form className='flex max-w-xl gap-3' action='/clients'>
          <input
            name='q'
            defaultValue={query}
            placeholder='Buscar cliente, cidade, origem ou contato...'
            className='border-outline-variant bg-surface-container-lowest text-on-surface placeholder:text-on-surface-variant focus:ring-secondary/15 min-h-11 flex-1 rounded border px-4 text-sm outline-none transition-all focus:border-secondary focus:ring-2'
          />
          <button
            type='submit'
            className='font-body inline-flex min-h-11 items-center justify-center rounded border border-primary bg-transparent px-4 text-sm font-semibold text-primary transition-all duration-200 hover:bg-primary-fixed/60'
          >
            Buscar
          </button>
        </form>

        {clientsResult.error ? (
          <div
            className='border-error/30 bg-error-container text-on-error-container rounded-lg border px-5 py-4 text-sm'
            role='status'
          >
            {clientsResult.error}
          </div>
        ) : null}

        <ClientsTable clients={filteredClients} />

        <section className='grid gap-6 lg:grid-cols-[1fr_380px]'>
          <div className='border-outline-variant bg-surface-container-low rounded-lg border p-8'>
            <p className='text-secondary text-xs font-bold tracking-widest uppercase'>
              Crescimento
            </p>
            <h2 className='mt-3 font-serif text-3xl font-semibold text-primary'>
              Análise de relacionamento
            </h2>
            <p className='text-on-surface-variant mt-3 max-w-2xl leading-7'>
              Base atual com {summary.totalClients} cliente
              {summary.totalClients === 1 ? '' : 's'} cadastrado
              {summary.totalClients === 1 ? '' : 's'} para apoiar decisões de
              atendimento, prospecção e recorrência.
            </p>
            <div className='mt-6 grid gap-6 sm:grid-cols-2'>
              <div>
                <p className='text-secondary text-xs font-bold tracking-widest uppercase'>
                  Projetos ativos
                </p>
                <p className='font-serif text-4xl text-primary'>
                  {summary.activeProjects}
                </p>
              </div>
              <div>
                <p className='text-secondary text-xs font-bold tracking-widest uppercase'>
                  Clientes totais
                </p>
                <p className='font-serif text-4xl text-primary'>
                  {summary.lifetimeClients}
                </p>
              </div>
            </div>
          </div>

          <div className='rounded-lg bg-primary p-8 text-on-primary'>
            <p className='text-primary-fixed text-xs font-bold tracking-widest uppercase'>
              Principal origem
            </p>
            <h2 className='mt-3 font-serif text-3xl font-semibold'>
              {summary.topOrigin.origin ?? 'Sem dados'}
            </h2>
            <p className='text-primary-fixed mt-3 text-lg leading-7'>
              {summary.topOrigin.percentage}% dos clientes cadastrados chegaram
              por este canal.
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}
