import { Button, Container, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CartItem } from '@/components/CartItem'
import { CustomerFields } from '@/components/CustomerFields'
import { EmptyState } from '@/components/EmptyState'
import { OrderSummary } from '@/components/OrderSummary'
import { PageHero } from '@/components/PageHero'
import { toaster } from '@/components/ui/toaster'
import { businessConfig } from '@/config/site'
import { buildWhatsAppMessage, buildWhatsAppUrl, summarizeCart } from '@/lib/order'
import type { CustomerErrors } from '@/lib/validation'
import { validateCustomerInfo } from '@/lib/validation'
import { submitOrder } from '@/services/orders'
import { useCartStore } from '@/store/cartStore'

export function CartPage() {
  const navigate = useNavigate()
  const items = useCartStore((state) => state.items)
  const customerInfo = useCartStore((state) => state.customerInfo)
  const updateCustomerInfo = useCartStore((state) => state.updateCustomerInfo)
  const updateItemQuantity = useCartStore((state) => state.updateItemQuantity)
  const removeItem = useCartStore((state) => state.removeItem)
  const clearCart = useCartStore((state) => state.clearCart)
  const setLastSubmittedOrder = useCartStore((state) => state.setLastSubmittedOrder)
  const [customerErrors, setCustomerErrors] = useState<CustomerErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const summary = summarizeCart(items)

  async function handleSubmit() {
    if (items.length === 0) {
      toaster.create({
        type: 'error',
        title: 'Tu carrito esta vacio',
        description: 'Agrega productos o un pedido personalizado antes de enviar.',
        closable: true,
      })
      return
    }

    const nextCustomerErrors = validateCustomerInfo(customerInfo)
    setCustomerErrors(nextCustomerErrors)

    if (Object.keys(nextCustomerErrors).length) {
      toaster.create({
        type: 'error',
        title: 'Faltan tus datos',
        description: 'Completa tus datos de contacto antes de enviar el pedido.',
        closable: true,
      })
      return
    }

    setIsSubmitting(true)

    try {
      const result = await submitOrder(customerInfo, items)
      const message = buildWhatsAppMessage({
        customer: customerInfo,
        items,
        summary: result.summary,
      })
      const whatsappUrl = buildWhatsAppUrl(businessConfig.whatsappNumber, message)

      setLastSubmittedOrder({
        orderId: result.orderId,
        customer: customerInfo,
        items,
        summary: result.summary,
        whatsappUrl,
        createdAt: new Date().toISOString(),
      })

      clearCart()
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
      navigate(`/pedido-enviado?orderId=${result.orderId}`)
    } catch (error) {
      toaster.create({
        type: 'error',
        title: 'No pudimos enviar tu pedido',
        description: error instanceof Error ? error.message : 'Intentalo de nuevo.',
        closable: true,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Stack gap="10" pb="16">
      <PageHero
        eyebrow="Carrito"
        title="Revisa cantidades, confirma tus datos y envia tu pedido para validacion manual."
        description="Al enviar, guardamos la orden en Firestore, abrimos WhatsApp con el resumen y te mostramos instrucciones de pago."
      />

      <Container maxW="7xl">
        {items.length === 0 ? (
          <Stack gap="5">
            <EmptyState
              title="Tu carrito esta vacio"
              description="Empieza desde el catalogo o agrega una solicitud personalizada para preparar tu pedido."
            />
            <Stack direction={{ base: 'column', sm: 'row' }} gap="3">
              <Button colorPalette="orange" onClick={() => navigate('/catalogo')}>
                Ver catalogo
              </Button>
              <Button variant="outline" borderColor="border.soft" onClick={() => navigate('/arma-tu-pedido')}>
                Crear pedido personalizado
              </Button>
            </Stack>
          </Stack>
        ) : (
          <SimpleGrid columns={{ base: 1, xl: 3 }} gap="6">
            <Stack gap="6" gridColumn={{ base: 'auto', xl: 'span 2' }}>
              <Stack gap="4">
                {items.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onQuantityChange={(quantity) => updateItemQuantity(item.id, quantity)}
                    onRemove={() => removeItem(item.id)}
                  />
                ))}
              </Stack>

              <Stack
                gap="6"
                p={{ base: '6', md: '8' }}
                bg="surface.panel"
                borderRadius="32px"
                border="1px solid"
                borderColor="border.soft"
              >
                <CustomerFields
                  value={customerInfo}
                  errors={customerErrors}
                  title="Confirma tus datos"
                  description="Usaremos esta informacion para validar disponibilidad, pago y entrega."
                  onChange={(values) => {
                    setCustomerErrors((current) => ({
                      ...current,
                      ...Object.fromEntries(Object.keys(values).map((key) => [key, undefined])),
                    }))
                    updateCustomerInfo(values)
                  }}
                />
                <Text fontSize="sm" color="fg.muted">
                  Total de piezas en tu pedido: {summary.totalItems}. Si alguna pieza esta pendiente de cotizacion, te avisaremos el monto final antes de pagar.
                </Text>
              </Stack>
            </Stack>

            <OrderSummary items={items} isSubmitting={isSubmitting} onSubmit={handleSubmit} />
          </SimpleGrid>
        )}
      </Container>
    </Stack>
  )
}
