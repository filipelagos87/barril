import type { Foto } from './types'

/**
 * Lista de fotos da galeria.
 * Pra adicionar foto: copia o arquivo pra `public/images/gallery/` e adiciona uma linha aqui.
 * Pra remover: deleta a linha (a foto física pode ficar, ou apaga também).
 * Pra reordenar: mude a ordem das linhas.
 */
export const galeria: Foto[] = [
  { src: '/images/gallery/barril2.jpg',     alt: 'Ambiente do Barril Choperia' },
  { src: '/images/gallery/tabua1.jpg',      alt: 'Tábua de carnes do Barril' },
  { src: '/images/gallery/chopp_tabua.jpg', alt: 'Chopp gelado e tábua de carnes' },
  { src: '/images/gallery/mistinha.jpg',    alt: 'Tábua mistinha — 2 sabores' },
  { src: '/images/gallery/drink1.jpg',      alt: 'Drink especial' },
  { src: '/images/gallery/drink2.jpg',      alt: 'Caipirinha da casa' },
  { src: '/images/gallery/drink3.jpg',      alt: 'Drink com gin' },
  { src: '/images/gallery/drink4.jpg',      alt: 'Coquetel do Barril' },
]
