export type Item = {
  codigo?: string
  nome: string
  descricao?: string
  preco: number
  destaque?: boolean
}

export type Categoria = {
  slug: string
  nome: string
  descricao?: string
  itens: Item[]
}

export type Foto = {
  src: string
  alt?: string
}

export type SiteConfig = {
  hero_headline: string
  hero_subheadline: string
  hero_badge: string
  historia_titulo: string
  historia_paragrafos: string
  historia_video_url: string
  endereco: string
  horario_funcionamento: string
  telefone: string
  telefone_link: string
  whatsapp: string
  whatsapp_link: string
  instagram_url: string
  instagram_handle: string
  mapa_embed_url: string
  google_maps_url: string
}
