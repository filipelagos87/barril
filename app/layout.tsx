import type { Metadata, Viewport } from 'next'
import { Inter, Bebas_Neue, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-body', display: 'swap' })
const bebas = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display',
  display: 'swap',
})
const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://barrilchopperia.com.br'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Barril Choperia — Chopp gelado e tábuas no Shopping Sul',
    template: '%s · Barril Choperia',
  },
  description:
    'Boteco tradicional no Shopping Sul, em João Pessoa. Chopp estupidamente gelado, tábuas de carne e o melhor da casa — sem cobrar 10% de taxa de serviço.',
  keywords: [
    'Barril Choperia',
    'Barril Grelhados',
    'Shopping Sul João Pessoa',
    'choperia João Pessoa',
    'tábua de carne João Pessoa',
    'chopp Bancários',
    'boteco João Pessoa',
  ],
  openGraph: {
    title: 'Barril Choperia — Chopp gelado e tábuas no Shopping Sul',
    description:
      'Boteco tradicional dos Bancários: chopp estupidamente gelado, tábuas de carne, sem cobrar 10%.',
    url: SITE_URL,
    siteName: 'Barril Choperia',
    type: 'website',
    locale: 'pt_BR',
    images: [
      {
        url: '/images/hero/barril.jpeg',
        width: 1200,
        height: 630,
        alt: 'Chopp gelado servido no Barril Choperia',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Barril Choperia',
    description: 'Chopp gelado, tábuas de carne, no coração dos Bancários.',
    images: ['/images/hero/barril.jpeg'],
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#1A1410',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${bebas.variable} ${mono.variable}`}>
      <body className="font-body bg-cream text-ink antialiased">{children}</body>
    </html>
  )
}
