'use server'

import { createClient } from '@/lib/supabase/server'
import {
  clientOrigins,
  type Client,
  type ClientFormState,
  type ClientFormValues,
  type ClientOrigin,
  type ClientsSummary,
} from '@/types/client'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { cache } from 'react'

const clientsSelect = `
  id,
  name,
  profession,
  spouse,
  address,
  birth_date,
  cpf,
  email,
  phone,
  city,
  notes,
  origin,
  referrer_id,
  created_at,
  updated_at
`

type ClientRow = Omit<Client, 'referrer'>

function normalizeClients(rows: ClientRow[]): Client[] {
  const clientsById = new Map(
    rows.map((row) => [row.id, { id: row.id, name: row.name }])
  )

  return rows.map((row) => ({
    ...row,
    referrer: row.referrer_id ? clientsById.get(row.referrer_id) ?? null : null,
  }))
}

function toNullableString(value: FormDataEntryValue | null) {
  const text = String(value ?? '').trim()

  return text || null
}

function readClientFormData(formData: FormData): ClientFormValues {
  return {
    name: String(formData.get('name') ?? '').trim(),
    profession: String(formData.get('profession') ?? '').trim(),
    spouse: String(formData.get('spouse') ?? '').trim(),
    address: String(formData.get('address') ?? '').trim(),
    city: String(formData.get('city') ?? '').trim(),
    cpf: String(formData.get('cpf') ?? '').trim(),
    email: String(formData.get('email') ?? '').trim(),
    phone: String(formData.get('phone') ?? '').trim(),
    birth_date: String(formData.get('birth_date') ?? '').trim(),
    notes: String(formData.get('notes') ?? '').trim(),
    origin: String(formData.get('origin') ?? '') as ClientOrigin,
    referrer_id: String(formData.get('referrer_id') ?? '').trim(),
  }
}

function validateClient(
  values: ClientFormValues
): NonNullable<ClientFormState['errors']> {
  const errors: NonNullable<ClientFormState['errors']> = {}

  if (!values.name) {
    errors.name = 'Informe o nome do cliente.'
  }

  if (!clientOrigins.includes(values.origin)) {
    errors.origin = 'Selecione uma origem válida.'
  }

  if (values.origin === 'Indicação' && !values.referrer_id) {
    errors.referrer_id = 'Informe quem indicou este cliente.'
  }

  return errors
}

function hasErrors(errors: NonNullable<ClientFormState['errors']>) {
  return Object.keys(errors).length > 0
}

function mapClientPayload(values: ClientFormValues) {
  return {
    name: values.name,
    profession: toNullableString(values.profession),
    spouse: toNullableString(values.spouse),
    address: toNullableString(values.address),
    city: toNullableString(values.city),
    cpf: toNullableString(values.cpf),
    email: toNullableString(values.email),
    phone: toNullableString(values.phone),
    birth_date: toNullableString(values.birth_date),
    notes: toNullableString(values.notes),
    origin: values.origin,
    referrer_id:
      values.origin === 'Indicação'
        ? toNullableString(values.referrer_id)
        : null,
  }
}

export const getClients = cache(async () => {
  const supabase = createClient(await cookies())
  const { data, error } = await supabase
    .from('clients')
    .select(clientsSelect)
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error('Não foi possível carregar os clientes.')
  }

  return normalizeClients(data as ClientRow[])
})

export const getClientById = cache(async (id: string) => {
  const clients = await getClients()

  return clients.find((client) => client.id === id) ?? null
})

export async function getClientsSummary(): Promise<ClientsSummary> {
  const clients = await getClients()
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
      count: topOriginEntry?.[1] ?? 0,
      percentage: clients.length
        ? Math.round(((topOriginEntry?.[1] ?? 0) / clients.length) * 100)
        : 0,
    },
  }
}

export async function createClientAction(
  _state: ClientFormState,
  formData: FormData
): Promise<ClientFormState> {
  const values = readClientFormData(formData)
  const errors = validateClient(values)

  if (hasErrors(errors)) {
    return {
      errors,
      values,
      message: 'Revise os campos destacados.',
    }
  }

  const supabase = createClient(await cookies())
  const { error } = await supabase
    .from('clients')
    .insert(mapClientPayload(values))

  if (error) {
    console.error('Erro ao cadastrar cliente:', {
      code: error.code,
      message: error.message,
      details: error.details,
      hint: error.hint,
    })

    if (error.code === '42501') {
      return {
        values,
        message:
          'Sem permissão para cadastrar. Verifique as políticas de RLS da tabela clients.',
      }
    }

    if (error.code === '42P01') {
      return {
        values,
        message:
          'A tabela clients não foi encontrada no Supabase. Verifique se ela está no schema exposto pela API.',
      }
    }

    if (error.code === '42703') {
      return {
        values,
        message:
          'A tabela clients não tem todas as colunas esperadas pelo formulário.',
      }
    }

    return {
      values,
      message: `Não foi possível cadastrar o cliente: ${error.message}`,
    }
  }

  revalidatePath('/clients')

  return { ok: true, message: 'Cliente cadastrado com sucesso.' }
}

export async function updateClientAction(
  _state: ClientFormState,
  formData: FormData
): Promise<ClientFormState> {
  const id = String(formData.get('id') ?? '')
  const values = readClientFormData(formData)
  const errors = validateClient(values)

  if (!id) {
    return { message: 'Cliente não encontrado.' }
  }

  if (values.referrer_id === id) {
    errors.referrer_id = 'O cliente não pode indicar a si mesmo.'
  }

  if (hasErrors(errors)) {
    return {
      errors,
      values,
      message: 'Revise os campos destacados.',
    }
  }

  const supabase = createClient(await cookies())
  const { error } = await supabase
    .from('clients')
    .update(mapClientPayload(values))
    .eq('id', id)

  if (error) {
    console.error('Erro ao atualizar cliente:', {
      code: error.code,
      message: error.message,
      details: error.details,
      hint: error.hint,
    })

    return {
      values,
      message: `Não foi possível atualizar o cliente: ${error.message}`,
    }
  }

  revalidatePath('/clients')
  revalidatePath(`/clients/${id}`)

  return { ok: true, message: 'Cliente atualizado com sucesso.' }
}

export async function deleteClientAction(formData: FormData) {
  const id = String(formData.get('id') ?? '')

  if (!id) {
    return
  }

  const supabase = createClient(await cookies())
  await supabase.from('clients').delete().eq('id', id)

  revalidatePath('/clients')
}
