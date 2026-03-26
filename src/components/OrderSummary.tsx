import { Box, Button, Stack, Text } from '@chakra-ui/react'
import { formatCurrency, formatPieces } from '@/lib/formatters'
import { getLineTotal, isProductCartItem, summarizeCart } from '@/lib/order'
import type { CartItem } from '@/types'

interface OrderSummaryProps {
  items: CartItem[]
  isSubmitting?: boolean
  submitLabel?: string
  onSubmit?: () => void
}

export function OrderSummary({
  items,
  isSubmitting,
  submitLabel = 'Enviar pedido',
  onSubmit,
}: OrderSummaryProps) {
  const summary = summarizeCart(items)

  return (
    <Stack
      gap="5"
      p="6"
      borderRadius="28px"
      bg="surface.panel"
      border="1px solid"
      borderColor="border.soft"
      position={{ base: 'static', lg: 'sticky' }}
      top="120px"
    >
      <Stack gap="1">
        <Text fontWeight="800" fontSize="xl">
          Resumen del pedido
        </Text>
        <Text color="fg.muted" fontSize="sm">
          Este resumen mezcla piezas con precio estimado y piezas por validar manualmente.
        </Text>
      </Stack>

      <Stack gap="3">
        {items.map((item) => {
          const lineTotal = getLineTotal(item)

          return (
            <Stack key={item.id} direction="row" justify="space-between" gap="4">
              <Box>
                <Text fontWeight="700">
                  {isProductCartItem(item) ? item.name : item.productType}
                </Text>
                <Text fontSize="sm" color="fg.muted">
                  {formatPieces(item.quantity)}
                </Text>
              </Box>
              <Text fontWeight="700">
                {lineTotal === null ? 'A cotizar' : formatCurrency(lineTotal)}
              </Text>
            </Stack>
          )
        })}
      </Stack>

      <Box h="1px" bg="border.soft" />

      <Stack gap="2">
        <Stack direction="row" justify="space-between">
          <Text color="fg.muted">Total de piezas</Text>
          <Text fontWeight="800">{summary.totalItems}</Text>
        </Stack>
        <Stack direction="row" justify="space-between">
          <Text color="fg.muted">Subtotal estimado</Text>
          <Text fontWeight="800">
            {summary.pricedSubtotal > 0 ? formatCurrency(summary.pricedSubtotal) : 'Sin monto fijo'}
          </Text>
        </Stack>
        <Stack direction="row" justify="space-between">
          <Text color="fg.muted">Pendientes de cotizacion</Text>
          <Text fontWeight="800">{summary.itemsPendingQuote}</Text>
        </Stack>
      </Stack>

      {summary.hasPendingQuote ? (
        <Box p="4" borderRadius="20px" bg="surface.muted">
          <Text fontSize="sm" color="fg.muted">
            Tu pedido incluye piezas que necesitan validacion manual antes del pago final.
          </Text>
        </Box>
      ) : null}

      {onSubmit ? (
        <Button
          colorPalette="orange"
          loading={isSubmitting}
          onClick={onSubmit}
          disabled={items.length === 0}
        >
          {submitLabel}
        </Button>
      ) : null}
    </Stack>
  )
}
