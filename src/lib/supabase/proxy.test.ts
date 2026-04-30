import { NextRequest } from 'next/server'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { updateSession } from './proxy'

const getClaims = vi.fn()

vi.mock('@supabase/ssr', () => ({
  createServerClient: vi.fn(() => ({
    auth: {
      getClaims,
    },
  })),
}))

function createRequest(path: string) {
  return new NextRequest(new URL(path, 'http://localhost:3000'))
}

describe('updateSession', () => {
  beforeEach(() => {
    getClaims.mockReset()
  })

  it('lets public login requests continue without a valid session', async () => {
    getClaims.mockResolvedValue({ data: null, error: new Error('No session') })

    const response = await updateSession(createRequest('/login'))

    expect(response.status).toBe(200)
    expect(response.headers.get('location')).toBeNull()
  })

  it('redirects private routes to login when there is no valid session', async () => {
    getClaims.mockResolvedValue({ data: null, error: new Error('No session') })

    const response = await updateSession(createRequest('/dashboard'))

    expect(response.status).toBe(307)
    expect(response.headers.get('location')).toBe(
      'http://localhost:3000/login?redirectTo=%2Fdashboard'
    )
  })

  it('redirects authenticated users away from login', async () => {
    getClaims.mockResolvedValue({
      data: { claims: { sub: 'user-id' } },
      error: null,
    })

    const response = await updateSession(createRequest('/login'))

    expect(response.status).toBe(307)
    expect(response.headers.get('location')).toBe(
      'http://localhost:3000/dashboard'
    )
  })

  it('lets authenticated users continue to private routes', async () => {
    getClaims.mockResolvedValue({
      data: { claims: { sub: 'user-id' } },
      error: null,
    })

    const response = await updateSession(createRequest('/dashboard'))

    expect(response.status).toBe(200)
    expect(response.headers.get('location')).toBeNull()
  })
})
