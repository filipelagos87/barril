import Hero from '@/components/Hero'
import Historia from '@/components/Historia'
import Cardapio from '@/components/Cardapio'
import Galeria from '@/components/Galeria'
import Visite from '@/components/Visite'
import StructuredData from '@/components/StructuredData'
import { config } from '@/lib/config'
import { cardapio } from '@/lib/cardapio'
import { galeria } from '@/lib/galeria'

export default function Home() {
  return (
    <>
      <StructuredData config={config} />
      <main>
        <Hero config={config} />
        <Historia config={config} />
        <Cardapio categorias={cardapio} />
        <Galeria fotos={galeria} />
        <Visite config={config} />
      </main>
    </>
  )
}
