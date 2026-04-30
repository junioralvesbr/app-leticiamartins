import { LoginForm } from '@/components/auth/login-form'

type LoginPageProps = {
  searchParams: Promise<{
    redirectTo?: string
  }>
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { redirectTo } = await searchParams

  return (
    <main className='bg-surface flex min-h-screen items-center justify-center px-6 py-12'>
      <div className='grid w-full max-w-6xl gap-12 lg:grid-cols-[1fr_440px] lg:items-center'>
        <section className='flex flex-col gap-6'>
          <p className='text-on-surface-variant text-xs font-bold tracking-widest uppercase'>
            Sistema de gestão
          </p>
          <div className='flex max-w-2xl flex-col gap-4'>
            <h1 className='text-primary font-serif text-4xl leading-tight font-semibold'>
              Letícia Martins
            </h1>
            <p className='text-on-surface-variant text-lg leading-8'>
              Um espaço organizado para acompanhar clientes, projetos e
              finanças com clareza.
            </p>
          </div>
          <div className='border-outline-variant grid max-w-2xl grid-cols-1 border-t pt-8 sm:grid-cols-3'>
            <div className='flex flex-col gap-1 py-3 sm:pr-6'>
              <span className='text-primary font-serif text-2xl'>CRM</span>
              <span className='text-on-surface-variant text-sm'>Clientes</span>
            </div>
            <div className='border-outline-variant flex flex-col gap-1 py-3 sm:border-l sm:px-6'>
              <span className='text-primary font-serif text-2xl'>Projetos</span>
              <span className='text-on-surface-variant text-sm'>Serviços</span>
            </div>
            <div className='border-outline-variant flex flex-col gap-1 py-3 sm:border-l sm:pl-6'>
              <span className='text-primary font-serif text-2xl'>KPIs</span>
              <span className='text-on-surface-variant text-sm'>Financeiro</span>
            </div>
          </div>
        </section>

        <div className='border-outline-variant bg-surface-container-lowest rounded-lg border px-8 py-10 shadow-[0_20px_50px_oklch(34%_0.087_345/0.05)] sm:px-10'>
          <div className='mb-10 flex flex-col gap-2 text-center'>
            <p className='text-primary font-serif text-xl tracking-wide italic'>
              Letícia Martins
            </p>
            <h2 className='text-on-surface font-serif text-2xl font-medium'>
              Acesse sua conta
            </h2>
            <p className='text-on-surface-variant text-sm'>
              Entre para visualizar a operação do negócio.
            </p>
          </div>

          <LoginForm redirectTo={redirectTo} />
        </div>
      </div>
    </main>
  )
}
