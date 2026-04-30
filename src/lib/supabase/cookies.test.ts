import { describe, expect, it, vi } from 'vitest'

async function loadCookieOptions(nodeEnv: string) {
  vi.resetModules()
  vi.stubEnv('NODE_ENV', nodeEnv)

  const { supabaseCookieOptions } = await import('./cookies')

  vi.unstubAllEnvs()
  return supabaseCookieOptions
}

describe('supabaseCookieOptions', () => {
  it('keeps auth cookies httpOnly and sameSite lax', async () => {
    const options = await loadCookieOptions('development')

    expect(options).toMatchObject({
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
    })
  })

  it('uses secure cookies only in production', async () => {
    await expect(loadCookieOptions('development')).resolves.toMatchObject({
      secure: false,
    })

    await expect(loadCookieOptions('production')).resolves.toMatchObject({
      secure: true,
    })
  })
})
