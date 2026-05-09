import type { Metadata } from 'next'
import { cardapio } from '@/lib/cardapio'
import CardapioCompleto from '@/components/CardapioCompleto'

export const metadata: Metadata = {
  title: 'Cardápio completo',
  description:
    'Cardápio completo do Barril Choperia — tábuas, petiscos, chopp, drinks e bebidas. Preços sem cobrar 10% de taxa de serviço.',
}

export default function CardapioPage() {
  return <CardapioCompleto categorias={cardapio} />
}
