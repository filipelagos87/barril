import type { SiteConfig } from './types'

/**
 * Textos e contatos do site. Edite aqui pra mudar headline, telefone, horário etc.
 * O componente que usa cada campo está comentado pra facilitar achar.
 */
export const config: SiteConfig = {
  // Hero (components/Hero.tsx)
  hero_headline: 'Chopp estupidamente gelado, tábuas de carne, no coração dos Bancários',
  hero_subheadline: 'No Shopping Sul, em João Pessoa — sem cobrar os 10% de taxa de serviço',
  hero_badge: 'Não cobramos os 10%',

  // História (components/Historia.tsx) — separe parágrafos com linha em branco
  historia_titulo: 'A casa do chopp gelado',
  historia_paragrafos: `O Barril Choperia nasceu da paixão do Edson Vieira por oferecer um boteco autêntico, onde o chopp é servido estupidamente gelado e as tábuas de carne saem do fogo direto pra mesa.

Localizado no coração dos Bancários, no Shopping Sul de João Pessoa, é uma das casas mais antigas e queridas do shopping — sempre priorizando qualidade e atendimento honesto.

Aqui você encontra um ambiente acolhedor, sem firulas: apenas o prazer de uma boa conversa acompanhada de um chopp perfeito.`,
  historia_video_url: 'https://www.instagram.com/reel/DUYQvCUjivo/embed',

  // Visite (components/Visite.tsx)
  endereco: 'Av. Bancário Sérgio Guerra, 900 — Bancários, João Pessoa/PB, CEP 58051-255 (Shopping Sul)',
  horario_funcionamento: `Segunda a Quinta: 10h às 21h
Sexta a Domingo e feriados: 11h às 22h`,
  telefone: '(83) 3255-0101',
  telefone_link: '+558332550101',
  whatsapp: '(83) 99646-2621',
  whatsapp_link: '5583996462621',
  instagram_url: 'https://instagram.com/barrilchopperia',
  instagram_handle: '@barrilchopperia',
  mapa_embed_url: 'https://www.google.com/maps?q=Shopping+Sul+Bancarios+Joao+Pessoa&output=embed',
  google_maps_url: 'https://www.google.com/maps/search/?api=1&query=Shopping+Sul+Bancarios+Joao+Pessoa',
}
