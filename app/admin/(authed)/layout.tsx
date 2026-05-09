import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createSupabaseServer } from '@/lib/supabase/server'
import { isSupabaseConfigured } from '@/lib/defaults'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const configured = isSupabaseConfigured()
  let userEmail: string | null = null

  if (configured) {
    const supabase = await createSupabaseServer()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) redirect('/admin/login')
    userEmail = user.email ?? null
  }

  return (
    <div className="min-h-screen bg-cream/40">
      <nav className="bg-ink text-bone shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between py-4 gap-4">
            <Link href="/admin" className="text-lg font-display tracking-wider">
              Barril <span className="text-gold">— Admin</span>
            </Link>
            <div className="flex items-center gap-6">
              <Link href="/admin/cardapio" className="text-sm hover:text-gold">Cardápio</Link>
              <Link href="/admin/galeria" className="text-sm hover:text-gold">Galeria</Link>
              <Link href="/admin/config" className="text-sm hover:text-gold">Configurações</Link>
              {configured ? (
                <form action="/auth/signout" method="post">
                  <button type="submit" className="text-sm text-amber hover:text-gold">
                    Sair ({userEmail})
                  </button>
                </form>
              ) : (
                <span className="text-xs text-amber/70">modo preview</span>
              )}
            </div>
          </div>
        </div>
      </nav>
      {!configured && (
        <div className="bg-amber/15 text-amber border-b border-amber/30">
          <div className="container mx-auto px-4 py-2 text-sm">
            ⚠ Supabase não configurado. Preencha <code>.env.local</code> e rode as migrations
            pra ativar autenticação e dados reais.
          </div>
        </div>
      )}
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  )
}
