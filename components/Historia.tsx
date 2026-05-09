import type { SiteConfig } from '@/lib/types'

export default function Historia({ config }: { config: SiteConfig }) {
  const paragrafos = config.historia_paragrafos.split(/\n\s*\n/).filter(Boolean)
  const videoUrl = config.historia_video_url

  return (
    <section id="historia" className="bg-ink text-bone py-20 md:py-28">
      <div className="container-tight">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div>
            <p className="uppercase tracking-[0.3em] text-gold text-xs mb-3">Nossa história</p>
            <h2 className="text-4xl md:text-5xl font-display tracking-wide mb-6">
              {config.historia_titulo}
            </h2>
            <div className="space-y-4 text-bone/80 leading-relaxed">
              {paragrafos.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
          <div className="relative aspect-[9/16] max-w-sm mx-auto md:max-w-none w-full bg-ink/50 rounded-lg overflow-hidden border border-gold/20">
            {videoUrl ? (
              <iframe
                src={videoUrl}
                className="absolute inset-0 w-full h-full"
                frameBorder={0}
                allow="autoplay; encrypted-media"
                allowFullScreen
                title="Vídeo do Barril Choperia"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-bone/40 text-sm">
                Em breve
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
