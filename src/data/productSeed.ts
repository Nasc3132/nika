import type { Product } from '@/types'
import rawProductSeedData from './productSeed.json'
import rawProductSeedExtrasData from './productSeedExtras.json'
import rawProductSeedGeneratedData from './productSeedGenerated.json'
import { buildProductImageUrl } from './productImage'

type RawProductSeed = Omit<Product, 'images'> & {
  category?: string | null
}

export const productSeedData: Product[] = [
  ...(rawProductSeedData as RawProductSeed[]),
  ...(rawProductSeedExtrasData as RawProductSeed[]),
  ...(rawProductSeedGeneratedData as RawProductSeed[]),
].map((product) => ({
  ...product,
  images: [buildProductImageUrl(product.name, product.category)],
}))
