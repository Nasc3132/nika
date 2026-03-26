import { Box, Container, Stack, Text } from '@chakra-ui/react'
import { PageHero } from '@/components/PageHero'
import { faqItems } from '@/config/site'

export function FaqPage() {
  return (
    <Stack gap="10" pb="16">
      <PageHero
        eyebrow="FAQ"
        title="Dudas frecuentes antes de mandar a imprimir tu pedido."
        description="Respuestas breves para entender materiales, personalizacion, cotizacion y pago manual dentro del MVP."
      />

      <Container maxW="5xl">
        <Stack gap="4">
          {faqItems.map((item) => (
            <Box
              key={item.question}
              as="details"
              p="6"
              borderRadius="26px"
              bg="surface.panel"
              border="1px solid"
              borderColor="border.soft"
            >
              <Text as="summary" fontWeight="800" cursor="pointer">
                {item.question}
              </Text>
              <Text color="fg.muted" mt="4">
                {item.answer}
              </Text>
            </Box>
          ))}
        </Stack>
      </Container>
    </Stack>
  )
}
