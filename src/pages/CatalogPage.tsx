import {
  Badge,
  Box,
  Button,
  Container,
  Dialog,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { EmptyState } from '@/components/EmptyState'
import { LoadingState } from '@/components/LoadingState'
import { PageHero } from '@/components/PageHero'
import { ProductCard } from '@/components/ProductCard'
import { toaster } from '@/components/ui/toaster'
import { formatCurrency } from '@/lib/formatters'
import { getProducts, seedProducts } from '@/services/products'
import { useCartStore } from '@/store/cartStore'
import type { Product } from '@/types'

export function CatalogPage() {
  const navigate = useNavigate()
  const addProduct = useCartStore((state) => state.addProduct)
  const [products, setProducts] = useState<Product[]>([])
  const [selectedCategory, setSelectedCategory] = useState('Todas')
  const [isLoading, setIsLoading] = useState(true)
  const [isSeeding, setIsSeeding] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const categories = Array.from(
    new Set(
      products
        .map((product) => product.category)
        .filter((category): category is string => Boolean(category)),
    ),
  ).sort((left, right) => left.localeCompare(right))
  const visibleProducts =
    selectedCategory === 'Todas'
      ? products
      : products.filter((product) => product.category === selectedCategory)

  async function loadProducts() {
    setIsLoading(true)
    setErrorMessage('')

    try {
      const nextProducts = await getProducts()
      setProducts(nextProducts)
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'No pudimos cargar el catalogo.',
      )
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    void loadProducts()
  }, [])

  useEffect(() => {
    if (selectedCategory !== 'Todas' && !categories.includes(selectedCategory)) {
      setSelectedCategory('Todas')
    }
  }, [categories, selectedCategory])

  async function handleSeed() {
    setIsSeeding(true)

    try {
      await seedProducts()
      toaster.create({
        type: 'success',
        title: 'Catalogo 3D cargado',
        description: 'Ya puedes explorar el inventario demo de impresion 3D en Firestore.',
        closable: true,
      })
      await loadProducts()
    } catch (error) {
      toaster.create({
        type: 'error',
        title: 'No pudimos sembrar productos',
        description: error instanceof Error ? error.message : 'Revisa tu configuracion.',
        closable: true,
      })
    } finally {
      setIsSeeding(false)
    }
  }

  function handleAdd(product: Product) {
    addProduct(product)
    toaster.create({
      type: 'success',
      title: 'Producto agregado',
      description: `${product.name} ya esta en tu carrito.`,
      closable: true,
    })
  }

  return (
    <Stack gap="10" pb="16">
      <PageHero
        eyebrow="Catalogo"
        title="Catalogo 3D para regalos, negocio, hogar, cosplay, gaming y mucho mas."
        description="Filtra por categoria, consulta disponibilidad, agrega stock al carrito y usa el mismo flujo para pedir variaciones personalizadas."
      />

      <Container maxW="7xl">
        {isLoading ? <LoadingState message="Cargando productos desde Firestore..." /> : null}

        {!isLoading && errorMessage ? (
          <EmptyState
            title="No pudimos cargar el catalogo"
            description={errorMessage}
            actionLabel="Intentar de nuevo"
            onAction={() => {
              void loadProducts()
            }}
          />
        ) : null}

        {!isLoading && !errorMessage && products.length === 0 ? (
          <Stack gap="4">
            <EmptyState
              title="Tu catalogo aun esta vacio"
              description="Carga productos en Firestore o usa el seed de ejemplo para ver el MVP funcionando."
            />
            {import.meta.env.DEV ? (
              <Button colorPalette="brand" alignSelf="flex-start" loading={isSeeding} onClick={handleSeed}>
                Cargar productos demo en Firestore
              </Button>
            ) : null}
          </Stack>
        ) : null}

        {!isLoading && !errorMessage && products.length > 0 ? (
          <Stack gap="6">
            <Stack gap="3">
              <Text textTransform="uppercase" letterSpacing="0.24em" fontSize="xs" color="brand.solid">
                Categorias
              </Text>
              <Text color="fg.muted">
                {products.length} productos listos para filtrar en {categories.length} categorias.
              </Text>
              <Box display="flex" flexWrap="wrap" gap="3">
                <Button
                  variant={selectedCategory === 'Todas' ? 'solid' : 'outline'}
                  colorPalette={selectedCategory === 'Todas' ? 'brand' : undefined}
                  borderColor="border.soft"
                  onClick={() => setSelectedCategory('Todas')}
                >
                  Todas ({products.length})
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'solid' : 'outline'}
                    colorPalette={selectedCategory === category ? 'brand' : undefined}
                    borderColor="border.soft"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category} ({products.filter((product) => product.category === category).length})
                  </Button>
                ))}
              </Box>
            </Stack>

            {visibleProducts.length > 0 ? (
              <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap="6">
                {visibleProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAdd={handleAdd}
                    onViewDetails={setSelectedProduct}
                    onCustomize={(selected) =>
                      navigate(`/arma-tu-pedido?product=${encodeURIComponent(selected.name)}`)
                    }
                  />
                ))}
              </SimpleGrid>
            ) : (
              <EmptyState
                title="No encontramos productos en esta categoria"
                description="Prueba otra categoria o vuelve a mostrar todo el catalogo."
                actionLabel="Ver todo"
                onAction={() => setSelectedCategory('Todas')}
              />
            )}
          </Stack>
        ) : null}
      </Container>

      <Dialog.Root
        open={Boolean(selectedProduct)}
        onOpenChange={(details) => {
          if (!details.open) {
            setSelectedProduct(null)
          }
        }}
      >
        <Dialog.Backdrop />
        <Dialog.Positioner px="4">
          <Dialog.Content maxW="720px" borderRadius="32px" overflow="hidden">
            <Dialog.Header pb="0">
              <Dialog.Title fontFamily="heading" fontSize="3xl">
                {selectedProduct?.name}
              </Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              {selectedProduct ? (
                <Stack gap="5">
                  <Image
                    src={selectedProduct.images[0] ?? 'https://placehold.co/800x600?text=Nika'}
                    alt={selectedProduct.name}
                    h={{ base: '260px', md: '320px' }}
                    w="full"
                    objectFit="cover"
                    borderRadius="24px"
                  />
                  <Box display="flex" flexWrap="wrap" gap="2">
                    {selectedProduct.category ? (
                      <Badge bg="surface.muted" color="fg.default" px="3" py="1" borderRadius="full">
                        {selectedProduct.category}
                      </Badge>
                    ) : null}
                    {selectedProduct.isCustom ? (
                      <Badge bg="brand.solid" color="brand.contrast" px="3" py="1" borderRadius="full">
                        Personalizable
                      </Badge>
                    ) : null}
                    <Badge
                      bg={selectedProduct.inStock ? 'accent.solid' : 'surface.sunken'}
                      color={selectedProduct.inStock ? 'accent.contrast' : 'fg.muted'}
                      px="3"
                      py="1"
                      borderRadius="full"
                    >
                      {selectedProduct.inStock ? 'Disponible' : 'Sin stock'}
                    </Badge>
                  </Box>
                  <Text color="fg.muted">{selectedProduct.description}</Text>
                  <Text fontWeight="800" color="brand.solid" fontSize="lg">
                    {typeof selectedProduct.basePrice === 'number'
                      ? formatCurrency(selectedProduct.basePrice)
                      : 'A cotizar'}
                  </Text>
                  <Box p="4" bg="surface.muted" borderRadius="22px">
                    <Text color="fg.muted">
                      {selectedProduct.isCustom
                        ? 'Esta pieza se trabaja como pedido personalizado, asi que la revisaremos contigo antes de confirmar monto y tiempo.'
                        : selectedProduct.inStock
                          ? 'Puedes agregarla al carrito y enviarla junto con pedidos personalizados en una sola solicitud.'
                          : 'La pieza esta temporalmente sin stock, pero puedes consultarla por WhatsApp o pedir una version personalizada.'}
                    </Text>
                  </Box>
                </Stack>
              ) : null}
            </Dialog.Body>
            <Dialog.CloseTrigger />
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </Stack>
  )
}
