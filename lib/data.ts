import { createSupabaseServer } from './supabase/server'
import { DEFAULT_CONFIG, isSupabaseConfigured } from './defaults'
import type { Categoria, ConfigMap, Foto, Item } from './types'

export async function getSitePayload(): Promise<{
  config: ConfigMap
  categorias: Categoria[]
  itens: Item[]
  fotos: Foto[]
}> {
  if (!isSupabaseConfigured()) {
    return { config: DEFAULT_CONFIG, categorias: [], itens: [], fotos: [] }
  }

  try {
    const supabase = await createSupabaseServer()

    const [
      { data: configRows },
      { data: categorias },
      { data: itens },
      { data: fotos },
    ] = await Promise.all([
      supabase.from('config_site').select('chave, valor'),
      supabase
        .from('cardapio_categorias')
        .select('*')
        .eq('ativo', true)
        .order('ordem', { ascending: true }),
      supabase
        .from('cardapio_itens')
        .select('*')
        .eq('ativo', true)
        .order('ordem', { ascending: true }),
      supabase
        .from('galeria_fotos')
        .select('*')
        .eq('ativo', true)
        .order('ordem', { ascending: true }),
    ])

    const config: ConfigMap = {
      ...DEFAULT_CONFIG,
      ...Object.fromEntries((configRows ?? []).map((r) => [r.chave, r.valor])),
    }

    return {
      config,
      categorias: (categorias ?? []) as Categoria[],
      itens: (itens ?? []) as Item[],
      fotos: (fotos ?? []) as Foto[],
    }
  } catch (err) {
    console.error('[getSitePayload] erro ao buscar dados do Supabase, usando defaults:', err)
    return { config: DEFAULT_CONFIG, categorias: [], itens: [], fotos: [] }
  }
}
