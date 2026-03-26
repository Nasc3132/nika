import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db, isFirebaseConfigured } from '@/firebase'
import { isCustomCartItem, isProductCartItem, summarizeCart } from '@/lib/order'
import type { CartItem, CustomerInfo, OrderPayload } from '@/types'

function assertFirebaseConfigured() {
  if (!isFirebaseConfigured) {
    throw new Error('Configura Firestore antes de enviar pedidos.')
  }
}

export async function submitOrder(customer: CustomerInfo, items: CartItem[]) {
  assertFirebaseConfigured()

  const summary = summarizeCart(items)
  const payload: OrderPayload = {
    customer,
    items: items.filter(isProductCartItem),
    customData: items.filter(isCustomCartItem),
    totalItems: summary.totalItems,
    estimatedSubtotal: summary.pricedSubtotal,
    hasPendingQuote: summary.hasPendingQuote,
    createdAt: serverTimestamp(),
  }

  const documentRef = await addDoc(collection(db, 'orders'), payload)

  return {
    orderId: documentRef.id,
    summary,
    payload,
  }
}
