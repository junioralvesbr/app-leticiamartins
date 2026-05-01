import { getClientById } from '@/services/clients.service'
import Link from 'next/link'
import { notFound } from 'next/navigation'

type ClientDetailsPageProps = {
  params: Promise<{
    id: string
  }>
}

function formatDate(date: string | null) {
  if (!date) {
    return 'Não informado'
  }

  return new Intl.DateTimeFormat('pt-BR', {
    timeZone: 'UTC',
  }).format(new Date(date))
}

function DetailItem({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className='border-outline-variant rounded border bg-surface-container-lowest px-4 py-3'>
      <p className='text-on-surface-variant text-xs font-bold tracking-widest uppercase'>
        {label}
      </p>
      <div className='mt-2 text-sm text-on-surface'>{value || 'Não informado'}</div>
    </div>
  )
}

export default async function ClientDetailsPage({
  params,
}: ClientDetailsPageProps) {
  const { id } = await params
  const client = await getClientById(id)

  if (!client) {
    notFound()
  }

  return (
    <main className='min-h-[calc(100vh-73px)] px-4 py-8 md:px-8 lg:px-10 lg:py-12'>
      <div className='mx-auto flex w-full max-w-5xl flex-col gap-8'>
        <div className='flex flex-col justify-between gap-4 sm:flex-row sm:items-start'>
          <div>
            <p className='text-secondary text-xs font-bold tracking-widest uppercase'>
              Cliente
            </p>
            <h1 className='mt-3 font-serif text-4xl font-semibold text-primary md:text-5xl'>
              {client.name}
            </h1>
            <p className='text-on-surface-variant mt-3 max-w-2xl leading-7'>
              Informações completas do relacionamento, contato e origem do
              cliente.
            </p>
          </div>

          <Link
            href='/clients'
            className='font-body inline-flex min-h-11 items-center justify-center rounded border border-primary bg-transparent px-4 text-sm font-semibold text-primary transition-all duration-200 hover:bg-primary-fixed/60'
          >
            Voltar
          </Link>
        </div>

        <section className='border-outline-variant bg-surface-container-low rounded-lg border p-6'>
          <div className='grid gap-4 md:grid-cols-2'>
            <DetailItem label='Nome' value={client.name} />
            <DetailItem label='Profissão' value={client.profession} />
            <DetailItem label='Email' value={client.email} />
            <DetailItem label='Telefone' value={client.phone} />
            <DetailItem label='Cidade' value={client.city} />
            <DetailItem label='Endereço' value={client.address} />
            <DetailItem label='CPF' value={client.cpf} />
            <DetailItem label='Nascimento' value={formatDate(client.birth_date)} />
            <DetailItem label='Cônjuge' value={client.spouse} />
            <DetailItem label='Origem' value={client.origin} />
            <DetailItem
              label='Cliente indicador'
              value={client.referrer?.name ?? null}
            />
            <DetailItem label='Cadastro' value={formatDate(client.created_at)} />
          </div>

          <div className='mt-4 border-outline-variant rounded border bg-surface-container-lowest px-4 py-4'>
            <p className='text-on-surface-variant text-xs font-bold tracking-widest uppercase'>
              Observações
            </p>
            <p className='mt-2 whitespace-pre-wrap text-sm leading-6 text-on-surface'>
              {client.notes || 'Nenhuma observação registrada.'}
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}
