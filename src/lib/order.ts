import type { CartItem, CartSummary, CustomerInfo } from '@/types'
import { formatCurrency } from '@/lib/formatters'

export function isProductCartItem(item: CartItem): item is Extract<CartItem, { type: 'product' }> {
  return item.type === 'product'
}

export function isCustomCartItem(item: CartItem): item is Extract<CartItem, { type: 'custom' }> {
  return item.type === 'custom'
}

export function getLineTotal(item: CartItem) {
  if (isProductCartItem(item) && typeof item.basePrice === 'number') {
    return item.basePrice * item.quantity
  }

  return null
}

export function summarizeCart(items: CartItem[]): CartSummary {
  let totalItems = 0
  let pricedSubtotal = 0
  let itemsPendingQuote = 0
  let pricedLineItems = 0

  for (const item of items) {
    totalItems += item.quantity

    const lineTotal = getLineTotal(item)

    if (lineTotal === null) {
      itemsPendingQuote += item.quantity
    } else {
      pricedSubtotal += lineTotal
      pricedLineItems += item.quantity
    }
  }

  return {
    totalItems,
    pricedSubtotal,
    itemsPendingQuote,
    hasPendingQuote: itemsPendingQuote > 0,
    pricedLineItems,
  }
}

export function buildWhatsAppMessage(args: {
  customer: CustomerInfo
  items: CartItem[]
  summary: CartSummary
}) {
  const { customer, items, summary } = args

  const lines = [
    'Hola, quiero realizar este pedido:',
    '',
    `Cliente: ${customer.name}`,
    `Correo: ${customer.email}`,
    `Telefono: ${customer.phone}`,
    `Direccion: ${customer.address}`,
    '',
    'Resumen:',
  ]

  for (const item of items) {
    if (isProductCartItem(item)) {
      const base = `- ${item.name} (${item.quantity} ${item.quantity === 1 ? 'pieza' : 'piezas'})`
      lines.push(typeof item.basePrice === 'number' ? `${base} - ${formatCurrency(item.basePrice * item.quantity)}` : `${base} - A cotizar`)
      continue
    }

    lines.push(`- Pedido personalizado: ${item.productType} (${item.quantity} ${item.quantity === 1 ? 'pieza' : 'piezas'})`)
    lines.push(`  Detalles: ${item.description}`)

    if (item.colors.trim()) {
      lines.push(`  Colores: ${item.colors}`)
    }

    if (item.notes.trim()) {
      lines.push(`  Notas: ${item.notes}`)
    }

    if (item.referenceImage?.url) {
      lines.push(`  Referencia: ${item.referenceImage.url}`)
    }
  }

  lines.push('', `Total de piezas: ${summary.totalItems}`)

  if (summary.pricedSubtotal > 0) {
    lines.push(`Subtotal estimado: ${formatCurrency(summary.pricedSubtotal)}`)
  }

  if (summary.hasPendingQuote) {
    lines.push(`Piezas pendientes de cotizacion: ${summary.itemsPendingQuote}`)
  }

  lines.push('', 'Quedo al pendiente de la validacion. Gracias.')

  return lines.join('\n')
}

export function buildWhatsAppUrl(phoneNumber: string, message: string) {
  const normalizedPhone = phoneNumber.replace(/\D/g, '')
  return `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(message)}`
}
