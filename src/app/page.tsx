'use client'

import { useState } from 'react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function handleSignIn(e: React.SubmitEvent) {
    e.preventDefault()
    setIsLoading(true)

    // TODO: Integrate with Supabase Auth service
    console.log('Sign in:', { email, password })

    setTimeout(() => setIsLoading(false), 1500)
  }

  return (
    <main className='relative flex min-h-screen items-center justify-center overflow-hidden px-4'>
      {/* Background gradient blobs */}
      <div className='pointer-events-none absolute inset-0' aria-hidden='true'>
        {/* Top-right warm accent */}
        <div className='absolute -top-20 right-[10%] size-[420px] rounded-full bg-[radial-gradient(circle,#fdb0d4_0%,transparent_70%)] opacity-40 blur-[120px]' />
        {/* Bottom-left soft accent */}
        <div className='absolute -bottom-24 -left-10 size-[360px] rounded-full bg-[radial-gradient(circle,#ff8bc5_0%,transparent_70%)] opacity-30 blur-[100px]' />
        {/* Center subtle fill */}
        <div className='absolute top-1/2 left-1/2 h-[500px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,#e5ccd9_0%,transparent_60%)] opacity-15 blur-[140px]' />
      </div>

      {/* Login card */}
      <div className='relative z-10 w-full max-w-[440px]'>
        <div className='border-outline-variant rounded-lg border bg-white/90 px-10 py-12 shadow-[0_8px_40px_rgba(74,22,51,0.06)] backdrop-blur-sm'>
          {/* Brand */}
          <div className='mb-10 text-center'>
            <h1 className='text-primary mb-2 font-serif text-xl tracking-wide italic'>
              Leticia Martins
            </h1>
            <p className='text-on-surface font-serif text-[22px] font-medium tracking-[-0.01em]'>
              Welcome back
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSignIn} className='space-y-6'>
            {/* Email */}
            <div>
              <label
                htmlFor='login-email'
                className='font-body text-on-surface-variant mb-2 block text-xs font-bold tracking-widest uppercase'
              >
                Email Address
              </label>
              <input
                id='login-email'
                type='email'
                placeholder='your@email.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className='border-outline-variant font-body text-on-surface placeholder:text-outline focus:border-secondary focus:ring-secondary/20 w-full rounded-sm border bg-white px-4 py-3 text-sm transition-all duration-200 outline-none focus:ring-2'
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor='login-password'
                className='font-body text-on-surface-variant mb-2 block text-xs font-bold tracking-widest uppercase'
              >
                Password
              </label>
              <input
                id='login-password'
                type='password'
                placeholder='••••••••'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className='border-outline-variant font-body text-on-surface placeholder:text-outline focus:border-secondary focus:ring-secondary/20 w-full rounded-sm border bg-white px-4 py-3 text-sm transition-all duration-200 outline-none focus:ring-2'
              />
            </div>

            {/* Sign In button */}
            <button
              id='login-submit'
              type='submit'
              disabled={isLoading}
              className='bg-primary-container font-body mt-4 w-full rounded-sm py-3.5 text-sm font-semibold tracking-[0.15em] text-white uppercase transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:hover:scale-100'
            >
              {isLoading ? (
                <span className='inline-flex items-center gap-2'>
                  <svg
                    className='size-4 animate-spin'
                    viewBox='0 0 24 24'
                    fill='none'
                  >
                    <circle
                      className='opacity-25'
                      cx='12'
                      cy='12'
                      r='10'
                      stroke='currentColor'
                      strokeWidth='4'
                    />
                    <path
                      className='opacity-75'
                      fill='currentColor'
                      d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z'
                    />
                  </svg>
                  Signing in…
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}
