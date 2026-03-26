import { Button, Container, Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { OrderSummary } from '@/components/OrderSummary'
import { PageHero } from '@/components/PageHero'
import { PaymentInfoCard } from '@/components/PaymentInfoCard'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { formatDate } from '@/lib/formatters'
import { useCartStore } from '@/store/cartStore'

export function OrderSuccessPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const orderId = searchParams.get('orderId')
  const lastSubmittedOrder = useCartStore((state) => state.lastSubmittedOrder)
  const snapshot =
    lastSubmittedOrder && lastSubmittedOrder.orderId === orderId
      ? lastSubmittedOrder
      : null

  return (
    <Stack gap="10" pb="16">
      <PageHero
        eyebrow="Pedido enviado"
        title="Tu pedido ya quedo registrado y listo para validacion."
        description="Conservamos la app abierta para mostrarte el resumen y las instrucciones mientras WhatsApp se abre en otra pestaña."
      />

      <Container maxW="7xl">
        <SimpleGrid columns={{ base: 1, xl: 3 }} gap="6">
          <Stack
            gap="6"
            gridColumn={{ base: 'auto', xl: 'span 2' }}
            p={{ base: '6', md: '8' }}
            bg="surface.panel"
            borderRadius="32px"
            border="1px solid"
            borderColor="border.soft"
          >
            <Stack gap="2">
              <Text textTransform="uppercase" letterSpacing="0.24em" fontSize="xs" color="brand.solid">
                Confirmacion
              </Text>
              <Heading fontFamily="heading" fontSize={{ base: '4xl', md: '5xl' }}>
                Pedido enviado
              </Heading>
              <Text color="fg.muted">Numero de pedido: {orderId ?? 'pendiente'}</Text>
              {snapshot ? (
                <Text color="fg.muted">Enviado el {formatDate(snapshot.createdAt)}</Text>
              ) : null}
            </Stack>

            <Text color="fg.muted">
              {snapshot
                ? 'Te recomendamos continuar la conversacion por WhatsApp para compartir dudas, comprobante y tiempos.'
                : 'Si recargaste esta pantalla y no encontramos el detalle local del pedido, conserva tu numero de pedido y continua la conversacion por WhatsApp.'}
            </Text>

            <Stack direction={{ base: 'column', sm: 'row' }} gap="3">
              <WhatsAppButton
                url={snapshot?.whatsappUrl}
                label="Reenviar resumen por WhatsApp"
              />
              <Button variant="outline" borderColor="border.soft" onClick={() => navigate('/catalogo')}>
                Seguir explorando
              </Button>
            </Stack>

            {snapshot ? <OrderSummary items={snapshot.items} /> : null}
          </Stack>

          <PaymentInfoCard summary={snapshot?.summary ?? null} />
        </SimpleGrid>
      </Container>
    </Stack>
  )
}
