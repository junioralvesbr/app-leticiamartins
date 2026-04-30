import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { supabaseCookieOptions } from './cookies'

const publicRoutes = ['/login']
const privateHomePath = '/dashboard'

function isPublicRoute(pathname: string) {
  return publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  )
}

function createRedirectResponse({
  request,
  supabaseResponse,
  pathname,
  redirectTo,
}: {
  request: NextRequest
  supabaseResponse: NextResponse
  pathname: string
  redirectTo?: string
}) {
  const url = request.nextUrl.clone()
  url.pathname = pathname
  url.search = ''

  if (redirectTo) {
    url.searchParams.set('redirectTo', redirectTo)
  }

  const response = NextResponse.redirect(url)

  supabaseResponse.cookies.getAll().forEach((cookie) => {
    response.cookies.set(cookie)
  })

  ;['cache-control', 'expires', 'pragma'].forEach((header) => {
    const value = supabaseResponse.headers.get(header)

    if (value) {
      response.headers.set(header, value)
    }
  })

  return response
}

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookieOptions: supabaseCookieOptions,
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet, headers) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
          Object.entries(headers).forEach(([key, value]) =>
            supabaseResponse.headers.set(key, value)
          )
        },
      },
    }
  )

  // Do not run code between createServerClient and
  // supabase.auth.getClaims(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  // IMPORTANT: If you remove getClaims() and you use server-side rendering
  // with the Supabase client, your users may be randomly logged out.
  const { data, error } = await supabase.auth.getClaims()
  const isAuthenticated = Boolean(data?.claims && !error)
  const pathname = request.nextUrl.pathname

  if (isAuthenticated && isPublicRoute(pathname)) {
    return createRedirectResponse({
      request,
      supabaseResponse,
      pathname: privateHomePath,
    })
  }

  if (!isAuthenticated && !isPublicRoute(pathname)) {
    return createRedirectResponse({
      request,
      supabaseResponse,
      pathname: '/login',
      redirectTo: request.nextUrl.pathname + request.nextUrl.search,
    })
  }

  return supabaseResponse
}
