import { ClientDetailActions } from '@/components/clients/client-detail-actions'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getClientById, getClients } from '@/services/clients.service'
import {
  AtSign,
  CalendarDays,
  ChevronRight,
  ClipboardList,
  ContactRound,
  Database,
  FileText,
  MapPin,
  Phone,
  UserRound,
  type LucideIcon,
} from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

type ClientDetailsPageProps = {
  params: Promise<{
    id: string
  }>
}

type DetailItemProps = {
  label: string
  value: React.ReactNode
  icon?: LucideIcon
}

function formatDate(date: string | null) {
  if (!date) {
    return 'Não informado'
  }

  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(date))
}

function formatDateTime(date: string | null) {
  if (!date) {
    return 'Não informado'
  }

  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
}

function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('')
}

function DetailItem({ label, value, icon }: DetailItemProps) {
  const Icon = icon

  return (
    <div>
      <p className='text-on-surface-variant text-xs font-bold tracking-widest'>
        {label}
      </p>
      <p className='text-on-surface mt-2 flex items-center gap-2 text-sm leading-6 sm:text-base'>
        {Icon ? (
          <Icon className='text-primary size-4' aria-hidden='true' />
        ) : null}
        <span>{value || 'Não informado'}</span>
      </p>
    </div>
  )
}

function SectionTitle({
  icon: Icon,
  children,
}: {
  icon: LucideIcon
  children: string
}) {
  return (
    <CardTitle className='text-primary flex items-center gap-4 text-3xl'>
      <Icon className='size-7 shrink-0' aria-hidden='true' />
      {children}
    </CardTitle>
  )
}

export default async function ClientDetailsPage({
  params,
}: ClientDetailsPageProps) {
  const { id } = await params
  const [client, clients] = await Promise.all([getClientById(id), getClients()])

  if (!client) {
    notFound()
  }

  const clientOptions = clients.map(({ id: clientId, name }) => ({
    id: clientId,
    name,
  }))

  return (
    <main className='bg-surface min-h-screen pb-12'>
      <header className='border-outline-variant bg-surface-container-lowest flex w-full flex-col gap-4 border-b px-4 py-3 md:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10'>
        <nav
          aria-label='Navegação estrutural'
          className='text-on-surface-variant flex items-center gap-3 font-serif text-sm'
        >
          <Link
            href='/clients'
            className='hover:text-primary cursor-pointer transition-colors'
          >
            Clientes
          </Link>
          <ChevronRight className='size-4' aria-hidden='true' />
          <span className='border-primary text-primary border-b font-semibold'>
            {client.name}
          </span>
        </nav>

        <ClientDetailActions client={client} clients={clientOptions} />
      </header>

      <div className='mx-auto flex w-full max-w-7xl flex-col gap-7 px-4 md:px-8 lg:px-10'>
        <section className='grid gap-7 pt-5 xl:grid-cols-[1fr_440px] xl:items-center'>
          <div className='flex flex-col gap-5 sm:flex-row sm:items-center'>
            <div className='border-outline-variant bg-primary-fixed text-primary flex size-32 shrink-0 items-center justify-center overflow-hidden rounded-lg border font-serif text-4xl font-semibold shadow-[0_18px_60px_oklch(24.3%_0.083_345.3/0.16)]'>
              {getInitials(client.name)}
            </div>

            <div>
              <h1 className='text-primary font-serif text-4xl leading-tight font-semibold md:text-5xl'>
                {client.name}
              </h1>
              <p className='text-on-surface-variant mt-2 text-lg italic md:text-xl'>
                {client.profession ?? 'Profissão não informada'}
              </p>
            </div>
          </div>

          <div className='grid gap-5 sm:grid-cols-2'>
            <Card className='bg-surface-container-lowest p-6'>
              <p className='text-on-surface-variant text-xs font-bold tracking-widest uppercase'>
                Total projetos
              </p>
              <p className='text-primary mt-3 font-serif text-3xl'>0</p>
              <div className='bg-primary-fixed mt-3 h-1 overflow-hidden rounded-full'>
                <div className='bg-primary h-full w-0 rounded-full' />
              </div>
            </Card>

            <Card className='bg-surface-container-lowest p-6'>
              <p className='text-on-surface-variant text-xs font-bold tracking-widest uppercase'>
                Último atendimento
              </p>
              <p className='text-primary mt-4 font-serif text-2xl'>
                Não informado
              </p>
              <p className='text-on-surface-variant mt-3 text-sm'>
                Vinculado aos projetos
              </p>
            </Card>
          </div>
        </section>

        <section className='grid gap-8 lg:grid-cols-[0.9fr_1.9fr]'>
          <Card className='bg-surface-container-lowest'>
            <CardHeader className='px-10 pt-10'>
              <SectionTitle icon={UserRound}>Dados Pessoais</SectionTitle>
            </CardHeader>
            <CardContent className='flex flex-col gap-8 px-10 pt-6 pb-10'>
              <DetailItem label='CPF' value={client.cpf} icon={ContactRound} />
              <DetailItem
                label='Cônjuge'
                value={client.spouse}
                icon={UserRound}
              />
              <DetailItem
                label='Data de Nascimento'
                value={formatDate(client.birth_date)}
                icon={CalendarDays}
              />
            </CardContent>
          </Card>

          <Card className='bg-surface-container-lowest'>
            <CardHeader className='px-10 pt-10'>
              <SectionTitle icon={MapPin}>Contato e Endereço</SectionTitle>
            </CardHeader>
            <CardContent className='grid gap-8 px-10 pt-6 pb-10 md:grid-cols-2'>
              <DetailItem label='Celular' value={client.phone} icon={Phone} />
              <DetailItem label='E-mail' value={client.email} icon={AtSign} />
              <div className='md:col-span-2'>
                <DetailItem
                  label='Endereço'
                  value={client.address}
                  icon={MapPin}
                />
              </div>
              <div className='md:col-span-2'>
                <DetailItem
                  label='Cidade / UF'
                  value={client.city}
                  icon={MapPin}
                />
              </div>
            </CardContent>
          </Card>
        </section>

        <section className='grid gap-8 lg:grid-cols-[1.45fr_1fr]'>
          <Card className='border-primary-fixed bg-primary-fixed/45 min-h-96'>
            <CardHeader className='px-10 pt-10'>
              <SectionTitle icon={Database}>Origem e Sistema</SectionTitle>
            </CardHeader>
            <CardContent className='grid gap-12 px-10 pt-6 pb-10 md:grid-cols-2'>
              <DetailItem
                label='Como Chegou'
                value={client.origin}
                icon={Database}
              />
              <DetailItem
                label='Indicado por'
                value={client.referrer?.name ?? null}
                icon={UserRound}
              />
              <DetailItem
                label='Data de Cadastro'
                value={formatDate(client.created_at)}
                icon={CalendarDays}
              />
              <DetailItem
                label='Última Atualização'
                value={formatDateTime(client.updated_at)}
                icon={ClipboardList}
              />
            </CardContent>
          </Card>

          <Card className='bg-surface-container-lowest'>
            <CardHeader className='px-10 pt-10'>
              <SectionTitle icon={FileText}>Observações</SectionTitle>
            </CardHeader>
            <CardContent className='px-10 pt-4 pb-10'>
              <div className='bg-surface-container-low rounded p-8'>
                <p className='text-on-surface text-lg leading-8 whitespace-pre-wrap italic'>
                  “{client.notes || 'Nenhuma observação registrada.'}”
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  )
}
