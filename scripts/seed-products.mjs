import { initializeApp } from 'firebase/app'
import { collection, doc, getDocs, writeBatch } from 'firebase/firestore'
import { getFirestore } from 'firebase/firestore'
import fs from 'node:fs'
import path from 'node:path'

const envPath = path.resolve(process.cwd(), '.env')
const primarySeedPath = path.resolve(process.cwd(), 'src/data/productSeed.json')
const extraSeedPath = path.resolve(process.cwd(), 'src/data/productSeedExtras.json')
const generatedSeedPath = path.resolve(process.cwd(), 'src/data/productSeedGenerated.json')
const productImageMapPath = path.resolve(process.cwd(), 'src/data/productImageMap.json')

function readRequiredFile(filePath, errorMessage) {
  if (!fs.existsSync(filePath)) {
    throw new Error(errorMessage)
  }

  return fs.readFileSync(filePath, 'utf8')
}

function parseEnv(content) {
  return Object.fromEntries(
    content
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith('#'))
      .map((line) => {
        const index = line.indexOf('=')
        return [line.slice(0, index), line.slice(index + 1)]
      }),
  )
}

function hashString(value) {
  let hash = 0

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(index)
    hash |= 0
  }

  return Math.abs(hash)
}

const categoryImageMap = JSON.parse(readRequiredFile(productImageMapPath, 'No existe src/data/productImageMap.json.'))

function buildProductImageUrl(name, category) {
  const defaultQuery = '3d-printing,product'
  const query = category && Object.prototype.hasOwnProperty.call(categoryImageMap, category)
    ? categoryImageMap[category]
    : defaultQuery

  return `https://loremflickr.com/1200/900/${query}?lock=${hashString(`${category ?? 'Producto'}:${name}`)}`
}

const env = parseEnv(readRequiredFile(envPath, 'No existe .env en la raiz del proyecto.'))
const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID,
}

const rawProducts = [
  ...JSON.parse(readRequiredFile(primarySeedPath, 'No existe src/data/productSeed.json.')),
  ...JSON.parse(readRequiredFile(extraSeedPath, 'No existe src/data/productSeedExtras.json.')),
  ...JSON.parse(readRequiredFile(generatedSeedPath, 'No existe src/data/productSeedGenerated.json.')),
]

const productSeedData = rawProducts.map((product) => ({
  ...product,
  images: [buildProductImageUrl(product.name, product.category)],
}))

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const batch = writeBatch(db)
const existingProducts = await getDocs(collection(db, 'products'))

for (const existingProduct of existingProducts.docs) {
  batch.delete(existingProduct.ref)
}

for (const product of productSeedData) {
  batch.set(doc(db, 'products', product.id), product)
}

await batch.commit()

const categories = productSeedData.reduce((accumulator, product) => {
  const key = product.category ?? 'Sin categoria'
  accumulator[key] = (accumulator[key] ?? 0) + 1
  return accumulator
}, {})

console.log(`Seed completado. Productos en Firestore: ${productSeedData.length}`)
for (const category of Object.keys(categories).sort((left, right) => left.localeCompare(right))) {
  console.log(`- ${category}: ${categories[category]}`)
}
