import { collection, doc, getDocs, orderBy, query, setDoc, writeBatch } from 'firebase/firestore'
import { db, isFirebaseConfigured } from '@/firebase'
import { buildProductPlaceholderImage, productSeedData } from '@/data/productSeed'
import type { Product } from '@/types'

function assertFirebaseConfigured() {
  if (!isFirebaseConfigured) {
    throw new Error('Configura las variables VITE_FIREBASE_* antes de conectar el catalogo.')
  }
}

function normalizeProduct(id: string, data: Partial<Product>): Product {
  const category = typeof data.category === 'string' ? data.category : null
  const images = Array.isArray(data.images) && data.images.length > 0
    ? data.images
    : [buildProductPlaceholderImage(data.name ?? 'Producto', category)]

  return {
    id,
    name: data.name ?? 'Producto sin nombre',
    description: data.description ?? '',
    images,
    category,
    basePrice: typeof data.basePrice === 'number' ? data.basePrice : null,
    isCustom: Boolean(data.isCustom),
    inStock: Boolean(data.inStock),
  }
}

export async function getProducts() {
  assertFirebaseConfigured()

  const snapshot = await getDocs(query(collection(db, 'products'), orderBy('name')))
  return snapshot.docs.map((document) => normalizeProduct(document.id, document.data() as Partial<Product>))
}

export async function seedProducts() {
  assertFirebaseConfigured()

  if (!import.meta.env.DEV) {
    throw new Error('La carga de datos demo solo esta disponible en desarrollo.')
  }

  const existingProducts = await getDocs(collection(db, 'products'))
  const batch = writeBatch(db)

  for (const existingProduct of existingProducts.docs) {
    batch.delete(existingProduct.ref)
  }

  for (const product of productSeedData) {
    batch.set(doc(db, 'products', product.id), product)
  }

  await batch.commit()
}

export async function seedSingleProduct(product: Product) {
  assertFirebaseConfigured()
  await setDoc(doc(db, 'products', product.id), product)
}
