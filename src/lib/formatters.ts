export const mxCurrencyFormatter = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
  maximumFractionDigits: 0,
})

export const dateFormatter = new Intl.DateTimeFormat('es-MX', {
  dateStyle: 'long',
  timeStyle: 'short',
})

export function formatCurrency(value: number) {
  return mxCurrencyFormatter.format(value)
}

export function formatDate(value: string) {
  return dateFormatter.format(new Date(value))
}

export function formatPieces(quantity: number) {
  return `${quantity} ${quantity === 1 ? 'pieza' : 'piezas'}`
}
