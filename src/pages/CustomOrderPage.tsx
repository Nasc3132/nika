import { Container, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { useSearchParams } from 'react-router-dom'
import { CustomForm } from '@/components/CustomForm'
import { PageHero } from '@/components/PageHero'

export function CustomOrderPage() {
  const [searchParams] = useSearchParams()
  const selectedProductType = searchParams.get('product') ?? undefined

  return (
    <Stack gap="10" pb="16">
      <PageHero
        eyebrow="Pedido personalizado"
        title="Cuentanos tu idea y la convertimos en un pedido claro, trazable y listo para imprimir."
        description="Este formulario alimenta el mismo carrito del catalogo. Puedes mezclar productos en stock con piezas funcionales, decorativas o personalizadas dentro del mismo envio."
      />

      <Container maxW="7xl">
        <SimpleGrid columns={{ base: 1, xl: 3 }} gap="6">
          <Stack
            gap="4"
            p={{ base: '6', md: '8' }}
            bg="surface.panel"
            borderRadius="32px"
            border="1px solid"
            borderColor="border.soft"
          >
            <Text textTransform="uppercase" letterSpacing="0.24em" fontSize="xs" color="brand.solid">
              Que pedir aqui
            </Text>
            <Text color="fg.muted">
              Funciona perfecto para llaveros personalizados, cosplay, senaletica, piezas funcionales, prototipos, lotes pequenos y refacciones que no tienen precio fijo.
            </Text>
            <Text color="fg.muted">
              Si llegaste desde el catalogo con una pieza personalizable, el tipo de producto ya viene precargado.
            </Text>
            <Text fontWeight="700">
              Consejo: comparte cantidad, medidas, material deseado y una referencia visual para agilizar la validacion.
            </Text>
          </Stack>

          <Stack gridColumn={{ base: 'auto', xl: 'span 2' }}>
            <CustomForm initialProductType={selectedProductType} />
          </Stack>
        </SimpleGrid>
      </Container>
    </Stack>
  )
}
