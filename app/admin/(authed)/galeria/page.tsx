import { createSupabaseServer } from '@/lib/supabase/server'
import { isSupabaseConfigured } from '@/lib/defaults'
import type { Foto } from '@/lib/types'
import GaleriaAdmin from './GaleriaAdmin'

export const dynamic = 'force-dynamic'

async function getFotos(): Promise<Foto[]> {
  if (!isSupabaseConfigured()) return []
  try {
    const supabase = await createSupabaseServer()
    const { data } = await supabase
      .from('galeria_fotos')
      .select('*')
      .order('ordem', { ascending: true })
    return (data ?? []) as Foto[]
  } catch {
    return []
  }
}

export default async function GaleriaAdminPage() {
  const fotos = await getFotos()
  return <GaleriaAdmin fotosIniciais={fotos} />
}
