import { beforeEach, describe, expect, it } from 'vitest'
import { useCartStore } from '@/store/cartStore'

describe('useCartStore', () => {
  beforeEach(() => {
    useCartStore.setState({
      items: [],
      customerInfo: {
        name: '',
        email: '',
        phone: '',
        address: '',
      },
      lastSubmittedOrder: null,
    })
  })

  it('acumula cantidad cuando agregas el mismo producto', () => {
    const store = useCartStore.getState()

    store.addProduct({
      id: 'soporte-control',
      name: 'Soporte para control',
      description: 'Base impresa en 3D para control de consola',
      images: ['https://example.com/soporte-control.jpg'],
      category: 'Gaming y escritorio',
      basePrice: 200,
      isCustom: false,
      inStock: true,
    })

    store.addProduct({
      id: 'soporte-control',
      name: 'Soporte para control',
      description: 'Base impresa en 3D para control de consola',
      images: ['https://example.com/soporte-control.jpg'],
      category: 'Gaming y escritorio',
      basePrice: 200,
      isCustom: false,
      inStock: true,
    })

    expect(useCartStore.getState().items).toHaveLength(1)
    expect(useCartStore.getState().items[0]?.quantity).toBe(2)
    expect(useCartStore.getState().items[0]).toMatchObject({
      type: 'product',
      category: 'Gaming y escritorio',
    })
  })

  it('permite agregar pedidos personalizados y limpiar el carrito', () => {
    const store = useCartStore.getState()

    store.addCustomOrder({
      productType: 'Mascara cosplay',
      quantity: 4,
      description: 'Con acabado metalico y ajuste de talla',
      colors: 'Negro y plata',
      notes: 'Entregar en mayo',
      referenceImage: null,
    })

    expect(useCartStore.getState().items).toHaveLength(1)

    store.clearCart()

    expect(useCartStore.getState().items).toHaveLength(0)
  })
})
