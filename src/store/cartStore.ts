import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import type { CartItem, CustomerInfo, Product, SubmittedOrderSnapshot } from '@/types'
import { createId } from '@/lib/id'

const initialCustomerInfo: CustomerInfo = {
  name: '',
  email: '',
  phone: '',
  address: '',
}

interface CartStoreState {
  customerInfo: CustomerInfo
  items: CartItem[]
  lastSubmittedOrder: SubmittedOrderSnapshot | null
  addProduct: (product: Product) => void
  addCustomOrder: (item: Omit<Extract<CartItem, { type: 'custom' }>, 'id' | 'type'>) => void
  updateCustomerInfo: (values: Partial<CustomerInfo>) => void
  updateItemQuantity: (itemId: string, quantity: number) => void
  removeItem: (itemId: string) => void
  clearCart: () => void
  setLastSubmittedOrder: (order: SubmittedOrderSnapshot | null) => void
}

export const useCartStore = create<CartStoreState>()(
  persist(
    (set) => ({
      customerInfo: initialCustomerInfo,
      items: [],
      lastSubmittedOrder: null,
      addProduct: (product) =>
        set((state) => {
          const existing = state.items.find(
            (item) => item.type === 'product' && item.productId === product.id,
          )

          if (existing && existing.type === 'product') {
            return {
              items: state.items.map((item) =>
                item.id === existing.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item,
              ),
            }
          }

          return {
            items: [
              ...state.items,
              {
                id: `product-${product.id}`,
                type: 'product',
                productId: product.id,
                name: product.name,
                description: product.description,
                image: product.images[0] ?? '',
                category: product.category ?? null,
                quantity: 1,
                basePrice: product.basePrice ?? null,
                inStock: product.inStock,
              },
            ],
          }
        }),
      addCustomOrder: (item) =>
        set((state) => ({
          items: [
            ...state.items,
            {
              id: createId('custom'),
              type: 'custom',
              ...item,
            },
          ],
        })),
      updateCustomerInfo: (values) =>
        set((state) => ({
          customerInfo: {
            ...state.customerInfo,
            ...values,
          },
        })),
      updateItemQuantity: (itemId, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === itemId
              ? { ...item, quantity: Math.max(1, Math.floor(quantity) || 1) }
              : item,
          ),
        })),
      removeItem: (itemId) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== itemId),
        })),
      clearCart: () =>
        set(() => ({
          items: [],
        })),
      setLastSubmittedOrder: (order) =>
        set(() => ({
          lastSubmittedOrder: order,
        })),
    }),
    {
      name: 'nika-cart',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        customerInfo: state.customerInfo,
        items: state.items,
        lastSubmittedOrder: state.lastSubmittedOrder,
      }),
    },
  ),
)
