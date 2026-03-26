import { Box, Button, Heading, Stack, Text } from '@chakra-ui/react'

interface EmptyStateProps {
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
}

export function EmptyState({ title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <Stack
      gap="4"
      align="flex-start"
      p={{ base: '6', md: '8' }}
      border="1px dashed"
      borderColor="border.soft"
      bg="surface.muted"
      borderRadius="28px"
    >
      <Heading fontFamily="heading" fontSize={{ base: '2xl', md: '3xl' }}>
        {title}
      </Heading>
      <Text color="fg.muted" maxW="lg">
        {description}
      </Text>
      {actionLabel && onAction ? (
        <Button colorPalette="brand" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
      <Box w="full" h="1" bg="hero.glow" borderRadius="full" />
    </Stack>
  )
}
