export function formatPrice(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  })
}

/**
 * Aceita "12,90", "12.90", "R$ 12,90" e devolve número.
 * Retorna null se não conseguir parsear.
 */
export function parsePrice(input: string): number | null {
  const cleaned = input.replace(/[^\d,.\-]/g, '').replace(',', '.')
  if (!cleaned) return null
  const n = Number(cleaned)
  if (!Number.isFinite(n) || n < 0) return null
  return Math.round(n * 100) / 100
}
