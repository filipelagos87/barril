'use client'

import { useMemo, useState } from 'react'
import { Check, Loader2 } from 'lucide-react'
import { createSupabaseBrowser } from '@/lib/supabase/client'
import type { ConfigEntry } from '@/lib/types'

type FieldDef = {
  chave: string
  label: string
  tipo: 'string' | 'text' | 'url'
  hint?: string
}

const SECTIONS: { titulo: string; campos: FieldDef[] }[] = [
  {
    titulo: 'Hero',
    campos: [
      { chave: 'hero_headline', label: 'Headline principal', tipo: 'string' },
      { chave: 'hero_subheadline', label: 'Subheadline', tipo: 'string' },
      { chave: 'hero_badge', label: 'Selo de destaque', tipo: 'string', hint: 'Ex.: "Não cobramos os 10%"' },
    ],
  },
  {
    titulo: 'História',
    campos: [
      { chave: 'historia_titulo', label: 'Título da seção', tipo: 'string' },
      { chave: 'historia_paragrafos', label: 'Texto (separe parágrafos com linha em branco)', tipo: 'text' },
      { chave: 'historia_video_url', label: 'URL de embed do vídeo (Instagram reel)', tipo: 'url' },
    ],
  },
  {
    titulo: 'Contato',
    campos: [
      { chave: 'telefone', label: 'Telefone (formato exibido)', tipo: 'string' },
      { chave: 'telefone_link', label: 'Telefone (formato tel:)', tipo: 'string', hint: 'Ex.: +558332550101' },
      { chave: 'whatsapp', label: 'WhatsApp (formato exibido)', tipo: 'string' },
      { chave: 'whatsapp_link', label: 'WhatsApp (formato wa.me)', tipo: 'string', hint: 'Ex.: 5583996462621' },
      { chave: 'instagram_handle', label: 'Handle do Instagram', tipo: 'string' },
      { chave: 'instagram_url', label: 'URL do Instagram', tipo: 'url' },
    ],
  },
  {
    titulo: 'Localização e horário',
    campos: [
      { chave: 'endereco', label: 'Endereço completo', tipo: 'string' },
      { chave: 'horario_funcionamento', label: 'Horário (uma linha por dia)', tipo: 'text' },
      { chave: 'mapa_embed_url', label: 'URL de embed do Google Maps (iframe)', tipo: 'url' },
      { chave: 'google_maps_url', label: 'URL do Google Maps (botão "abrir")', tipo: 'url' },
    ],
  },
]

export default function ConfigAdmin({ entradas }: { entradas: ConfigEntry[] }) {
  const supabase = createSupabaseBrowser()
  const initial = useMemo(
    () => Object.fromEntries(entradas.map((e) => [e.chave, e.valor])),
    [entradas]
  )
  const [valores, setValores] = useState<Record<string, string>>(initial)
  const [savingKey, setSavingKey] = useState<string | null>(null)
  const [savedKey, setSavedKey] = useState<string | null>(null)

  async function commit(chave: string, tipo: FieldDef['tipo']) {
    const valor = valores[chave] ?? ''
    if (valor === (initial[chave] ?? '')) return

    setSavingKey(chave)
    const { error } = await supabase
      .from('config_site')
      .upsert({ chave, valor, tipo }, { onConflict: 'chave' })
    setSavingKey(null)
    if (error) {
      alert('Erro ao salvar: ' + error.message)
      return
    }
    initial[chave] = valor
    setSavedKey(chave)
    setTimeout(() => setSavedKey((k) => (k === chave ? null : k)), 1500)
  }

  return (
    <div>
      <header className="mb-6">
        <h2 className="text-3xl font-display tracking-wider">Configurações do site</h2>
        <p className="text-sm text-ink/60">
          Cada campo salva ao perder o foco (clique fora). Aparece um ✓ quando salvo.
        </p>
      </header>

      <div className="space-y-8">
        {SECTIONS.map(({ titulo, campos }) => (
          <section key={titulo} className="bg-bone border border-ink/10 rounded-lg p-6">
            <h3 className="text-xl font-display tracking-wide mb-4 text-amber">{titulo}</h3>
            <div className="space-y-4">
              {campos.map((c) => (
                <div key={c.chave}>
                  <div className="flex items-center justify-between mb-1">
                    <label htmlFor={c.chave} className="text-sm font-medium">
                      {c.label}
                    </label>
                    <span className="text-xs text-ink/40">
                      {savingKey === c.chave && <Loader2 className="w-3 h-3 animate-spin" />}
                      {savedKey === c.chave && (
                        <Check className="w-3.5 h-3.5 text-green-700 inline" />
                      )}
                    </span>
                  </div>
                  {c.tipo === 'text' ? (
                    <textarea
                      id={c.chave}
                      rows={4}
                      value={valores[c.chave] ?? ''}
                      onChange={(e) =>
                        setValores((v) => ({ ...v, [c.chave]: e.target.value }))
                      }
                      onBlur={() => commit(c.chave, c.tipo)}
                      className="w-full px-3 py-2 border border-ink/20 rounded font-body"
                    />
                  ) : (
                    <input
                      id={c.chave}
                      type={c.tipo === 'url' ? 'url' : 'text'}
                      value={valores[c.chave] ?? ''}
                      onChange={(e) =>
                        setValores((v) => ({ ...v, [c.chave]: e.target.value }))
                      }
                      onBlur={() => commit(c.chave, c.tipo)}
                      className="w-full px-3 py-2 border border-ink/20 rounded"
                    />
                  )}
                  {c.hint && <p className="text-xs text-ink/50 mt-1">{c.hint}</p>}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
