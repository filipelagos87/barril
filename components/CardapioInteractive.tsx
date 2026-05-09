'use client'

import { useMemo, useState } from 'react'
import { Search, Star } from 'lucide-react'
import { formatPrice } from '@/lib/format'
import type { Categoria, Item } from '@/lib/types'

export default function CardapioInteractive({
  categorias,
  itens,
}: {
  categorias: Categoria[]
  itens: Item[]
}) {
  const [ativa, setAtiva] = useState<string>(categorias[0]?.slug ?? '')
  const [busca, setBusca] = useState('')

  const itensPorCategoria = useMemo(() => {
    const map = new Map<string, Item[]>()
    for (const cat of categorias) map.set(cat.slug, [])
    for (const item of itens) {
      const cat = categorias.find((c) => c.id === item.categoria_id)
      if (!cat) continue
      map.get(cat.slug)?.push(item)
    }
    return map
  }, [categorias, itens])

  const buscaTrim = busca.trim().toLowerCase()
  const buscando = buscaTrim.length > 0

  const itensVisiveis = useMemo(() => {
    if (buscando) {
      return itens.filter(
        (i) =>
          i.nome.toLowerCase().includes(buscaTrim) ||
          (i.descricao ?? '').toLowerCase().includes(buscaTrim) ||
          (i.codigo ?? '').toLowerCase().includes(buscaTrim)
      )
    }
    return itensPorCategoria.get(ativa) ?? []
  }, [buscando, buscaTrim, itens, itensPorCategoria, ativa])

  return (
    <div>
      <div className="sticky top-0 z-30 bg-cream/95 backdrop-blur-sm py-3 -mx-4 px-4 border-b border-ink/10">
        <div className="relative mb-3 max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" />
          <input
            type="search"
            placeholder="Buscar item, código ou descrição…"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-ink/15 rounded-full bg-bone focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto scrollbar-thin pb-1">
          {categorias.map((cat) => {
            const ativo = !buscando && cat.slug === ativa
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setBusca('')
                  setAtiva(cat.slug)
                }}
                className={`shrink-0 px-4 py-1.5 text-sm rounded-full uppercase tracking-wider transition-colors ${
                  ativo
                    ? 'bg-ink text-gold border border-gold'
                    : 'bg-bone text-ink/70 border border-ink/15 hover:bg-cream hover:text-ink'
                }`}
              >
                {cat.nome}
              </button>
            )
          })}
        </div>
      </div>

      {buscando && (
        <p className="text-center text-sm text-ink/60 mt-6">
          {itensVisiveis.length} resultado{itensVisiveis.length === 1 ? '' : 's'} para "
          {busca}"
        </p>
      )}

      <div className="mt-6">
        {itensVisiveis.length === 0 ? (
          <p className="text-center py-12 text-ink/50">Nenhum item encontrado.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {itensVisiveis.map((item) => (
              <article
                key={item.id}
                className="bg-bone border border-ink/10 rounded-lg p-4 shadow-sm hover:shadow-md hover:border-gold/40 transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    {item.destaque && (
                      <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider bg-gold/15 text-amber px-2 py-0.5 rounded-full mb-1.5">
                        <Star className="w-3 h-3 fill-current" /> Pedida da casa
                      </span>
                    )}
                    <h3 className="font-display tracking-wide text-lg leading-tight">
                      {item.nome}
                    </h3>
                    {item.descricao && (
                      <p className="text-sm text-ink/70 mt-1">{item.descricao}</p>
                    )}
                    {item.codigo && (
                      <p className="text-[11px] text-ink/40 mt-2 font-mono">
                        cód. {item.codigo}
                      </p>
                    )}
                  </div>
                  <p className="font-mono text-lg font-bold text-amber whitespace-nowrap">
                    {formatPrice(item.preco)}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
