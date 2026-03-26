import { Box, Button, Container, HStack, Stack, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { PageHero } from '@/components/PageHero'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { businessConfig } from '@/config/site'
import { buildWhatsAppUrl } from '@/lib/order'

export function ContactPage() {
  const navigate = useNavigate()
  const whatsappUrl = buildWhatsAppUrl(
    businessConfig.whatsappNumber,
    'Hola, quiero mas informacion sobre un pedido en Nika.',
  )

  return (
    <Stack gap="10" pb="16">
      <PageHero
        eyebrow="Contacto"
        title="Hablemos de tu idea, tu prototipo o la pieza 3D que necesitas."
        description="Si aun no armaste tu carrito, tambien puedes escribirnos para revisar disponibilidad, materiales, fechas o una propuesta personalizada."
      />

      <Container maxW="6xl">
        <HStack align="stretch" gap="6" flexWrap="wrap">
          <Stack
            flex="1 1 320px"
            gap="4"
            p={{ base: '6', md: '8' }}
            bg="surface.panel"
            borderRadius="32px"
            border="1px solid"
            borderColor="border.soft"
          >
            <Text fontWeight="800" fontSize="xl">
              Canales directos
            </Text>
            <Text color="fg.muted">WhatsApp: {businessConfig.whatsappNumber}</Text>
            <Text color="fg.muted">Correo: {businessConfig.email}</Text>
            <Text color="fg.muted">Telefono: {businessConfig.phone}</Text>
            <Text color="fg.muted">Ubicacion: {businessConfig.address}</Text>
            <Stack direction={{ base: 'column', sm: 'row' }} gap="3">
              <WhatsAppButton url={whatsappUrl} label="Escribir por WhatsApp" />
              <Button variant="outline" borderColor="border.soft" onClick={() => navigate('/arma-tu-pedido')}>
                Armar pedido
              </Button>
            </Stack>
          </Stack>

          <Box
            flex="1 1 320px"
            p={{ base: '6', md: '8' }}
            bg="surface.muted"
            borderRadius="32px"
          >
            <Stack gap="4">
              <Text textTransform="uppercase" letterSpacing="0.24em" fontSize="xs" color="brand.solid">
                Antes de escribir
              </Text>
              <Text color="fg.muted">
                Si ya sabes lo que necesitas, lo mas rapido es usar el formulario de pedido personalizado y luego enviarlo desde el carrito.
              </Text>
              <Text color="fg.muted">
                Si todavia estas explorando, puedes revisar el catalogo por categorias para mezclar productos listos con piezas hechas a medida.
              </Text>
            </Stack>
          </Box>
        </HStack>
      </Container>
    </Stack>
  )
}
