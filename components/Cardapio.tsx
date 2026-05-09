import type { Categoria, Item } from '@/lib/types'
import CardapioInteractive from './CardapioInteractive'

export default function Cardapio({
  categorias,
  itens,
}: {
  categorias: Categoria[]
  itens: Item[]
}) {
  return (
    <section id="cardapio" className="bg-cream py-20 md:py-28">
      <div className="container-tight">
        <header className="text-center mb-10">
          <p className="uppercase tracking-[0.3em] text-amber text-xs mb-2">O que servimos</p>
          <h2 className="text-4xl md:text-5xl font-display tracking-wide">Cardápio</h2>
          <p className="text-ink/60 mt-2">
            Tábuas, petiscos, chopp e drinks — preços sem taxa de serviço.
          </p>
        </header>
        {categorias.length === 0 ? (
          <p className="text-center text-ink/50 py-12">
            O cardápio está sendo carregado. Volte em instantes.
          </p>
        ) : (
          <CardapioInteractive categorias={categorias} itens={itens} />
        )}
      </div>
    </section>
  )
}
