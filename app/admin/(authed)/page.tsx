import Link from 'next/link'
import { Beer, Image as ImageIcon, Settings } from 'lucide-react'
import { createSupabaseServer } from '@/lib/supabase/server'
import { isSupabaseConfigured } from '@/lib/defaults'

export const dynamic = 'force-dynamic'

async function getStats() {
  if (!isSupabaseConfigured()) return { itens: 0, categorias: 0, fotos: 0 }
  try {
    const supabase = await createSupabaseServer()
    const [{ count: itensCount }, { count: catCount }, { count: fotosCount }] = await Promise.all([
      supabase.from('cardapio_itens').select('*', { count: 'exact', head: true }),
      supabase.from('cardapio_categorias').select('*', { count: 'exact', head: true }),
      supabase.from('galeria_fotos').select('*', { count: 'exact', head: true }),
    ])
    return { itens: itensCount ?? 0, categorias: catCount ?? 0, fotos: fotosCount ?? 0 }
  } catch {
    return { itens: 0, categorias: 0, fotos: 0 }
  }
}

export default async function AdminDashboard() {
  const stats = await getStats()

  const cards = [
    {
      href: '/admin/cardapio',
      icon: Beer,
      title: 'Cardápio',
      desc: 'Editar preços, descrições e disponibilidade dos itens',
      meta: `${stats.itens} itens em ${stats.categorias} categorias`,
    },
    {
      href: '/admin/galeria',
      icon: ImageIcon,
      title: 'Galeria',
      desc: 'Adicionar, reordenar e remover fotos do site',
      meta: `${stats.fotos} foto${stats.fotos === 1 ? '' : 's'}`,
    },
    {
      href: '/admin/config',
      icon: Settings,
      title: 'Configurações',
      desc: 'Editar textos do hero, história, horário e contatos',
      meta: 'Textos do site',
    },
  ]

  return (
    <div>
      <h2 className="text-3xl font-display tracking-wider mb-8">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map(({ href, icon: Icon, title, desc, meta }) => (
          <Link
            key={href}
            href={href}
            className="group bg-bone border border-ink/10 p-6 rounded-lg shadow-sm hover:shadow-lg hover:border-gold transition-all"
          >
            <Icon className="w-8 h-8 text-gold mb-4" />
            <h3 className="text-xl font-display tracking-wide mb-2 group-hover:text-amber transition-colors">{title}</h3>
            <p className="text-sm text-ink/70 mb-3">{desc}</p>
            <p className="text-xs text-ink/50 font-mono">{meta}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
