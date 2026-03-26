import { describe, expect, it } from 'vitest'
import { buildWhatsAppMessage, summarizeCart } from '@/lib/order'
import type { CartItem, CustomerInfo } from '@/types'

const customer: CustomerInfo = {
  name: 'Andrea Lopez',
  email: 'andrea@example.com',
  phone: '+52 55 1234 5678',
  address: 'Calle 1, Matamoros',
}

const cartItems: CartItem[] = [
  {
    id: 'product-1',
    type: 'product',
    productId: 'soporte-control',
    name: 'Soporte para control',
    description: 'Base impresa en 3D para control de consola',
    image: '',
    category: 'Gaming y escritorio',
    quantity: 2,
    basePrice: 300,
    inStock: true,
  },
  {
    id: 'product-2',
    type: 'product',
    productId: 'logo-corporeo',
    name: 'Logotipo corporeo',
    description: 'Pieza corporativa sin precio fijo',
    image: '',
    category: 'Negocios y senaletica',
    quantity: 1,
    basePrice: null,
    inStock: true,
  },
  {
    id: 'custom-1',
    type: 'custom',
    productType: 'Mascara cosplay',
    quantity: 3,
    description: 'Con acabado negro mate y visor rojo',
    colors: 'Negro y rojo',
    notes: 'Entrega en abril',
    referenceImage: {
      url: 'https://example.com/ref.jpg',
      path: 'order-references/ref.jpg',
      name: 'ref.jpg',
    },
  },
]

describe('summarizeCart', () => {
  it('combina subtotal estimado y piezas por cotizar', () => {
    const summary = summarizeCart(cartItems)

    expect(summary.totalItems).toBe(6)
    expect(summary.pricedSubtotal).toBe(600)
    expect(summary.itemsPendingQuote).toBe(4)
    expect(summary.hasPendingQuote).toBe(true)
  })
})

describe('buildWhatsAppMessage', () => {
  it('incluye productos, datos del cliente y referencias', () => {
    const message = buildWhatsAppMessage({
      customer,
      items: cartItems,
      summary: summarizeCart(cartItems),
    })

    expect(message).toContain('Andrea Lopez')
    expect(message).toContain('Soporte para control (2 piezas)')
    expect(message).toContain('Logotipo corporeo (1 pieza)')
    expect(message).toContain('Pedido personalizado: Mascara cosplay')
    expect(message).toContain('Referencia: https://example.com/ref.jpg')
    expect(message).toContain('Piezas pendientes de cotizacion: 4')
  })
})
