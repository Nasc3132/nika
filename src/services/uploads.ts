import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { isFirebaseConfigured, storage } from '@/firebase'
import { validateReferenceImageFile } from '@/lib/validation'
import type { UploadedReference } from '@/types'

function assertFirebaseConfigured() {
  if (!isFirebaseConfigured) {
    throw new Error('Configura Firebase Storage antes de subir imagenes de referencia.')
  }
}

function sanitizeFileName(fileName: string) {
  return fileName.toLowerCase().replace(/[^a-z0-9.\-_]/g, '-')
}

export async function uploadReferenceImage(file: File, draftId: string): Promise<UploadedReference> {
  assertFirebaseConfigured()

  const validationError = validateReferenceImageFile(file)
  if (validationError) {
    throw new Error(validationError)
  }

  const path = `order-references/${draftId}-${Date.now()}-${sanitizeFileName(file.name)}`
  const storageRef = ref(storage, path)

  await uploadBytes(storageRef, file, {
    contentType: file.type,
  })

  return {
    url: await getDownloadURL(storageRef),
    path,
    name: file.name,
  }
}
