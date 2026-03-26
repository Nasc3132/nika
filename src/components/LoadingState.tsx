import { Center, Spinner, Stack, Text } from '@chakra-ui/react'

interface LoadingStateProps {
  message?: string
}

export function LoadingState({ message = 'Cargando...' }: LoadingStateProps) {
  return (
    <Center py="16">
      <Stack align="center" gap="4">
        <Spinner size="lg" color="brand.solid" />
        <Text color="fg.muted">{message}</Text>
      </Stack>
    </Center>
  )
}
