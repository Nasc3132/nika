import { Box, Button, Image, Input, Stack, Text } from '@chakra-ui/react'
import { formatCurrency } from '@/lib/formatters'
import { getLineTotal, isProductCartItem } from '@/lib/order'
import type { CartItem as CartLineItem } from '@/types'

interface CartItemProps {
  item: CartLineItem
  onQuantityChange: (quantity: number) => void
  onRemove: () => void
}

export function CartItem({ item, onQuantityChange, onRemove }: CartItemProps) {
  const lineTotal = getLineTotal(item)

  return (
    <Stack
      direction={{ base: 'column', md: 'row' }}
      gap="5"
      p="5"
      borderRadius="28px"
      bg="surface.panel"
      border="1px solid"
      borderColor="border.soft"
    >
      {isProductCartItem(item) ? (
        <Image
          src={item.image || 'https://placehold.co/320x240?text=Nika'}
          alt={item.name}
          w={{ base: 'full', md: '170px' }}
          h={{ base: '220px', md: '170px' }}
          objectFit="cover"
          borderRadius="20px"
        />
      ) : (
        <Box
          w={{ base: 'full', md: '170px' }}
          minH={{ base: '180px', md: '170px' }}
          borderRadius="20px"
          bg="surface.muted"
          display="flex"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          p="5"
        >
          <Text fontWeight="700" color="brand.solid">
            Pedido personalizado
          </Text>
        </Box>
      )}
      <Stack flex="1" gap="4">
        <Stack gap="1">
          {isProductCartItem(item) && item.category ? (
            <Text textTransform="uppercase" letterSpacing="0.18em" fontSize="xs" color="brand.solid">
              {item.category}
            </Text>
          ) : null}
          <Text fontWeight="800" fontSize="xl">
            {isProductCartItem(item) ? item.name : item.productType}
          </Text>
          <Text color="fg.muted">{item.description}</Text>
          {!isProductCartItem(item) && item.colors ? (
            <Text fontSize="sm" color="fg.muted">
              Colores: {item.colors}
            </Text>
          ) : null}
          {!isProductCartItem(item) && item.notes ? (
            <Text fontSize="sm" color="fg.muted">
              Notas: {item.notes}
            </Text>
          ) : null}
          {!isProductCartItem(item) && item.referenceImage?.url ? (
            <a
              href={item.referenceImage.url}
              target="_blank"
              rel="noreferrer"
            >
              <Text fontSize="sm" color="brand.solid">
                Ver referencia cargada
              </Text>
            </a>
          ) : null}
        </Stack>
        <Stack direction={{ base: 'column', md: 'row' }} gap="4" align="center">
          <Stack gap="1" maxW="120px">
            <Text fontWeight="700" fontSize="sm">
              Cantidad
            </Text>
            <Input
              type="number"
              min={1}
              value={item.quantity}
              onChange={(event) => onQuantityChange(Number(event.target.value))}
              bg="surface"
              borderColor="border.soft"
            />
          </Stack>
          <Box flex="1" />
          <Stack gap="1" align={{ base: 'flex-start', md: 'flex-end' }}>
            <Text fontWeight="800" color="brand.solid">
              {lineTotal === null ? 'Pendiente de cotizacion' : formatCurrency(lineTotal)}
            </Text>
            <Button variant="ghost" onClick={onRemove}>
              Quitar
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  )
}
