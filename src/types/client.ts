export const clientOrigins = [
  'Instagram',
  'Google',
  'Site',
  'Parceiros',
  'Indicação',
] as const

export type ClientOrigin = (typeof clientOrigins)[number]

export type Client = {
  id: string
  name: string
  profession: string | null
  created_at: string
  updated_at: string
  spouse: string | null
  address: string | null
  city: string | null
  cpf: string | null
  email: string | null
  phone: string | null
  birth_date: string | null
  notes: string | null
  origin: ClientOrigin | null
  referrer_id: string | null
  referrer?: Pick<Client, 'id' | 'name'> | null
}

export type ClientFormValues = {
  name: string
  profession: string
  spouse: string
  address: string
  city: string
  cpf: string
  email: string
  phone: string
  birth_date: string
  notes: string
  origin: ClientOrigin
  referrer_id: string
}

export type ClientFormState = {
  ok?: boolean
  message?: string
  values?: Partial<ClientFormValues>
  errors?: Partial<Record<keyof ClientFormValues, string>>
}

export type ClientsSummary = {
  totalClients: number
  lifetimeClients: number
  activeProjects: number
  topOrigin: {
    origin: ClientOrigin | null
    count: number
    percentage: number
  }
}
