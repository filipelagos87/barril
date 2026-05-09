import type { ConfigMap } from '@/lib/types'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://barrilchopperia.com.br'

export default function StructuredData({ config }: { config: ConfigMap }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: 'Barril Choperia',
    alternateName: 'Barril Grelhados',
    description:
      'Boteco tradicional no Shopping Sul (Bancários, João Pessoa) — chopp estupidamente gelado e tábuas de carne, sem cobrar 10% de taxa.',
    url: SITE_URL,
    image: `${SITE_URL}/images/hero/barril.jpeg`,
    telephone: config.telefone_link ?? '+558332550101',
    priceRange: 'R$',
    servesCuisine: ['Brasileira', 'Boteco', 'Petiscos'],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Av. Bancário Sérgio Guerra, 900 (Shopping Sul)',
      addressLocality: 'João Pessoa',
      addressRegion: 'PB',
      postalCode: '58051-255',
      addressCountry: 'BR',
    },
    sameAs: config.instagram_url ? [config.instagram_url] : undefined,
    openingHours: ['Mo-Th 10:00-21:00', 'Fr-Su 11:00-22:00'],
    acceptsReservations: false,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
