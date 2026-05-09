import type { Foto } from './types'

/**
 * Lista de fotos da galeria.
 * Pra adicionar foto: copia o arquivo pra `public/images/gallery/` e adiciona uma linha aqui.
 * Pra remover: deleta a linha (a foto física pode ficar, ou apaga também).
 * Pra reordenar: mude a ordem das linhas.
 */
export const galeria: Foto[] = [
  { src: '/images/gallery/barril2.jpeg', alt: 'Ambiente do Barril Choperia' },
]
