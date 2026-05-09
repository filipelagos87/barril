import Link from 'next/link'
import { ArrowRight, Star } from 'lucide-react'
import { formatPrice } from '@/lib/format'
import type { Categoria, Item } from '@/lib/types'

type ItemDestaque = Item & { categoriaNome: string }

export default function Cardapio({ categorias }: { categorias: Categoria[] }) {
  const destaques: ItemDestaque[] = categorias.flatMap((c) =>
    c.itens
      .filter((i) => i.destaque)
      .map((i) => ({ ...i, categoriaNome: c.nome }))
  )

  return (
    <section id="cardapio" className="bg-cream py-20 md:py-28">
      <div className="container-tight">
        <header className="text-center mb-12">
          <p className="uppercase tracking-[0.3em] text-amber text-xs mb-2">O que servimos</p>
          <h2 className="text-4xl md:text-5xl font-display tracking-wide">Cardápio</h2>
          <p className="text-ink/60 mt-3 max-w-xl mx-auto">
            As pedidas da casa — e o cardápio inteiro a um clique. Preços sem taxa de serviço.
          </p>
        </header>

        {destaques.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {destaques.map((item) => (
              <article
                key={`${item.categoriaNome}-${item.codigo ?? item.nome}`}
                className="bg-bone border border-gold/30 rounded-lg p-5 shadow-sm hover:shadow-md hover:border-gold transition-all"
              >
                <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider bg-gold/15 text-amber px-2 py-0.5 rounded-full mb-2">
                  <Star className="w-3 h-3 fill-current" /> Pedida da casa
                </span>
                <h3 className="font-display tracking-wide text-xl leading-tight">{item.nome}</h3>
                {item.descricao && (
                  <p className="text-sm text-ink/70 mt-1">{item.descricao}</p>
                )}
                <div className="flex items-end justify-between mt-3 pt-3 border-t border-ink/10">
                  <p className="text-[11px] uppercase tracking-wider text-ink/50">
                    {item.categoriaNome}
                  </p>
                  <p className="font-mono text-xl font-bold text-amber">
                    {formatPrice(item.preco)}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="text-center">
          <Link
            href="/cardapio"
            className="inline-flex items-center gap-2 bg-ink text-gold border-2 border-gold px-8 py-4 rounded-full font-bold uppercase tracking-wider hover:bg-gold hover:text-ink transition-colors text-base md:text-lg"
          >
            Ver cardápio completo <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-xs text-ink/50 mt-3">
            Tábuas, petiscos, chopp, drinks e mais — 18 categorias
          </p>
        </div>
      </div>
    </section>
  )
}
