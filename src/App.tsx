import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { Box } from '@chakra-ui/react'
import { useEffect } from 'react'
import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { CartPage } from '@/pages/CartPage'
import { CatalogPage } from '@/pages/CatalogPage'
import { ContactPage } from '@/pages/ContactPage'
import { CustomOrderPage } from '@/pages/CustomOrderPage'
import { FaqPage } from '@/pages/FaqPage'
import { HomePage } from '@/pages/HomePage'
import { OrderSuccessPage } from '@/pages/OrderSuccessPage'
import { WorksPage } from '@/pages/WorksPage'

function ScrollToTop() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

  return null
}

function AppLayout() {
  return (
    <Box minH="100dvh" display="flex" flexDirection="column">
      <Navbar />
      <Box as="main" flex="1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalogo" element={<CatalogPage />} />
          <Route path="/arma-tu-pedido" element={<CustomOrderPage />} />
          <Route path="/trabajos" element={<WorksPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/carrito" element={<CartPage />} />
          <Route path="/contacto" element={<ContactPage />} />
          <Route path="/pedido-enviado" element={<OrderSuccessPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Box>
      <Footer />
    </Box>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppLayout />
    </BrowserRouter>
  )
}
