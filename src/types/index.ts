export interface Product {
  id: string
  name: string
  description: string
  images: string[]
  category?: string | null
  basePrice?: number | null
  isCustom: boolean
  inStock: boolean
}

export interface CustomerInfo {
  name: string
  email: string
  phone: string
  address: string
}

export interface UploadedReference {
  url: string
  path: string
  name: string
}

export interface ProductCartItem {
  id: string
  type: 'product'
  productId: string
  name: string
  description: string
  image: string
  category?: string | null
  quantity: number
  basePrice?: number | null
  inStock: boolean
}

export interface CustomCartItem {
  id: string
  type: 'custom'
  productType: string
  quantity: number
  description: string
  colors: string
  notes: string
  referenceImage: UploadedReference | null
}

export type CartItem = ProductCartItem | CustomCartItem

export interface CartSummary {
  totalItems: number
  pricedSubtotal: number
  itemsPendingQuote: number
  hasPendingQuote: boolean
  pricedLineItems: number
}

export interface OrderPayload {
  customer: CustomerInfo
  items: ProductCartItem[]
  customData: CustomCartItem[]
  totalItems: number
  estimatedSubtotal: number
  hasPendingQuote: boolean
  createdAt: unknown
}

export interface SubmittedOrderSnapshot {
  orderId: string
  customer: CustomerInfo
  items: CartItem[]
  summary: CartSummary
  whatsappUrl: string
  createdAt: string
}

export interface PaymentConfig {
  bankName: string
  accountHolder: string
  accountNumber: string
  instructions: string[]
}
