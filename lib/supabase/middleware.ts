import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { isSupabaseConfigured } from '@/lib/defaults'

type CookieToSet = { name: string; value: string; options: CookieOptions }

export async function updateSession(request: NextRequest) {
  // Sem Supabase configurado, não rode auth — só passa adiante.
  // O Edson preenche .env.local antes de usar /admin de verdade.
  if (!isSupabaseConfigured()) return NextResponse.next({ request })

  let response = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet: CookieToSet[]) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          response = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  const url = request.nextUrl
  const isAdmin = url.pathname.startsWith('/admin')
  const isLogin = url.pathname.startsWith('/admin/login')

  if (isAdmin && !isLogin && !user) {
    const redirectUrl = url.clone()
    redirectUrl.pathname = '/admin/login'
    return NextResponse.redirect(redirectUrl)
  }

  if (isLogin && user) {
    const redirectUrl = url.clone()
    redirectUrl.pathname = '/admin'
    return NextResponse.redirect(redirectUrl)
  }

  return response
}
