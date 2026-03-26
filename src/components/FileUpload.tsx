import { Button, HStack, Image, Input, Stack, Text } from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { LuImagePlus, LuTrash2 } from 'react-icons/lu'
import { toaster } from '@/components/ui/toaster'
import { createId } from '@/lib/id'
import { uploadReferenceImage } from '@/services/uploads'
import type { UploadedReference } from '@/types'

interface FileUploadProps {
  value: UploadedReference | null
  draftId?: string
  onUploaded: (value: UploadedReference | null) => void
}

export function FileUpload({ value, draftId, onUploaded }: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    event.target.value = ''

    if (!file) {
      return
    }

    setIsUploading(true)

    try {
      const uploaded = await uploadReferenceImage(file, draftId ?? createId('draft'))
      onUploaded(uploaded)
      toaster.create({
        type: 'success',
        title: 'Imagen cargada',
        description: 'Tu referencia ya quedo adjunta al pedido.',
        closable: true,
      })
    } catch (error) {
      toaster.create({
        type: 'error',
        title: 'No pudimos subir la imagen',
        description: error instanceof Error ? error.message : 'Intentalo de nuevo.',
        closable: true,
      })
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <Stack gap="3">
      <Text fontWeight="700" fontSize="sm">
        Imagen de referencia
      </Text>
      <Text fontSize="sm" color="fg.muted">
        Sube una imagen para guiarnos mejor. Aceptamos JPG, PNG o WebP de hasta 5 MB.
      </Text>
      <Input
        ref={inputRef}
        type="file"
        accept="image/*"
        display="none"
        onChange={handleFileChange}
      />
      <HStack gap="3" flexWrap="wrap">
        <Button
          variant="outline"
          borderColor="border.soft"
          onClick={() => inputRef.current?.click()}
          loading={isUploading}
        >
          <LuImagePlus />
          {value ? 'Reemplazar imagen' : 'Subir imagen'}
        </Button>
        {value ? (
          <Button variant="ghost" onClick={() => onUploaded(null)}>
            <LuTrash2 />
            Quitar
          </Button>
        ) : null}
      </HStack>
      {value ? (
        <Stack
          direction={{ base: 'column', md: 'row' }}
          gap="4"
          p="4"
          bg="surface.muted"
          borderRadius="24px"
          border="1px solid"
          borderColor="border.soft"
        >
          <Image
            src={value.url}
            alt={value.name}
            objectFit="cover"
            w={{ base: 'full', md: '120px' }}
            h={{ base: '200px', md: '120px' }}
            borderRadius="18px"
          />
          <Stack gap="1" justify="center">
            <Text fontWeight="700">{value.name}</Text>
            <Text fontSize="sm" color="fg.muted">
              Imagen lista para enviarse junto al pedido personalizado.
            </Text>
            <a href={value.url} target="_blank" rel="noreferrer">
              <Text fontSize="sm" color="brand.solid">
                Ver archivo
              </Text>
            </a>
          </Stack>
        </Stack>
      ) : null}
    </Stack>
  )
}
