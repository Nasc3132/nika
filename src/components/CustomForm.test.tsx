import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it } from 'vitest'
import { CustomForm } from '@/components/CustomForm'
import { Provider } from '@/components/ui/provider'
import { useCartStore } from '@/store/cartStore'

function renderCustomForm(initialProductType?: string) {
  return render(
    <Provider>
      <MemoryRouter>
        <CustomForm initialProductType={initialProductType} />
      </MemoryRouter>
    </Provider>,
  )
}

describe('CustomForm', () => {
  beforeEach(() => {
    useCartStore.setState({
      items: [],
      customerInfo: {
        name: '',
        email: '',
        phone: '',
        address: '',
      },
      lastSubmittedOrder: null,
    })
  })

  it('muestra errores cuando faltan campos obligatorios', async () => {
    const user = userEvent.setup()
    renderCustomForm()

    await user.click(screen.getByRole('button', { name: /guardar en el carrito/i }))

    expect(screen.getByText('Ingresa tu nombre.')).toBeInTheDocument()
    expect(screen.getByText('Ingresa tu correo.')).toBeInTheDocument()
    expect(
      screen.getByText('Selecciona o escribe el tipo de producto.'),
    ).toBeInTheDocument()
    expect(
      screen.getByText('Describe tu pedido para poder cotizarlo.'),
    ).toBeInTheDocument()
  })

  it('agrega un pedido personalizado al store cuando el formulario es valido', async () => {
    const user = userEvent.setup()
    renderCustomForm('Mascara cosplay')

    await user.type(screen.getByPlaceholderText('Ej. Andrea Lopez'), 'Andrea')
    await user.type(screen.getByPlaceholderText('hola@correo.com'), 'andrea@example.com')
    await user.type(screen.getByPlaceholderText('+52 55 1234 5678'), '5512345678')
    await user.type(
      screen.getByPlaceholderText('Colonia, calle, ciudad y referencias'),
      'Matamoros',
    )
    await user.clear(screen.getByPlaceholderText('Ej. Soporte personalizado para control'))
    await user.type(
      screen.getByPlaceholderText('Ej. Soporte personalizado para control'),
      'Mascara cosplay',
    )
    const quantityInput = screen.getByRole('spinbutton')
    fireEvent.change(quantityInput, { target: { value: '3' } })
    await user.type(
      screen.getByPlaceholderText(
        'Describe medidas, uso, material, acabado, texto, escala o cualquier detalle importante.',
      ),
      'Con acabado negro mate y ajuste para adulto.',
    )

    await user.click(screen.getByRole('button', { name: /guardar en el carrito/i }))

    const state = useCartStore.getState()
    expect(state.items).toHaveLength(1)
    expect(state.items[0]?.type).toBe('custom')
    if (state.items[0]?.type === 'custom') {
      expect(state.items[0].productType).toBe('Mascara cosplay')
      expect(state.items[0].quantity).toBe(3)
    }
  })
})
