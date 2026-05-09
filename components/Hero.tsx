import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown, MessageCircle } from 'lucide-react'
import type { SiteConfig } from '@/lib/types'

export default function Hero({ config }: { config: SiteConfig }) {
  const whatsapp = config.whatsapp_link
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-bone overflow-hidden">
      <Image
        src="/images/hero/barril.jpeg"
        alt="Chopp gelado servido no Barril Choperia"
        fill
        priority
        sizes="100vw"
        className="object-cover -z-20"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/55 to-ink/85 -z-10" />

      <div className="container-tight text-center px-6">
        <Image
          src="/images/logo/logo sem fundo.png"
          alt="Logo Barril"
          width={220}
          height={120}
          priority
          className="mx-auto mb-8 drop-shadow-2xl"
        />
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display tracking-wide leading-[1.05] mb-6 max-w-4xl mx-auto">
          {config.hero_headline}
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-bone/85 mb-10 max-w-2xl mx-auto">
          {config.hero_subheadline}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/cardapio" className="btn-primary">
            Ver cardápio completo
          </Link>
          {whatsapp && (
            <a
              href={`https://wa.me/${whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              <MessageCircle className="w-4 h-4 mr-2" /> Falar no WhatsApp
            </a>
          )}
        </div>
        {config.hero_badge && (
          <div className="mt-10 inline-flex items-center gap-2 bg-gold/95 text-ink px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider shadow-lg">
            ★ {config.hero_badge}
          </div>
        )}
      </div>

      <a
        href="#historia"
        aria-label="Rolar para a seção história"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-bone/70 hover:text-gold transition-colors animate-bounce"
      >
        <ChevronDown className="w-8 h-8" />
      </a>
    </section>
  )
}
