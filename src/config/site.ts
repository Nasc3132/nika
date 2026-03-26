import type { PaymentConfig } from '@/types'

function buildShowcaseImage(label: string) {
  const text = encodeURIComponent(`Nika 3D | ${label}`)
  return `https://placehold.co/1200x900/EADFD0/2C211B?text=${text}`
}

export const businessConfig = {
  name: 'Nika',
  whatsappNumber: '8671236658',
  email: 'hola@nika.mx',
  phone: '+52 55 1234 5678',
  address: 'Matamoros, Tamaulipas, Mexico',
  intro:
    'Disenamos e imprimimos piezas funcionales, decorativas y personalizadas en 3D. Cada pedido se revisa contigo para confirmar material, acabado, tiempos y monto final.',
}

export const paymentConfig: PaymentConfig = {
  bankName: 'BBVA',
  accountHolder: 'Nika 3D Studio',
  accountNumber: '012345678901234567',
  instructions: [
    'Espera nuestra confirmacion si tu pedido incluye piezas personalizadas, prototipos o productos marcados como cotizacion.',
    'Cuando validemos material, tiempo de impresion y acabado final, comparte tu comprobante por WhatsApp junto con tu numero de pedido.',
    'Si todas tus piezas ya muestran precio estimado, puedes usar ese monto como referencia inicial antes de la validacion final.',
  ],
}

export const navLinks = [
  { label: 'Inicio', href: '/' },
  { label: 'Catalogo', href: '/catalogo' },
  { label: 'Arma tu pedido', href: '/arma-tu-pedido' },
  { label: 'Trabajos', href: '/trabajos' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contacto', href: '/contacto' },
]

export const homeHighlights = [
  {
    title: 'Catalogo 3D por categorias',
    description:
      'Explora regalos, cosplay, organizacion, gaming, hogar, negocio y refacciones desde un mismo catalogo.',
  },
  {
    title: 'Piezas utiles y personalizadas',
    description:
      'Describe tu idea, comparte medidas, acabados, colores o referencias y convertimos todo en un pedido claro.',
  },
  {
    title: 'Confirmacion humana',
    description:
      'El pedido llega por Firestore y WhatsApp para validar detalles, tiempos de impresion y pago sin checkout automatico.',
  },
]

export const processSteps = [
  'Exploras el catalogo por categoria o armas un pedido especial desde cero.',
  'Guardas productos y piezas personalizadas en el mismo carrito.',
  'Envias tu pedido, se registra en Firestore y se abre el resumen por WhatsApp.',
  'Nika valida material, acabado, tiempo de entrega y forma de pago.',
]

export const faqItems = [
  {
    question: 'Que tipo de piezas imprimen en 3D?',
    answer:
      'Trabajamos piezas funcionales, decorativas, corporativas y personalizadas: desde llaveros, organizadores y macetas hasta cosplay, senaletica, prototipos y refacciones.',
  },
  {
    question: 'Puedo pedir una pieza unica o tambien lotes?',
    answer:
      'Si. El MVP contempla piezas unicas, lotes pequenos, pedidos para negocio y proyectos a medida. Todo se revisa manualmente antes de confirmar.',
  },
  {
    question: 'Puedo mandar una referencia visual o un archivo base?',
    answer:
      'Si. En el formulario de pedido personalizado puedes subir una imagen de referencia y, si ya tienes una idea clara, usarla para explicarnos mejor medidas, estilo o funcion.',
  },
  {
    question: 'Como se confirma el pago final?',
    answer:
      'No hay checkout automatico. Si una pieza esta marcada como A cotizar, primero validamos material, tiempo de impresion y monto final; despues te compartimos la confirmacion para pago.',
  },
]

export const workSamples = [
  {
    title: 'Mascara cosplay escala real',
    category: 'Cosplay y props',
    description: 'Pieza seccionada para ensamble con ajuste de talla, lijado posterior y acabado metalico.',
    image: buildShowcaseImage('Mascara cosplay escala real'),
  },
  {
    title: 'Kit corporativo para inauguracion',
    category: 'Negocios y senaletica',
    description: 'Lote de exhibidores QR, mini trofeos y letreros de mostrador listos para activacion de marca.',
    image: buildShowcaseImage('Kit corporativo 3D'),
  },
  {
    title: 'Setup gamer organizado',
    category: 'Gaming y escritorio',
    description: 'Sistema de bases para control, headset y cartuchos retro impreso en la misma linea visual.',
    image: buildShowcaseImage('Setup gamer organizado'),
  },
  {
    title: 'Macetas geometricas para cafeteria',
    category: 'Macetas y jardineria',
    description: 'Serie de macetas y senaletica de mesa para interiorismo comercial y ambientacion vegetal.',
    image: buildShowcaseImage('Macetas geometricas para cafeteria'),
  },
]
