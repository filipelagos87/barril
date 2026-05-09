export type Categoria = {
  id: string
  nome: string
  slug: string
  descricao: string | null
  ordem: number
  ativo: boolean
  banner_url: string | null
}

export type Item = {
  id: string
  categoria_id: string
  codigo: string | null
  nome: string
  descricao: string | null
  preco: number
  foto_url: string | null
  ordem: number
  ativo: boolean
  destaque: boolean
}

export type Foto = {
  id: string
  url: string
  legenda: string | null
  ordem: number
  ativo: boolean
}

export type ConfigEntry = {
  chave: string
  valor: string
  tipo: 'string' | 'text' | 'url' | 'json'
}

export type ConfigMap = Record<string, string>
