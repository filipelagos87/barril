import { Clock, Instagram, MapPin, MessageCircle, Phone } from 'lucide-react'
import type { SiteConfig } from '@/lib/types'

export default function Visite({ config }: { config: SiteConfig }) {
  const horarios = config.horario_funcionamento.split('\n').filter(Boolean)
  return (
    <section id="visite" className="bg-ink text-bone py-20 md:py-28">
      <div className="container-tight">
        <header className="text-center mb-10">
          <p className="uppercase tracking-[0.3em] text-gold text-xs mb-2">Como chegar</p>
          <h2 className="text-4xl md:text-5xl font-display tracking-wide">Visite a casa</h2>
        </header>

        <div className="grid md:grid-cols-2 gap-10 md:gap-16">
          <div>
            {config.mapa_embed_url && (
              <div className="aspect-video rounded-lg overflow-hidden border border-gold/20">
                <iframe
                  src={config.mapa_embed_url}
                  className="w-full h-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localização do Barril Choperia"
                />
              </div>
            )}
            {config.google_maps_url && (
              <a
                href={config.google_maps_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-gold hover:text-amber mt-3 text-sm"
              >
                <MapPin className="w-4 h-4" /> Abrir no Google Maps
              </a>
            )}
          </div>

          <div className="space-y-6">
            {config.endereco && (
              <Info icon={MapPin} title="Endereço">
                {config.endereco}
              </Info>
            )}

            {horarios.length > 0 && (
              <Info icon={Clock} title="Horário de funcionamento">
                <div className="space-y-1">
                  {horarios.map((linha, i) => (
                    <div key={i}>{linha}</div>
                  ))}
                </div>
              </Info>
            )}

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={`https://wa.me/${config.whatsapp_link}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                {config.whatsapp}
              </a>
              <a href={`tel:${config.telefone_link}`} className="btn-secondary">
                <Phone className="w-4 h-4 mr-2" />
                {config.telefone}
              </a>
              <a
                href={config.instagram_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                <Instagram className="w-4 h-4 mr-2" />
                {config.instagram_handle}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Info({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof MapPin
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="flex gap-4">
      <Icon className="w-5 h-5 text-gold mt-0.5 shrink-0" />
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-bone/90 mb-1">
          {title}
        </h3>
        <div className="text-bone/75 text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  )
}
