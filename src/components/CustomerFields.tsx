import { Input, SimpleGrid, Stack, Text, Textarea } from '@chakra-ui/react'
import type { ChangeEvent, ReactNode } from 'react'
import type { CustomerInfo } from '@/types'
import type { CustomerErrors } from '@/lib/validation'

interface CustomerFieldsProps {
  value: CustomerInfo
  errors?: CustomerErrors
  title?: string
  description?: string
  onChange: (values: Partial<CustomerInfo>) => void
}

interface FieldProps {
  label: string
  required?: boolean
  error?: string
  children: ReactNode
}

function FieldBlock({ label, required, error, children }: FieldProps) {
  return (
    <Stack gap="2">
      <Text fontWeight="700" fontSize="sm">
        {label}
        {required ? ' *' : ''}
      </Text>
      {children}
      {error ? (
        <Text color="red.500" fontSize="sm">
          {error}
        </Text>
      ) : null}
    </Stack>
  )
}

export function CustomerFields({
  value,
  errors,
  title = 'Tus datos',
  description = 'Estos datos se usaran para validar el pedido y enviarte instrucciones.',
  onChange,
}: CustomerFieldsProps) {
  function handleInput(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value: fieldValue } = event.target
    onChange({ [name]: fieldValue })
  }

  return (
    <Stack gap="5">
      <Stack gap="1">
        <Text fontWeight="800" fontSize="lg">
          {title}
        </Text>
        <Text color="fg.muted" fontSize="sm">
          {description}
        </Text>
      </Stack>
      <SimpleGrid columns={{ base: 1, md: 2 }} gap="4">
        <FieldBlock label="Nombre" required error={errors?.name}>
          <Input
            name="name"
            value={value.name}
            onChange={handleInput}
            placeholder="Ej. Andrea Lopez"
            bg="surface"
            borderColor="border.soft"
          />
        </FieldBlock>
        <FieldBlock label="Correo" required error={errors?.email}>
          <Input
            name="email"
            type="email"
            value={value.email}
            onChange={handleInput}
            placeholder="hola@correo.com"
            bg="surface"
            borderColor="border.soft"
          />
        </FieldBlock>
        <FieldBlock label="Telefono" required error={errors?.phone}>
          <Input
            name="phone"
            value={value.phone}
            onChange={handleInput}
            placeholder="+52 55 1234 5678"
            bg="surface"
            borderColor="border.soft"
          />
        </FieldBlock>
        <FieldBlock label="Direccion" required error={errors?.address}>
          <Textarea
            name="address"
            value={value.address}
            onChange={handleInput}
            placeholder="Colonia, calle, ciudad y referencias"
            bg="surface"
            borderColor="border.soft"
            rows={3}
          />
        </FieldBlock>
      </SimpleGrid>
    </Stack>
  )
}
