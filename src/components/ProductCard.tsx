import { Badge, Box, Button, Heading, Image, Stack, Text } from '@chakra-ui/react'
import { formatCurrency } from '@/lib/formatters'
import type { Product } from '@/types'

interface ProductCardProps {
  product: Product
  onAdd: (product: Product) => void
  onViewDetails: (product: Product) => void
  onCustomize: (product: Product) => void
}

export function ProductCard({
  product,
  onAdd,
  onViewDetails,
  onCustomize,
}: ProductCardProps) {
  return (
    <Stack
      gap="4"
      border="1px solid"
      borderColor="border.soft"
      bg="surface.panel"
      borderRadius="28px"
      overflow="hidden"
      boxShadow="0 20px 60px rgba(74, 55, 38, 0.08)"
    >
      <Box position="relative">
        <Image
          src={product.images[0] ?? 'https://placehold.co/800x600?text=Nika'}
          alt={product.name}
          h="260px"
          w="full"
          objectFit="cover"
        />
        <Stack direction="row" gap="2" position="absolute" top="4" left="4">
          {product.isCustom ? (
            <Badge bg="brand.solid" color="brand.contrast" px="3" py="1" borderRadius="full">
              Personalizable
            </Badge>
          ) : null}
          <Badge
            bg={product.inStock ? 'accent.solid' : 'surface.sunken'}
            color={product.inStock ? 'accent.contrast' : 'fg.muted'}
            px="3"
            py="1"
            borderRadius="full"
          >
            {product.inStock ? 'Disponible' : 'Sin stock'}
          </Badge>
        </Stack>
      </Box>
      <Stack gap="3" px="5" pb="5">
        <Stack gap="2">
          {product.category ? (
            <Text textTransform="uppercase" letterSpacing="0.18em" fontSize="xs" color="brand.solid">
              {product.category}
            </Text>
          ) : null}
          <Heading fontFamily="heading" fontSize="2xl">
            {product.name}
          </Heading>
          <Text color="fg.muted" minH="72px">
            {product.description}
          </Text>
        </Stack>
        <Text fontWeight="800" fontSize="lg" color="brand.solid">
          {typeof product.basePrice === 'number'
            ? formatCurrency(product.basePrice)
            : 'A cotizar'}
        </Text>
        <Stack direction={{ base: 'column', sm: 'row' }} gap="3">
          <Button variant="outline" borderColor="border.soft" onClick={() => onViewDetails(product)}>
            Ver detalles
          </Button>
          {product.isCustom ? (
            <Button colorPalette="orange" onClick={() => onCustomize(product)}>
              Personalizar
            </Button>
          ) : (
            <Button
              colorPalette="orange"
              onClick={() => onAdd(product)}
              disabled={!product.inStock}
            >
              Agregar al carrito
            </Button>
          )}
        </Stack>
      </Stack>
    </Stack>
  )
}
