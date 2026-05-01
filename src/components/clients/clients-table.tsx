import { ClientActions } from '@/components/clients/client-actions'
import type { Client } from '@/types/client'
import Link from 'next/link'

type ClientsTableProps = {
  clients: Client[]
}

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

  return 'Cadastro em acompanhamento'
}

export function ClientsTable({ clients }: ClientsTableProps) {
  const clientOptions = clients.map(({ id, name }) => ({ id, name }))

  if (!clients.length) {
    return (
      <div className='border-outline-variant bg-surface-container-lowest rounded-lg border px-6 py-16 text-center'>
        <h2 className='font-serif text-2xl font-semibold text-primary'>
          Nenhum cliente cadastrado
        </h2>
        <p className='text-on-surface-variant mx-auto mt-2 max-w-md text-sm leading-6'>
          Cadastre o primeiro cliente para começar a organizar origem,
          contatos e histórico de relacionamento.
        </p>
      </div>
    )
  }

  return (
    <section className='border-outline-variant bg-surface-container-lowest overflow-hidden rounded-lg border'>
      <div className='hidden grid-cols-[1.35fr_0.95fr_0.65fr_1.2fr_0.7fr_1.1fr] gap-6 border-b border-outline-variant px-6 py-4 text-xs font-bold tracking-widest text-on-surface-variant uppercase lg:grid'>
        <span>Nome</span>
        <span>Profissão</span>
        <span>Cidade</span>
        <span>Contato</span>
        <span>Origem</span>
        <span className='text-right'>Ações</span>
      </div>

      <div className='divide-y divide-outline-variant'>
        {clients.map((client) => (
          <article
            key={client.id}
            className='grid gap-4 px-5 py-5 transition-colors hover:bg-surface-container-low/70 lg:grid-cols-[1.35fr_0.95fr_0.65fr_1.2fr_0.7fr_1.1fr] lg:items-center lg:gap-6 lg:px-6'
          >
            <Link
              href={`/clients/${client.id}`}
              className='grid grid-cols-[44px_1fr] items-center gap-4'
            >
              <span className='bg-primary-fixed text-primary flex size-11 items-center justify-center rounded font-serif text-lg'>
                {getInitial(client.name)}
              </span>
              <span>
                <strong className='block text-base font-bold text-primary'>
                  {client.name}
                </strong>
                <span className='text-on-surface-variant line-clamp-2 text-sm italic'>
                  {getSubtitle(client)}
                </span>
              </span>
            </Link>

            <p className='text-sm text-on-surface lg:text-base'>
              <span className='text-on-surface-variant mr-2 text-xs font-bold uppercase lg:hidden'>
                Profissão
              </span>
              {client.profession ?? 'Não informada'}
            </p>

            <p className='text-sm text-on-surface lg:text-base'>
              <span className='text-on-surface-variant mr-2 text-xs font-bold uppercase lg:hidden'>
                Cidade
              </span>
              {client.city ?? 'Não informada'}
            </p>

            <div className='text-sm'>
              <p className='text-on-surface'>{client.email ?? 'Sem email'}</p>
              <p className='text-on-surface-variant'>
                {client.phone ?? 'Sem telefone'}
              </p>
            </div>

            <div>
              <span className='bg-primary-fixed text-secondary inline-flex rounded-full px-3 py-1 text-xs font-bold tracking-widest uppercase'>
                {client.origin ?? 'Não informada'}
              </span>
            </div>

            <ClientActions client={client} clients={clientOptions} />
          </article>
        ))}
      </div>
    </section>
  )
}
