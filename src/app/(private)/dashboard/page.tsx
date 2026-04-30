import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { signOut } from '@/services/auth.service'

const kpis = [
  {
    label: 'Receita total',
    value: 'R$ 0,00',
    description: 'Entradas registradas no período',
  },
  {
    label: 'Despesa total',
    value: 'R$ 0,00',
    description: 'Custos fixos e despesas de projeto',
  },
  {
    label: 'Lucro líquido',
    value: 'R$ 0,00',
    description: 'Receita menos despesas',
  },
  {
    label: 'Ticket médio',
    value: 'R$ 0,00',
    description: 'Valor médio por projeto',
  },
]

const modules = [
  'Clientes com origem e indicação',
  'Projetos vinculados a serviços',
  'Receitas com vínculo opcional',
  'Despesas separadas por tipo',
]

export default function DashboardPage() {
  return (
    <main className='mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-10 px-6 py-10 lg:px-12'>
      <header className='flex items-center justify-between gap-4'>
        <div className='flex flex-col gap-2'>
          <p className='text-on-surface-variant text-xs font-bold tracking-widest uppercase'>
            Sistema
          </p>
          <h1 className='text-primary font-serif text-4xl leading-tight font-semibold'>
            Dashboard
          </h1>
          <p className='text-on-surface-variant max-w-2xl text-sm leading-6'>
            Uma visão inicial para acompanhar saúde financeira, projetos e
            crescimento do negócio.
          </p>
        </div>

        <form action={signOut}>
          <Button variant='secondary' type='submit'>
            Sair
          </Button>
        </form>
      </header>

      <section className='grid gap-4 md:grid-cols-2 xl:grid-cols-4'>
        {kpis.map((kpi) => (
          <Card key={kpi.label} className='bg-surface-container-lowest'>
            <CardHeader>
              <p className='text-on-surface-variant text-xs font-bold tracking-widest uppercase'>
                {kpi.label}
              </p>
              <CardTitle className='text-primary text-3xl'>
                {kpi.value}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{kpi.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className='grid gap-6 lg:grid-cols-[1.15fr_0.85fr]'>
        <Card>
          <CardHeader>
            <CardTitle>Receitas vs despesas</CardTitle>
            <CardDescription>
              Espaço reservado para o gráfico financeiro do MVP.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='border-outline-variant bg-surface-container-lowest flex min-h-64 items-end gap-3 rounded border p-6'>
              <div className='bg-primary-container h-36 flex-1 rounded-t' />
              <div className='bg-secondary h-24 flex-1 rounded-t' />
              <div className='bg-primary-container h-44 flex-1 rounded-t' />
              <div className='bg-secondary h-28 flex-1 rounded-t' />
              <div className='bg-primary-container h-52 flex-1 rounded-t' />
              <div className='bg-secondary h-32 flex-1 rounded-t' />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Próximos módulos</CardTitle>
            <CardDescription>
              Estrutura alinhada ao PRD para evoluir o sistema sem misturar
              responsabilidades.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className='flex flex-col gap-3'>
              {modules.map((module) => (
                <li
                  key={module}
                  className='border-outline-variant bg-surface-container-lowest rounded border px-4 py-3 text-sm text-on-surface'
                >
                  {module}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
