'use client'

import { useMemo, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Check, Loader2, Pencil, Plus, Star, X } from 'lucide-react'
import { createSupabaseBrowser } from '@/lib/supabase/client'
import { formatPrice, parsePrice } from '@/lib/format'
import type { Categoria, Item } from '@/lib/types'

type Props = {
  categoriasIniciais: Categoria[]
  itensIniciais: Item[]
}

type ItemDraft = Partial<Item> & { categoria_id: string; nome: string; preco: number }

export default function CardapioAdmin({ categoriasIniciais, itensIniciais }: Props) {
  const router = useRouter()
  const supabase = createSupabaseBrowser()
  const [, startTransition] = useTransition()

  const [categorias] = useState(categoriasIniciais)
  const [itens, setItens] = useState(itensIniciais)
  const [filtroCategoria, setFiltroCategoria] = useState<string>('all')
  const [busca, setBusca] = useState('')
  const [editingItem, setEditingItem] = useState<Item | null>(null)
  const [creating, setCreating] = useState(false)

  const categoriasMap = useMemo(
    () => Object.fromEntries(categorias.map((c) => [c.id, c])),
    [categorias]
  )

  const itensFiltrados = useMemo(() => {
    const q = busca.trim().toLowerCase()
    return itens.filter((i) => {
      if (filtroCategoria !== 'all' && i.categoria_id !== filtroCategoria) return false
      if (!q) return true
      return (
        i.nome.toLowerCase().includes(q) ||
        (i.codigo ?? '').toLowerCase().includes(q) ||
        (i.descricao ?? '').toLowerCase().includes(q)
      )
    })
  }, [itens, filtroCategoria, busca])

  function patchLocal(id: string, patch: Partial<Item>) {
    setItens((prev) => prev.map((i) => (i.id === id ? { ...i, ...patch } : i)))
  }

  async function updatePreco(id: string, novoPreco: number) {
    const { error } = await supabase
      .from('cardapio_itens')
      .update({ preco: novoPreco })
      .eq('id', id)
    if (error) {
      alert('Erro ao salvar preço: ' + error.message)
      return false
    }
    patchLocal(id, { preco: novoPreco })
    return true
  }

  async function toggle(id: string, field: 'ativo' | 'destaque', value: boolean) {
    patchLocal(id, { [field]: value }) // optimistic
    const { error } = await supabase
      .from('cardapio_itens')
      .update({ [field]: value })
      .eq('id', id)
    if (error) {
      patchLocal(id, { [field]: !value })
      alert('Erro: ' + error.message)
    }
  }

  async function saveItem(draft: ItemDraft, id?: string) {
    const payload = {
      categoria_id: draft.categoria_id,
      codigo: draft.codigo || null,
      nome: draft.nome,
      descricao: draft.descricao || null,
      preco: draft.preco,
      ordem: draft.ordem ?? 0,
      ativo: draft.ativo ?? true,
      destaque: draft.destaque ?? false,
    }

    if (id) {
      const { error } = await supabase.from('cardapio_itens').update(payload).eq('id', id)
      if (error) return alert('Erro ao salvar: ' + error.message)
      patchLocal(id, payload)
      setEditingItem(null)
    } else {
      const { data, error } = await supabase
        .from('cardapio_itens')
        .insert(payload)
        .select()
        .single()
      if (error) return alert('Erro ao criar: ' + error.message)
      if (data) setItens((prev) => [...prev, data as Item])
      setCreating(false)
    }
    startTransition(() => router.refresh())
  }

  async function deleteItem(id: string) {
    if (!confirm('Excluir este item permanentemente?')) return
    const { error } = await supabase.from('cardapio_itens').delete().eq('id', id)
    if (error) return alert('Erro: ' + error.message)
    setItens((prev) => prev.filter((i) => i.id !== id))
    setEditingItem(null)
  }

  return (
    <div>
      <header className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-3xl font-display tracking-wider">Cardápio</h2>
          <p className="text-sm text-ink/60">
            {itens.length} itens · clique no preço pra editar direto na tabela
          </p>
        </div>
        <button
          onClick={() => setCreating(true)}
          className="inline-flex items-center gap-2 bg-gold text-ink font-bold px-4 py-2 rounded hover:bg-amber transition-colors"
        >
          <Plus className="w-4 h-4" /> Novo item
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-4 mb-4">
        <select
          value={filtroCategoria}
          onChange={(e) => setFiltroCategoria(e.target.value)}
          className="px-3 py-2 border border-ink/20 rounded bg-bone"
        >
          <option value="all">Todas as categorias</option>
          {categorias.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nome}
            </option>
          ))}
        </select>
        <input
          type="search"
          placeholder="Buscar por nome, código ou descrição…"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="px-3 py-2 border border-ink/20 rounded bg-bone"
        />
      </div>

      <div className="bg-bone border border-ink/10 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-ink text-bone">
              <tr>
                <th className="text-left px-3 py-2 font-medium">Cód.</th>
                <th className="text-left px-3 py-2 font-medium">Nome</th>
                <th className="text-left px-3 py-2 font-medium hidden md:table-cell">Categoria</th>
                <th className="text-right px-3 py-2 font-medium">Preço (R$)</th>
                <th className="text-center px-3 py-2 font-medium">Ativo</th>
                <th className="text-center px-3 py-2 font-medium">Destaque</th>
                <th className="px-3 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {itensFiltrados.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-ink/50">
                    Nenhum item encontrado.
                  </td>
                </tr>
              )}
              {itensFiltrados.map((item) => (
                <tr key={item.id} className="border-t border-ink/10 hover:bg-cream/30">
                  <td className="px-3 py-2 font-mono text-xs text-ink/60">{item.codigo ?? '—'}</td>
                  <td className="px-3 py-2">
                    <div className="font-medium">{item.nome}</div>
                    {item.descricao && (
                      <div className="text-xs text-ink/60">{item.descricao}</div>
                    )}
                  </td>
                  <td className="px-3 py-2 text-ink/70 hidden md:table-cell">
                    {categoriasMap[item.categoria_id]?.nome ?? '—'}
                  </td>
                  <td className="px-3 py-2 text-right">
                    <PrecoInline value={item.preco} onSave={(v) => updatePreco(item.id, v)} />
                  </td>
                  <td className="px-3 py-2 text-center">
                    <Toggle
                      checked={item.ativo}
                      onChange={(v) => toggle(item.id, 'ativo', v)}
                      label="Ativo"
                    />
                  </td>
                  <td className="px-3 py-2 text-center">
                    <button
                      onClick={() => toggle(item.id, 'destaque', !item.destaque)}
                      title={item.destaque ? 'Remover destaque' : 'Marcar como destaque'}
                      className="p-1 rounded hover:bg-cream"
                    >
                      <Star
                        className={`w-4 h-4 ${
                          item.destaque ? 'fill-gold text-gold' : 'text-ink/30'
                        }`}
                      />
                    </button>
                  </td>
                  <td className="px-3 py-2 text-right">
                    <button
                      onClick={() => setEditingItem(item)}
                      className="inline-flex items-center gap-1 text-xs text-ink/70 hover:text-amber"
                    >
                      <Pencil className="w-3.5 h-3.5" /> editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {(editingItem || creating) && (
        <ItemDrawer
          item={editingItem ?? undefined}
          categorias={categorias}
          onClose={() => {
            setEditingItem(null)
            setCreating(false)
          }}
          onSave={saveItem}
          onDelete={editingItem ? () => deleteItem(editingItem.id) : undefined}
        />
      )}
    </div>
  )
}

function PrecoInline({ value, onSave }: { value: number; onSave: (v: number) => Promise<boolean> }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(value.toFixed(2).replace('.', ','))
  const [saving, setSaving] = useState(false)

  async function commit() {
    const parsed = parsePrice(draft)
    if (parsed === null) {
      alert('Preço inválido. Use formato 12,90.')
      setDraft(value.toFixed(2).replace('.', ','))
      setEditing(false)
      return
    }
    if (parsed === value) {
      setEditing(false)
      return
    }
    setSaving(true)
    const ok = await onSave(parsed)
    setSaving(false)
    if (!ok) setDraft(value.toFixed(2).replace('.', ','))
    setEditing(false)
  }

  if (!editing) {
    return (
      <button
        onClick={() => {
          setDraft(value.toFixed(2).replace('.', ','))
          setEditing(true)
        }}
        className="font-mono font-medium hover:bg-gold/10 px-2 py-0.5 rounded"
      >
        {formatPrice(value)}
      </button>
    )
  }

  return (
    <div className="inline-flex items-center gap-1">
      {saving && <Loader2 className="w-3.5 h-3.5 animate-spin text-ink/50" />}
      <input
        autoFocus
        type="text"
        inputMode="decimal"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.currentTarget.blur()
          }
          if (e.key === 'Escape') {
            setDraft(value.toFixed(2).replace('.', ','))
            setEditing(false)
          }
        }}
        className="w-24 text-right font-mono px-2 py-1 border border-gold rounded bg-cream/40"
      />
    </div>
  )
}

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean
  onChange: (v: boolean) => void
  label: string
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`inline-flex w-10 h-5 rounded-full p-0.5 transition-colors ${
        checked ? 'bg-gold' : 'bg-ink/20'
      }`}
    >
      <span
        className={`block w-4 h-4 rounded-full bg-bone transition-transform ${
          checked ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  )
}

function ItemDrawer({
  item,
  categorias,
  onClose,
  onSave,
  onDelete,
}: {
  item?: Item
  categorias: Categoria[]
  onClose: () => void
  onSave: (draft: ItemDraft, id?: string) => void
  onDelete?: () => void
}) {
  const [draft, setDraft] = useState<ItemDraft>(
    item ?? {
      categoria_id: categorias[0]?.id ?? '',
      codigo: '',
      nome: '',
      descricao: '',
      preco: 0,
      ordem: 0,
      ativo: true,
      destaque: false,
    }
  )
  const [precoStr, setPrecoStr] = useState(
    item ? item.preco.toFixed(2).replace('.', ',') : ''
  )

  function submit(e: React.FormEvent) {
    e.preventDefault()
    const parsed = parsePrice(precoStr)
    if (parsed === null) {
      alert('Informe um preço válido (ex.: 12,90).')
      return
    }
    if (!draft.nome.trim()) {
      alert('O nome é obrigatório.')
      return
    }
    if (!draft.categoria_id) {
      alert('Selecione uma categoria.')
      return
    }
    onSave({ ...draft, preco: parsed }, item?.id)
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-ink/60" onClick={onClose}>
      <div
        className="w-full max-w-md bg-bone h-full overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-ink/10">
          <h3 className="text-xl font-display tracking-wider">
            {item ? 'Editar item' : 'Novo item'}
          </h3>
          <button onClick={onClose} className="p-1 hover:bg-cream rounded">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={submit} className="p-4 space-y-4">
          <Field label="Nome">
            <input
              type="text"
              value={draft.nome}
              onChange={(e) => setDraft((d) => ({ ...d, nome: e.target.value }))}
              className="w-full px-3 py-2 border border-ink/20 rounded"
              required
            />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Código">
              <input
                type="text"
                value={draft.codigo ?? ''}
                onChange={(e) => setDraft((d) => ({ ...d, codigo: e.target.value }))}
                className="w-full px-3 py-2 border border-ink/20 rounded font-mono"
              />
            </Field>
            <Field label="Preço (R$)">
              <input
                type="text"
                inputMode="decimal"
                value={precoStr}
                onChange={(e) => setPrecoStr(e.target.value)}
                placeholder="12,90"
                className="w-full px-3 py-2 border border-ink/20 rounded font-mono text-right"
                required
              />
            </Field>
          </div>

          <Field label="Categoria">
            <select
              value={draft.categoria_id}
              onChange={(e) => setDraft((d) => ({ ...d, categoria_id: e.target.value }))}
              className="w-full px-3 py-2 border border-ink/20 rounded"
              required
            >
              {categorias.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nome}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Descrição">
            <textarea
              value={draft.descricao ?? ''}
              onChange={(e) => setDraft((d) => ({ ...d, descricao: e.target.value }))}
              rows={2}
              className="w-full px-3 py-2 border border-ink/20 rounded"
            />
          </Field>

          <Field label="Ordem">
            <input
              type="number"
              value={draft.ordem ?? 0}
              onChange={(e) => setDraft((d) => ({ ...d, ordem: Number(e.target.value) }))}
              className="w-32 px-3 py-2 border border-ink/20 rounded font-mono"
            />
          </Field>

          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={draft.ativo ?? true}
                onChange={(e) => setDraft((d) => ({ ...d, ativo: e.target.checked }))}
              />
              Ativo no site
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={draft.destaque ?? false}
                onChange={(e) => setDraft((d) => ({ ...d, destaque: e.target.checked }))}
              />
              Pedida da casa
            </label>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-ink/10">
            <div>
              {onDelete && (
                <button
                  type="button"
                  onClick={onDelete}
                  className="text-sm text-red-700 hover:underline"
                >
                  Excluir
                </button>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-2 text-sm hover:bg-cream rounded"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-gold text-ink font-bold px-4 py-2 rounded hover:bg-amber"
              >
                <Check className="w-4 h-4" /> Salvar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium mb-1">{label}</span>
      {children}
    </label>
  )
}
