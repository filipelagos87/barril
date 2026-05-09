'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, MessageCircle, Search, Star } from 'lucide-react'
import { formatPrice } from '@/lib/format'
import { config } from '@/lib/config'
import type { Categoria, Item } from '@/lib/types'

type ItemComCat = Item & { categoriaSlug: string; categoriaNome: string }

export default function CardapioCompleto({ categorias }: { categorias: Categoria[] }) {
  const [busca, setBusca] = useState('')

  const todosOsItens = useMemo<ItemComCat[]>(
    () =>
      categorias.flatMap((c) =>
        c.itens.map((item) => ({
          ...item,
          categoriaSlug: c.slug,
          categoriaNome: c.nome,
        }))
      ),
    [categorias]
  )

  const buscaTrim = busca.trim().toLowerCase()
  const buscando = buscaTrim.length > 0

  const itensBusca = useMemo<ItemComCat[]>(() => {
    if (!buscando) return []
    return todosOsItens.filter(
      (i) =>
        i.nome.toLowerCase().includes(buscaTrim) ||
        (i.descricao ?? '').toLowerCase().includes(buscaTrim) ||
        (i.codigo ?? '').toLowerCase().includes(buscaTrim)
    )
  }, [buscando, buscaTrim, todosOsItens])

  return (
    <main className="bg-cream min-h-screen pb-24">
      <div className="bg-ink text-bone">
        <div className="container-tight py-6 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-bone/80 hover:text-gold"
          >
            <ArrowLeft className="w-4 h-4" /> voltar à home
          </Link>
          <a
            href={`https://wa.me/${config.whatsapp_link}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-gold hover:text-amber"
          >
            <MessageCircle className="w-4 h-4" /> {config.whatsapp}
          </a>
        </div>
        <div className="container-tight pb-12 pt-4 text-center">
          <p className="uppercase tracking-[0.3em] text-gold text-xs mb-3">
            Barril Choperia
          </p>
          <h1 className="text-4xl md:text-6xl font-display tracking-wide">
            Cardápio Completo
          </h1>
          <p className="text-bone/70 mt-3 max-w-xl mx-auto">
            Sem cobrar 10% de taxa de serviço. Preços podem mudar — atualizado diretamente no site.
          </p>
        </div>
      </div>

      <div className="sticky top-0 z-30 bg-cream/95 backdrop-blur-sm border-b border-ink/10 shadow-sm">
        <div className="container-tight py-3">
          <div className="relative max-w-md mx-auto mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" />
            <input
              type="search"
              placeholder="Buscar item, código ou descrição…"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-ink/15 rounded-full bg-bone focus:outline-none focus:ring-2 focus:ring-gold"
            />
          </div>
          {!buscando && (
            <div className="flex gap-2 overflow-x-auto scrollbar-thin pb-1 -mx-2 px-2">
              {categorias.map((cat) => (
                <a
                  key={cat.slug}
                  href={`#${cat.slug}`}
                  className="shrink-0 px-3 py-1 text-xs uppercase tracking-wider rounded-full bg-bone text-ink/70 border border-ink/15 hover:bg-ink hover:text-gold hover:border-gold transition-colors"
                >
                  {cat.nome}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="container-tight pt-10">
        {buscando ? (
          <BuscaResults itens={itensBusca} busca={busca} />
        ) : (
          <div className="space-y-14">
            {categorias.map((cat) => (
              <CategoriaSecao key={cat.slug} categoria={cat} />
            ))}
          </div>
        )}
      </div>

      <footer className="container-tight mt-20 text-center text-sm text-ink/50">
        <p className="mb-2">— fim do cardápio —</p>
        <Link href="/" className="text-amber hover:text-gold">
          ← voltar à home
        </Link>
      </footer>
    </main>
  )
}

function CategoriaSecao({ categoria }: { categoria: Categoria }) {
  return (
    <section id={categoria.slug} className="scroll-mt-32">
      <header className="mb-5 border-b-2 border-gold/30 pb-3">
        <h2 className="text-3xl md:text-4xl font-display tracking-wide">{categoria.nome}</h2>
        {categoria.descricao && (
          <p className="text-ink/60 text-sm mt-1">{categoria.descricao}</p>
        )}
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
        {categoria.itens.map((item) => (
          <ItemRow key={item.codigo ?? item.nome} item={item} />
        ))}
      </div>
    </section>
  )
}

function ItemRow({
  item,
  categoriaNome,
}: {
  item: Item
  categoriaNome?: string
}) {
  return (
    <div className="flex items-baseline gap-3 py-2 border-b border-dashed border-ink/10 last:border-0">
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          {item.destaque && (
            <Star className="w-3.5 h-3.5 text-gold fill-gold shrink-0" aria-label="Pedida da casa" />
          )}
          <h3 className="font-medium leading-tight">{item.nome}</h3>
          {item.codigo && (
            <span className="text-[10px] text-ink/40 font-mono">#{item.codigo}</span>
          )}
        </div>
        {item.descricao && (
          <p className="text-xs text-ink/60 mt-0.5">{item.descricao}</p>
        )}
        {categoriaNome && (
          <p className="text-[10px] uppercase tracking-wider text-ink/40 mt-0.5">
            {categoriaNome}
          </p>
        )}
      </div>
      <div className="flex items-baseline gap-2 shrink-0">
        <span className="text-xs text-ink/30 hidden sm:inline">·····</span>
        <span className="font-mono font-bold text-amber whitespace-nowrap">
          {formatPrice(item.preco)}
        </span>
      </div>
    </div>
  )
}

function BuscaResults({ itens, busca }: { itens: ItemComCat[]; busca: string }) {
  if (itens.length === 0) {
    return (
      <p className="text-center py-16 text-ink/50">
        Nenhum item encontrado para "{busca}".
      </p>
    )
  }
  return (
    <div>
      <p className="text-sm text-ink/60 mb-4">
        {itens.length} resultado{itens.length === 1 ? '' : 's'} para "{busca}"
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 bg-bone p-6 rounded-lg border border-ink/10">
        {itens.map((item) => (
          <ItemRow
            key={`${item.categoriaSlug}-${item.codigo ?? item.nome}`}
            item={item}
            categoriaNome={item.categoriaNome}
          />
        ))}
      </div>
    </div>
  )
}
