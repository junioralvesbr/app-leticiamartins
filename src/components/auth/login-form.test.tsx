import { render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { LoginForm } from './login-form'

const actionState = vi.hoisted(() => ({
  state: {},
  pending: false,
}))

vi.mock('react', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react')>()

  return {
    ...actual,
    useActionState: vi.fn(() => [actionState.state, vi.fn(), actionState.pending]),
  }
})

vi.mock('@/services/auth.service', () => ({
  signInWithPassword: vi.fn(),
}))

describe('LoginForm', () => {
  afterEach(() => {
    actionState.state = {}
    actionState.pending = false
  })

  it('renders email, password and submit controls', () => {
    render(<LoginForm />)

    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Senha')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Entrar' })).toBeInTheDocument()
  })

  it('stores the redirect destination in a hidden field', () => {
    render(<LoginForm redirectTo='/projects' />)

    expect(screen.getByDisplayValue('/projects')).toHaveAttribute(
      'name',
      'redirectTo'
    )
  })

  it('shows invalid credentials message above the email field', () => {
    actionState.state = { error: 'Email ou senha inválidos.' }

    render(<LoginForm />)

    const alert = screen.getByRole('alert')
    const email = screen.getByLabelText('Email')

    expect(alert).toHaveTextContent('Email ou senha inválidos.')
    expect(
      alert.compareDocumentPosition(email) & Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy()
  })

  it('shows loading state while submitting', () => {
    actionState.pending = true

    render(<LoginForm />)

    const button = screen.getByRole('button', { name: 'Entrando...' })

    expect(button).toBeDisabled()
    expect(button).toHaveAttribute('aria-busy', 'true')
  })
})
