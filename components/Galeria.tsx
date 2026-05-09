import Image from 'next/image'
import type { Foto } from '@/lib/types'

export default function Galeria({ fotos }: { fotos: Foto[] }) {
  if (fotos.length === 0) return null

  return (
    <section id="galeria" className="bg-bone py-20 md:py-28">
      <div className="container-tight">
        <header className="text-center mb-10">
          <p className="uppercase tracking-[0.3em] text-amber text-xs mb-2">A casa</p>
          <h2 className="text-4xl md:text-5xl font-display tracking-wide">Galeria</h2>
        </header>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {fotos.map((foto, i) => (
            <figure
              key={foto.id}
              className="relative aspect-square overflow-hidden rounded-lg group bg-ink/5"
            >
              <Image
                src={foto.url}
                alt={foto.legenda ?? 'Foto do Barril Choperia'}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                loading={i < 4 ? 'eager' : 'lazy'}
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {foto.legenda && (
                <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ink/80 to-transparent text-bone p-3 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  {foto.legenda}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
