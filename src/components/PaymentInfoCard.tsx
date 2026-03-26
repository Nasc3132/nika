import { Box, Stack, Text } from '@chakra-ui/react'
import { paymentConfig } from '@/config/site'
import { formatCurrency } from '@/lib/formatters'
import type { CartSummary } from '@/types'

interface PaymentInfoCardProps {
  summary?: CartSummary | null
}

export function PaymentInfoCard({ summary }: PaymentInfoCardProps) {
  const canUseEstimatedTotal = Boolean(summary && !summary.hasPendingQuote && summary.pricedSubtotal > 0)

  return (
    <Stack
      gap="4"
      p="6"
      borderRadius="28px"
      bg="surface.panel"
      border="1px solid"
      borderColor="border.soft"
    >
      <Stack gap="1">
        <Text fontWeight="800" fontSize="xl">
          Instrucciones de pago
        </Text>
        <Text color="fg.muted">
          {canUseEstimatedTotal
            ? `Puedes usar el subtotal estimado de ${formatCurrency(summary!.pricedSubtotal)} como referencia inicial.`
            : 'Si tu pedido tiene piezas por cotizar, espera nuestra confirmacion antes de transferir.'}
        </Text>
      </Stack>

      <Box p="4" borderRadius="22px" bg="surface.muted">
        <Stack gap="2">
          <Text fontWeight="700">Banco: {paymentConfig.bankName}</Text>
          <Text>Titular: {paymentConfig.accountHolder}</Text>
          <Text>Cuenta / CLABE: {paymentConfig.accountNumber}</Text>
        </Stack>
      </Box>

      <Stack gap="2">
        {paymentConfig.instructions.map((instruction) => (
          <Text key={instruction} fontSize="sm" color="fg.muted">
            • {instruction}
          </Text>
        ))}
      </Stack>
    </Stack>
  )
}
