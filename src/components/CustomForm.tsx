import { Button, Input, SimpleGrid, Stack, Text, Textarea } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CustomerFields } from '@/components/CustomerFields'
import { FileUpload } from '@/components/FileUpload'
import { toaster } from '@/components/ui/toaster'
import { createId } from '@/lib/id'
import type { CustomerErrors, CustomOrderErrors } from '@/lib/validation'
import { validateCustomerInfo, validateCustomOrder } from '@/lib/validation'
import { useCartStore } from '@/store/cartStore'
import type { UploadedReference } from '@/types'

interface CustomFormProps {
  initialProductType?: string
}

interface CustomFormState {
  productType: string
  quantity: number
  description: string
  colors: string
  notes: string
  referenceImage: UploadedReference | null
}

export function CustomForm({ initialProductType }: CustomFormProps) {
  const navigate = useNavigate()
  const customerInfo = useCartStore((state) => state.customerInfo)
  const updateCustomerInfo = useCartStore((state) => state.updateCustomerInfo)
  const addCustomOrder = useCartStore((state) => state.addCustomOrder)

  const [draftId] = useState(() => createId('custom-draft'))
  const [customerErrors, setCustomerErrors] = useState<CustomerErrors>({})
  const [formErrors, setFormErrors] = useState<CustomOrderErrors>({})
  const [formValues, setFormValues] = useState<CustomFormState>({
    productType: initialProductType ?? '',
    quantity: 1,
    description: '',
    colors: '',
    notes: '',
    referenceImage: null,
  })

  useEffect(() => {
    if (initialProductType) {
      setFormValues((current) => ({
        ...current,
        productType: current.productType || initialProductType,
      }))
    }
  }, [initialProductType])

  function clearCustomerErrors(values: Partial<Record<string, string>>) {
    setCustomerErrors((current) => ({
      ...current,
      ...Object.fromEntries(Object.keys(values).map((key) => [key, undefined])),
    }))
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const nextCustomerErrors = validateCustomerInfo(customerInfo)
    const nextFormErrors = validateCustomOrder({
      productType: formValues.productType,
      quantity: formValues.quantity,
      description: formValues.description,
    })

    setCustomerErrors(nextCustomerErrors)
    setFormErrors(nextFormErrors)

    if (Object.keys(nextCustomerErrors).length || Object.keys(nextFormErrors).length) {
      toaster.create({
        type: 'error',
        title: 'Revisa tu pedido',
        description: 'Faltan datos para guardar tu pedido personalizado.',
        closable: true,
      })
      return
    }

    addCustomOrder({
      productType: formValues.productType.trim(),
      quantity: formValues.quantity,
      description: formValues.description.trim(),
      colors: formValues.colors.trim(),
      notes: formValues.notes.trim(),
      referenceImage: formValues.referenceImage,
    })

    setFormValues({
      productType: initialProductType ?? '',
      quantity: 1,
      description: '',
      colors: '',
      notes: '',
      referenceImage: null,
    })

    toaster.create({
      type: 'success',
      title: 'Pedido personalizado agregado',
      description: 'Ya puedes revisarlo dentro del carrito antes de enviarlo.',
      closable: true,
      action: {
        label: 'Ver carrito',
        onClick: () => navigate('/carrito'),
      },
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack
        gap="8"
        p={{ base: '6', md: '8' }}
        borderRadius="32px"
        bg="surface.panel"
        border="1px solid"
        borderColor="border.soft"
      >
        <CustomerFields
          value={customerInfo}
          errors={customerErrors}
          onChange={(values) => {
            clearCustomerErrors(values)
            updateCustomerInfo(values)
          }}
        />

        <Stack gap="5">
          <Stack gap="1">
            <Text fontWeight="800" fontSize="lg">
              Personaliza tu pedido
            </Text>
            <Text color="fg.muted" fontSize="sm">
              Cuanto mas detalle nos compartas, mas rapido podremos validarte material, tiempos y costo.
            </Text>
          </Stack>

          <SimpleGrid columns={{ base: 1, md: 2 }} gap="4">
            <Stack gap="2">
              <Text fontWeight="700" fontSize="sm">
                Tipo de producto *
              </Text>
              <Input
                value={formValues.productType}
                onChange={(event) => {
                  setFormValues((current) => ({ ...current, productType: event.target.value }))
                  setFormErrors((current) => ({ ...current, productType: undefined }))
                }}
                placeholder="Ej. Soporte personalizado para control"
                bg="surface"
                borderColor="border.soft"
              />
              {formErrors.productType ? (
                <Text color="red.500" fontSize="sm">
                  {formErrors.productType}
                </Text>
              ) : null}
            </Stack>

            <Stack gap="2">
              <Text fontWeight="700" fontSize="sm">
                Cantidad *
              </Text>
              <Input
                type="number"
                min={1}
                value={formValues.quantity}
                onChange={(event) => {
                  setFormValues((current) => ({
                    ...current,
                    quantity: Math.max(1, Number(event.target.value) || 1),
                  }))
                  setFormErrors((current) => ({ ...current, quantity: undefined }))
                }}
                bg="surface"
                borderColor="border.soft"
              />
              {formErrors.quantity ? (
                <Text color="red.500" fontSize="sm">
                  {formErrors.quantity}
                </Text>
              ) : null}
            </Stack>
          </SimpleGrid>

          <Stack gap="2">
            <Text fontWeight="700" fontSize="sm">
              Descripcion del pedido *
            </Text>
            <Textarea
              value={formValues.description}
              onChange={(event) => {
                setFormValues((current) => ({ ...current, description: event.target.value }))
                setFormErrors((current) => ({ ...current, description: undefined }))
              }}
              placeholder="Describe medidas, uso, material, acabado, texto, escala o cualquier detalle importante."
              rows={5}
              bg="surface"
              borderColor="border.soft"
            />
            {formErrors.description ? (
              <Text color="red.500" fontSize="sm">
                {formErrors.description}
              </Text>
            ) : null}
          </Stack>

          <SimpleGrid columns={{ base: 1, md: 2 }} gap="4">
            <Stack gap="2">
              <Text fontWeight="700" fontSize="sm">
                Colores
              </Text>
              <Input
                value={formValues.colors}
                onChange={(event) =>
                  setFormValues((current) => ({ ...current, colors: event.target.value }))
                }
                placeholder="Negro mate, blanco hueso, rojo, marmoleado..."
                bg="surface"
                borderColor="border.soft"
              />
            </Stack>

            <Stack gap="2">
              <Text fontWeight="700" fontSize="sm">
                Notas extra
              </Text>
              <Textarea
                value={formValues.notes}
                onChange={(event) =>
                  setFormValues((current) => ({ ...current, notes: event.target.value }))
                }
                placeholder="Fecha limite, logo, tolerancias, acabado, empaque..."
                rows={3}
                bg="surface"
                borderColor="border.soft"
              />
            </Stack>
          </SimpleGrid>

          <FileUpload
            draftId={draftId}
            value={formValues.referenceImage}
            onUploaded={(referenceImage) =>
              setFormValues((current) => ({ ...current, referenceImage }))
            }
          />
        </Stack>

        <Stack direction={{ base: 'column', md: 'row' }} gap="3">
          <Button type="submit" colorPalette="orange">
            Guardar en el carrito
          </Button>
          <Button variant="outline" borderColor="border.soft" onClick={() => navigate('/carrito')}>
            Revisar carrito
          </Button>
        </Stack>
      </Stack>
    </form>
  )
}
