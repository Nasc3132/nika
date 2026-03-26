import { Box, Container, Heading, Stack, Text } from '@chakra-ui/react'
import type { ReactNode } from 'react'

interface PageHeroProps {
  eyebrow: string
  title: string
  description: string
  actions?: ReactNode
}

export function PageHero({ eyebrow, title, description, actions }: PageHeroProps) {
  return (
    <Box py={{ base: '14', md: '20' }}>
      <Container maxW="7xl">
        <Stack
          gap="6"
          p={{ base: '6', md: '10' }}
          border="1px solid"
          borderColor="border.soft"
          bg="surface.panel"
          borderRadius="32px"
          backdropFilter="blur(18px)"
          boxShadow="0 24px 80px rgba(4, 20, 38, 0.28)"
        >
          <Text
            textTransform="uppercase"
            letterSpacing="0.28em"
            fontSize="xs"
            color="brand.solid"
            fontWeight="700"
          >
            {eyebrow}
          </Text>
          <Heading
            fontFamily="heading"
            fontWeight="600"
            fontSize={{ base: '4xl', md: '6xl' }}
            lineHeight="0.95"
            maxW="4xl"
          >
            {title}
          </Heading>
          <Text maxW="3xl" color="fg.muted" fontSize={{ base: 'md', md: 'lg' }}>
            {description}
          </Text>
          {actions ? <Box>{actions}</Box> : null}
        </Stack>
      </Container>
    </Box>
  )
}
