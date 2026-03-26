import { describe, expect, it } from 'vitest'
import { validateCustomerInfo, validateReferenceImageFile } from '@/lib/validation'

describe('validateCustomerInfo', () => {
  it('marca campos requeridos y correos invalidos', () => {
    const errors = validateCustomerInfo({
      name: '',
      email: 'correo-invalido',
      phone: '',
      address: '',
    })

    expect(errors.name).toBeTruthy()
    expect(errors.email).toBe('Escribe un correo valido.')
    expect(errors.phone).toBeTruthy()
    expect(errors.address).toBeTruthy()
  })
})

describe('validateReferenceImageFile', () => {
  it('rechaza archivos que no son imagen', () => {
    const file = new File(['nota'], 'nota.txt', { type: 'text/plain' })

    expect(validateReferenceImageFile(file)).toBe('Solo puedes subir imagenes.')
  })
})
