import { createSupabaseServer } from '@/lib/supabase/server'
import { isSupabaseConfigured } from '@/lib/defaults'
import type { ConfigEntry } from '@/lib/types'
import ConfigAdmin from './ConfigAdmin'

export const dynamic = 'force-dynamic'

async function getEntradas(): Promise<ConfigEntry[]> {
  if (!isSupabaseConfigured()) return []
  try {
    const supabase = await createSupabaseServer()
    const { data } = await supabase.from('config_site').select('*')
    return (data ?? []) as ConfigEntry[]
  } catch {
    return []
  }
}

export default async function ConfigAdminPage() {
  const entradas = await getEntradas()
  return <ConfigAdmin entradas={entradas} />
}
