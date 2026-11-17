import { Header } from './layouts/Header'
import { Footer } from './layouts/Footer'
import { CartProvider, useCart } from './features/cart/CartProvider'
import { Home } from './features/catalog/Home'
import { Checkout } from './features/checkout/Checkout'
import { Success } from './features/success/Success'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useEffect, useRef } from 'react'

export function App() {
  return <CartProvider><Store /></CartProvider>
}

function Store() {
  const { add, totals } = useCart()
  const { pathname } = useLocation()
  const previousPath = useRef(pathname)
  useEffect(() => {
    document.title = `${pathname === '/checkout' ? 'Seu pedido' : pathname === '/sucesso' ? 'Pedido confirmado' : 'Café no seu ritmo'} | Coffee Delivery`
    if (previousPath.current !== pathname) {
      window.scrollTo({ top: 0 })
      document.getElementById('main')?.focus({ preventScroll: true })
      previousPath.current = pathname
    }
  }, [pathname])
  return <><a className="skip-link" href="#main">Pular para o conteúdo</a><Header count={totals.count} /><main id="main" className="main" tabIndex={-1}><Routes><Route path="/" element={<Home onAdd={add} />} /><Route path="/checkout" element={<Checkout />} /><Route path="/sucesso" element={<Success />} /><Route path="*" element={<Navigate to="/" replace />} /></Routes></main><Footer /></>
}
