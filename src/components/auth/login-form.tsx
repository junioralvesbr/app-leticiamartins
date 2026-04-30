'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { signInWithPassword, type AuthFormState } from '@/services/auth.service'
import { useActionState } from 'react'

const initialState: AuthFormState = {}

export function LoginForm({ redirectTo }: { redirectTo?: string }) {
  const [state, formAction, isPending] = useActionState(
    signInWithPassword,
    initialState
  )

  return (
    <form action={formAction} className='flex flex-col gap-6'>
      <input type='hidden' name='redirectTo' value={redirectTo ?? '/dashboard'} />

      {state.error ? (
        <div
          className='border-secondary/25 bg-error-container text-on-error-container animate-[auth-message-in_220ms_ease-out] rounded-md border px-4 py-3 text-sm leading-5'
          role='alert'
        >
          {state.error}
        </div>
      ) : null}

      <div>
        <Label
          htmlFor='login-email'
        >
          Email
        </Label>
        <Input
          id='login-email'
          name='email'
          type='email'
          placeholder='seu@email.com'
          required
          autoComplete='email'
        />
      </div>

      <div>
        <Label
          htmlFor='login-password'
        >
          Senha
        </Label>
        <Input
          id='login-password'
          name='password'
          type='password'
          placeholder='********'
          required
          autoComplete='current-password'
        />
      </div>

      <Button
        id='login-submit'
        type='submit'
        disabled={isPending}
        aria-busy={isPending}
        className='mt-2 w-full uppercase tracking-widest'
      >
        {isPending ? (
          <span className='inline-flex items-center justify-center gap-2'>
            <span
              className='size-4 animate-spin rounded-full border-2 border-white/35 border-t-white'
              aria-hidden='true'
            />
            Entrando...
          </span>
        ) : (
          'Entrar'
        )}
      </Button>
    </form>
  )
}
