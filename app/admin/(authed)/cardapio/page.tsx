import { createSupabaseServer } from '@/lib/supabase/server'
import { isSupabaseConfigured } from '@/lib/defaults'
import type { Categoria, Item } from '@/lib/types'
import CardapioAdmin from './CardapioAdmin'

export const dynamic = 'force-dynamic'

async function getDados(): Promise<{ cats: Categoria[]; itens: Item[] }> {
  if (!isSupabaseConfigured()) return { cats: [], itens: [] }
  try {
    const supabase = await createSupabaseServer()
    const [{ data: cats }, { data: itens }] = await Promise.all([
      supabase.from('cardapio_categorias').select('*').order('ordem', { ascending: true }),
      supabase.from('cardapio_itens').select('*').order('ordem', { ascending: true }),
    ])
    return { cats: (cats ?? []) as Categoria[], itens: (itens ?? []) as Item[] }
  } catch {
    return { cats: [], itens: [] }
  }
}

export default async function CardapioAdminPage() {
  const { cats, itens } = await getDados()
  return <CardapioAdmin categoriasIniciais={cats} itensIniciais={itens} />
}
