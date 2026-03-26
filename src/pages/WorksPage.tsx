import { Container, Heading, Image, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { PageHero } from '@/components/PageHero'
import { workSamples } from '@/config/site'

export function WorksPage() {
  return (
    <Stack gap="10" pb="16">
      <PageHero
        eyebrow="Trabajos previos"
        title="Una muestra del tipo de encargos, escalas y acabados que ya podemos producir."
        description="Esta galeria funciona como referencia visual para aterrizar estilo, funcion, material y nivel de detalle antes de pedir algo nuevo."
      />

      <Container maxW="7xl">
        <SimpleGrid columns={{ base: 1, md: 2 }} gap="6">
          {workSamples.map((sample) => (
            <Stack
              key={sample.title}
              gap="4"
              p="5"
              bg="surface.panel"
              borderRadius="28px"
              border="1px solid"
              borderColor="border.soft"
            >
              <Image
                src={sample.image}
                alt={sample.title}
                h="300px"
                w="full"
                objectFit="cover"
                borderRadius="22px"
              />
              <Stack gap="2">
                <Text textTransform="uppercase" letterSpacing="0.18em" fontSize="xs" color="brand.solid">
                  {sample.category}
                </Text>
                <Heading fontFamily="heading" fontSize="3xl">
                  {sample.title}
                </Heading>
                <Text color="fg.muted">{sample.description}</Text>
              </Stack>
            </Stack>
          ))}
        </SimpleGrid>
      </Container>
    </Stack>
  )
}
