import {
  Badge,
  Box,
  Button,
  Container,
  HStack,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ColorModeButton } from '@/components/ui/color-mode'
import { navLinks } from '@/config/site'
import { summarizeCart } from '@/lib/order'
import { useCartStore } from '@/store/cartStore'

export function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const items = useCartStore((state) => state.items)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const summary = summarizeCart(items)

  useEffect(() => {
    setIsMenuOpen(false)
  }, [location.pathname])

  return (
    <Box
      as="header"
      position="sticky"
      top="0"
      zIndex="40"
      borderBottom="1px solid"
      borderColor="border.soft"
      bg="rgba(6, 34, 63, 0.8)"
      backdropFilter="blur(18px)"
    >
      <Container maxW="7xl" py="4">
        <Stack gap="4">
          <HStack justify="space-between" align="center">
            <Stack gap="0" cursor="pointer" onClick={() => navigate('/')}>
              <Text
                fontFamily="heading"
                fontSize={{ base: '3xl', md: '4xl' }}
                lineHeight="0.85"
                fontWeight="700"
                color="brand.solid"
              >
                Nika
              </Text>
              <Text fontSize="xs" letterSpacing="0.26em" textTransform="uppercase" color="fg.muted">
                impresion 3D
              </Text>
            </Stack>

            <HStack gap="2" display={{ base: 'none', md: 'flex' }}>
              {navLinks.map((link) => (
                <Button
                  key={link.href}
                  variant={location.pathname === link.href ? 'solid' : 'ghost'}
                  colorPalette={location.pathname === link.href ? 'brand' : undefined}
                  onClick={() => navigate(link.href)}
                >
                  {link.label}
                </Button>
              ))}
            </HStack>

            <HStack gap="2">
              <Button variant="outline" borderColor="border.soft" onClick={() => navigate('/carrito')}>
                Carrito
                <Badge
                  ml="2"
                  bg="brand.solid"
                  color="brand.contrast"
                  borderRadius="full"
                  px="2"
                >
                  {summary.totalItems}
                </Badge>
              </Button>
              <ColorModeButton />
              <Button
                display={{ base: 'inline-flex', md: 'none' }}
                variant="outline"
                borderColor="border.soft"
                onClick={() => setIsMenuOpen((current) => !current)}
              >
                {isMenuOpen ? 'Cerrar' : 'Menu'}
              </Button>
            </HStack>
          </HStack>

          {isMenuOpen ? (
            <Stack display={{ base: 'flex', md: 'none' }} gap="2">
              {navLinks.map((link) => (
                <Button
                  key={link.href}
                  justifyContent="flex-start"
                  variant={location.pathname === link.href ? 'solid' : 'ghost'}
                  colorPalette={location.pathname === link.href ? 'brand' : undefined}
                  onClick={() => navigate(link.href)}
                >
                  {link.label}
                </Button>
              ))}
            </Stack>
          ) : null}
        </Stack>
      </Container>
    </Box>
  )
}
