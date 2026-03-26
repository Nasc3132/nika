import type { CustomerInfo } from '@/types'

export interface CustomOrderValues {
  productType: string
  quantity: number
  description: string
}

export type CustomerErrors = Partial<Record<keyof CustomerInfo, string>>
export type CustomOrderErrors = Partial<Record<keyof CustomOrderValues, string>>

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const MAX_REFERENCE_IMAGE_SIZE = 5 * 1024 * 1024

export function validateCustomerInfo(customer: CustomerInfo): CustomerErrors {
  const errors: CustomerErrors = {}

  if (!customer.name.trim()) {
    errors.name = 'Ingresa tu nombre.'
  }

  if (!customer.email.trim()) {
    errors.email = 'Ingresa tu correo.'
  } else if (!emailPattern.test(customer.email)) {
    errors.email = 'Escribe un correo valido.'
  }

  if (!customer.phone.trim()) {
    errors.phone = 'Ingresa tu telefono.'
  }

  if (!customer.address.trim()) {
    errors.address = 'Ingresa tu direccion.'
  }

  return errors
}

export function validateCustomOrder(values: CustomOrderValues): CustomOrderErrors {
  const errors: CustomOrderErrors = {}

  if (!values.productType.trim()) {
    errors.productType = 'Selecciona o escribe el tipo de producto.'
  }

  if (!Number.isFinite(values.quantity) || values.quantity < 1) {
    errors.quantity = 'La cantidad debe ser de al menos 1.'
  }

  if (!values.description.trim()) {
    errors.description = 'Describe tu pedido para poder cotizarlo.'
  }

  return errors
}

export function validateReferenceImageFile(file: File) {
  if (!file.type.startsWith('image/')) {
    return 'Solo puedes subir imagenes.'
  }

  if (file.size > MAX_REFERENCE_IMAGE_SIZE) {
    return 'La imagen supera el limite de 5 MB.'
  }

  return null
}
