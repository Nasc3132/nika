import { Box, Button, Container, Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { PageHero } from '@/components/PageHero'
import { businessConfig, homeHighlights, processSteps } from '@/config/site'

export function HomePage() {
  const navigate = useNavigate()

  return (
    <Stack gap={{ base: '10', md: '16' }} pb="16">
      <PageHero
        eyebrow="Nika 3D"
        title="Impresion 3D para piezas utiles, regalos, negocio, cosplay y pedidos personalizados."
        description="Nika mezcla catalogo, personalizacion y seguimiento manual para que cada pedido llegue con contexto, referencias y una conversacion clara antes de imprimir y cobrar."
        actions={
          <Stack direction={{ base: 'column', sm: 'row' }} gap="3">
            <Button colorPalette="orange" onClick={() => navigate('/catalogo')}>
              Explorar catalogo
            </Button>
            <Button variant="outline" borderColor="border.soft" onClick={() => navigate('/arma-tu-pedido')}>
              Armar pedido personalizado
            </Button>
          </Stack>
        }
      />

      <Container maxW="7xl">
        <SimpleGrid columns={{ base: 1, md: 3 }} gap="5">
          {homeHighlights.map((highlight) => (
            <Stack
              key={highlight.title}
              gap="3"
              p="6"
              bg="surface.panel"
              borderRadius="28px"
              border="1px solid"
              borderColor="border.soft"
            >
              <Heading fontFamily="heading" fontSize="3xl">
                {highlight.title}
              </Heading>
              <Text color="fg.muted">{highlight.description}</Text>
            </Stack>
          ))}
        </SimpleGrid>
      </Container>

      <Container maxW="7xl">
        <SimpleGrid columns={{ base: 1, lg: 2 }} gap="6">
          <Stack
            gap="5"
            p={{ base: '6', md: '8' }}
            bg="surface.panel"
            borderRadius="32px"
            border="1px solid"
            borderColor="border.soft"
          >
            <Text textTransform="uppercase" letterSpacing="0.24em" fontSize="xs" color="brand.solid">
              Nuestra promesa
            </Text>
            <Heading fontFamily="heading" fontSize={{ base: '4xl', md: '5xl' }}>
              Tu pedido no se pierde entre cotizaciones sueltas y mensajes sueltos.
            </Heading>
            <Text color="fg.muted">{businessConfig.intro}</Text>
            <Box h="180px" borderRadius="28px" bg="hero.glow" />
          </Stack>

          <Stack
            gap="4"
            p={{ base: '6', md: '8' }}
            bg="surface.panel"
            borderRadius="32px"
            border="1px solid"
            borderColor="border.soft"
          >
            <Text textTransform="uppercase" letterSpacing="0.24em" fontSize="xs" color="brand.solid">
              Asi funciona
            </Text>
            {processSteps.map((step, index) => (
              <Stack key={step} direction="row" gap="4" align="flex-start">
                <Box
                  minW="42px"
                  h="42px"
                  borderRadius="full"
                  bg="brand.solid"
                  color="brand.contrast"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  fontWeight="800"
                >
                  {index + 1}
                </Box>
                <Text color="fg.muted">{step}</Text>
              </Stack>
            ))}
          </Stack>
        </SimpleGrid>
      </Container>
    </Stack>
  )
}
