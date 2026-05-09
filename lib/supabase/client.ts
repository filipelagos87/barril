'use client'

import { createBrowserClient } from '@supabase/ssr'

type Client = ReturnType<typeof createBrowserClient>
let _client: Client | null = null

/**
 * Devolve o cliente Supabase do navegador. Singleton.
 * No SSR (typeof window === 'undefined') retorna um proxy que lança erro
 * se for usado — não use este helper fora de event handlers / useEffect.
 * No client sem Supabase configurado, lança erro com mensagem amigável.
 */
export function createSupabaseBrowser(): Client {
  if (_client) return _client

  if (typeof window === 'undefined') {
    return new Proxy({} as Client, {
      get() {
        throw new Error('createSupabaseBrowser foi chamado no servidor. Use apenas dentro de event handlers.')
      },
    })
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key || !url.startsWith('http')) {
    throw new Error('Supabase não configurado. Preencha .env.local com NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY.')
  }

  _client = createBrowserClient(url, key)
  return _client
}
