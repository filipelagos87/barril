import Hero from '@/components/Hero'
import Historia from '@/components/Historia'
import Cardapio from '@/components/Cardapio'
import Galeria from '@/components/Galeria'
import Visite from '@/components/Visite'
import StructuredData from '@/components/StructuredData'
import { getSitePayload } from '@/lib/data'

export const revalidate = 60

export default async function Home() {
  const { config, categorias, itens, fotos } = await getSitePayload()

  return (
    <>
      <StructuredData config={config} />
      <main>
        <Hero config={config} />
        <Historia config={config} />
        <Cardapio categorias={categorias} itens={itens} />
        <Galeria fotos={fotos} />
        <Visite config={config} />
      </main>
    </>
  )
}
