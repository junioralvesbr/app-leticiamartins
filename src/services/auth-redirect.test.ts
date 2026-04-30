import { describe, expect, it } from 'vitest'
import { getSafeRedirectPath } from './auth-redirect'

describe('getSafeRedirectPath', () => {
  it('keeps private internal paths', () => {
    expect(getSafeRedirectPath('/dashboard')).toBe('/dashboard')
    expect(getSafeRedirectPath('/projects?status=open')).toBe(
      '/projects?status=open'
    )
  })

  it('falls back to dashboard for unsafe or public paths', () => {
    expect(getSafeRedirectPath(null)).toBe('/dashboard')
    expect(getSafeRedirectPath('https://example.com')).toBe('/dashboard')
    expect(getSafeRedirectPath('//example.com')).toBe('/dashboard')
    expect(getSafeRedirectPath('/login')).toBe('/dashboard')
    expect(getSafeRedirectPath('/login?redirectTo=/dashboard')).toBe(
      '/dashboard'
    )
  })
})
