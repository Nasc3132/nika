import { Box, Container, HStack, Stack, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { businessConfig, navLinks } from '@/config/site'

export function Footer() {
  const navigate = useNavigate()

  return (
    <Box as="footer" py="10" borderTop="1px solid" borderColor="border.soft">
      <Container maxW="7xl">
        <Stack
          direction={{ base: 'column', lg: 'row' }}
          justify="space-between"
          gap="8"
          p={{ base: '6', md: '8' }}
          bg="surface.panel"
          borderRadius="32px"
          border="1px solid"
          borderColor="border.soft"
        >
          <Stack maxW="420px" gap="3">
            <Text fontFamily="heading" fontSize="4xl" fontWeight="700">
              Nika
            </Text>
            <Text color="fg.muted">{businessConfig.intro}</Text>
            <Text fontSize="sm" color="fg.muted">
              {businessConfig.address}
            </Text>
          </Stack>

          <Stack gap="3">
            <Text fontWeight="800">Navegacion</Text>
            {navLinks.map((link) => (
              <Text
                key={link.href}
                cursor="pointer"
                color="fg.muted"
                onClick={() => navigate(link.href)}
              >
                {link.label}
              </Text>
            ))}
          </Stack>

          <Stack gap="3">
            <Text fontWeight="800">Contacto</Text>
            <Text color="fg.muted">{businessConfig.phone}</Text>
            <Text color="fg.muted">{businessConfig.email}</Text>
            <HStack gap="2" color="fg.muted">
              <Text>WhatsApp:</Text>
              <Text>{businessConfig.whatsappNumber}</Text>
            </HStack>
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}
