import { Button, Icon } from '@chakra-ui/react'
import { RiWhatsappFill } from 'react-icons/ri'

interface WhatsAppButtonProps {
  url?: string
  label?: string
}

export function WhatsAppButton({
  url,
  label = 'Abrir WhatsApp',
}: WhatsAppButtonProps) {
  return (
    <Button
      colorPalette="brand"
      onClick={() => {
        if (!url) return
        window.open(url, '_blank', 'noopener,noreferrer')
      }}
      disabled={!url}
    >
      <Icon as={RiWhatsappFill} boxSize="5" />
      {label}
    </Button>
  )
}
