'use server'

import { createClient } from '@/lib/supabase/server'
import { getSafeRedirectPath } from '@/services/auth-redirect'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export type AuthFormState = {
  error?: string
}

export async function signInWithPassword(
  _state: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const email = String(formData.get('email') ?? '').trim()
  const password = String(formData.get('password') ?? '')
  const redirectTo = getSafeRedirectPath(formData.get('redirectTo'))

  if (!email || !password) {
    return { error: 'Informe email e senha para entrar.' }
  }

  const supabase = createClient(await cookies())
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: 'Email ou senha inválidos.' }
  }

  redirect(redirectTo)
}

export async function signOut() {
  const supabase = createClient(await cookies())

  await supabase.auth.signOut()
  redirect('/login')
}

export async function getCurrentUser() {
  const supabase = createClient(await cookies())
  const { data, error } = await supabase.auth.getUser()

  if (error) {
    return null
  }

  return data.user
}
