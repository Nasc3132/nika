import categoryImageMap from './productImageMap.json'

const defaultQuery = '3d-printing,product'

function hashString(value: string) {
  let hash = 0

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(index)
    hash |= 0
  }

  return Math.abs(hash)
}

function buildLabeledQuery(category?: string | null) {
  if (!category) {
    return defaultQuery
  }

  return category in categoryImageMap
    ? categoryImageMap[category as keyof typeof categoryImageMap]
    : defaultQuery
}

export function buildProductImageUrl(name: string, category?: string | null) {
  const query = buildLabeledQuery(category)
  const lock = hashString(`${category ?? 'Producto'}:${name}`)
  return `https://loremflickr.com/1200/900/${query}?lock=${lock}`
}

export const buildProductPlaceholderImage = buildProductImageUrl
