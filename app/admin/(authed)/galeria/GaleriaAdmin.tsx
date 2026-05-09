'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { Loader2, Trash2, Upload } from 'lucide-react'
import { createSupabaseBrowser } from '@/lib/supabase/client'
import type { Foto } from '@/lib/types'

const BUCKET = 'galeria'

export default function GaleriaAdmin({ fotosIniciais }: { fotosIniciais: Foto[] }) {
  const supabase = createSupabaseBrowser()
  const [fotos, setFotos] = useState(fotosIniciais)
  const [uploading, setUploading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleUpload(files: FileList) {
    setUploading(true)
    const proxOrdem = (fotos.at(-1)?.ordem ?? 0) + 10
    let i = 0

    for (const file of Array.from(files)) {
      const ext = file.name.split('.').pop() ?? 'jpg'
      const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`

      const { error: upErr } = await supabase.storage.from(BUCKET).upload(path, file, {
        cacheControl: '3600',
        upsert: false,
      })
      if (upErr) {
        alert(`Erro ao subir ${file.name}: ${upErr.message}`)
        continue
      }

      const { data: pub } = supabase.storage.from(BUCKET).getPublicUrl(path)
      const { data: novo, error: dbErr } = await supabase
        .from('galeria_fotos')
        .insert({
          url: pub.publicUrl,
          legenda: null,
          ordem: proxOrdem + i * 10,
          ativo: true,
        })
        .select()
        .single()

      if (dbErr) {
        alert(`Erro ao registrar ${file.name}: ${dbErr.message}`)
        continue
      }
      if (novo) setFotos((prev) => [...prev, novo as Foto])
      i++
    }
    setUploading(false)
    if (inputRef.current) inputRef.current.value = ''
  }

  async function remover(foto: Foto) {
    if (!confirm('Remover esta foto?')) return
    // tenta extrair o path do URL público
    const path = foto.url.split(`/${BUCKET}/`).pop()
    const { error: dbErr } = await supabase.from('galeria_fotos').delete().eq('id', foto.id)
    if (dbErr) return alert('Erro: ' + dbErr.message)
    if (path) await supabase.storage.from(BUCKET).remove([path])
    setFotos((prev) => prev.filter((f) => f.id !== foto.id))
  }

  async function atualizarLegenda(id: string, legenda: string) {
    const { error } = await supabase
      .from('galeria_fotos')
      .update({ legenda: legenda || null })
      .eq('id', id)
    if (error) return alert('Erro: ' + error.message)
    setFotos((prev) => prev.map((f) => (f.id === id ? { ...f, legenda: legenda || null } : f)))
  }

  async function toggleAtivo(foto: Foto) {
    const novo = !foto.ativo
    setFotos((prev) => prev.map((f) => (f.id === foto.id ? { ...f, ativo: novo } : f)))
    const { error } = await supabase
      .from('galeria_fotos')
      .update({ ativo: novo })
      .eq('id', foto.id)
    if (error) {
      setFotos((prev) => prev.map((f) => (f.id === foto.id ? { ...f, ativo: !novo } : f)))
      alert('Erro: ' + error.message)
    }
  }

  return (
    <div>
      <header className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-3xl font-display tracking-wider">Galeria</h2>
          <p className="text-sm text-ink/60">{fotos.length} foto(s) cadastradas</p>
        </div>
        <label className="inline-flex items-center gap-2 bg-gold text-ink font-bold px-4 py-2 rounded hover:bg-amber cursor-pointer">
          {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
          {uploading ? 'Enviando…' : 'Adicionar fotos'}
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            disabled={uploading}
            onChange={(e) => e.target.files && handleUpload(e.target.files)}
            className="hidden"
          />
        </label>
      </header>

      {fotos.length === 0 ? (
        <div className="text-center py-16 bg-bone border border-dashed border-ink/20 rounded-lg text-ink/50">
          Ainda não há fotos. Clique em "Adicionar fotos" pra começar.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {fotos.map((foto) => (
            <div
              key={foto.id}
              className={`bg-bone border rounded-lg overflow-hidden ${
                foto.ativo ? 'border-ink/10' : 'border-red-300 opacity-60'
              }`}
            >
              <div className="relative aspect-square bg-ink/5">
                <Image
                  src={foto.url}
                  alt={foto.legenda ?? ''}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="p-3 space-y-2">
                <input
                  type="text"
                  defaultValue={foto.legenda ?? ''}
                  onBlur={(e) => {
                    if (e.target.value !== (foto.legenda ?? '')) {
                      atualizarLegenda(foto.id, e.target.value)
                    }
                  }}
                  placeholder="Legenda (opcional)"
                  className="w-full text-sm px-2 py-1 border border-ink/10 rounded"
                />
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-1 text-xs">
                    <input
                      type="checkbox"
                      checked={foto.ativo}
                      onChange={() => toggleAtivo(foto)}
                    />
                    visível
                  </label>
                  <button
                    onClick={() => remover(foto)}
                    className="text-red-700 hover:text-red-900 p-1"
                    title="Remover"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
