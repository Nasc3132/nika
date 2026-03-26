import type { Product } from '@/types'
import rawProductSeedData from './productSeed.json'
import rawProductSeedExtrasData from './productSeedExtras.json'
import rawProductSeedGeneratedData from './productSeedGenerated.json'

type RawProductSeed = Omit<Product, 'images'> & {
  category?: string | null
}

export function buildProductPlaceholderImage(name: string, category?: string | null) {
  const label = encodeURIComponent(`Nika 3D | ${category ?? 'Producto'} | ${name}`)
  return `https://placehold.co/1200x900/F4E8DA/2C211B?text=${label}`
}

export const productSeedData: Product[] = [
  ...(rawProductSeedData as RawProductSeed[]),
  ...(rawProductSeedExtrasData as RawProductSeed[]),
  ...(rawProductSeedGeneratedData as RawProductSeed[]),
].map((product) => ({
  ...product,
  images: [buildProductPlaceholderImage(product.name, product.category)],
}))
