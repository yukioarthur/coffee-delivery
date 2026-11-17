import { CheckCircle2 } from 'lucide-react'
import { createContext, useCallback, useContext, useEffect, useReducer, useState, type Dispatch, type ReactNode } from 'react'
import { getCoffee } from '../catalog/mockData'
import { CART_KEY, cartReducer, getTotals, hydrateCart, type CartAction, type CartItem } from './cartReducer'

type CartContextValue = { items: CartItem[]; dispatch: Dispatch<CartAction>; add: (id: string, quantity: number) => void; notify: (message: string) => void; totals: ReturnType<typeof getTotals> }
const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(cartReducer, undefined, () => {
    try { return hydrateCart(localStorage.getItem(CART_KEY)) } catch { return [] }
  })
  const [storageError, setStorageError] = useState(false)
  const [notice, setNotice] = useState({ text: '', key: 0 })
  const notify = useCallback((text: string) => setNotice(previous => ({ text, key: previous.key + 1 })), [])

  useEffect(() => {
    try { localStorage.setItem(CART_KEY, JSON.stringify(items)); setStorageError(false) } catch { setStorageError(true) }
  }, [items])
  useEffect(() => {
    if (!notice.text) return
    const timer = window.setTimeout(() => setNotice(current => ({ ...current, text: '' })), 3500)
    return () => window.clearTimeout(timer)
  }, [notice.key, notice.text])

  const add = (productId: string, quantity: number) => {
    const coffee = getCoffee(productId)
    if (!coffee) return
    const current = items.find(item => item.productId === productId)?.quantity ?? 0
    dispatch({ type: 'ADD', productId, quantity })
    notify(current + quantity > 99 ? `Limite de 99 unidades de ${coffee.name} atingido.` : `${coffee.name} adicionado ao carrinho.`)
  }
  return <CartContext.Provider value={{ items, dispatch, add, notify, totals: getTotals(items) }}>
    {storageError && <p className="storage-warning" role="status">Seu navegador bloqueou o armazenamento. O carrinho funciona, mas será perdido ao atualizar a página.</p>}
    {children}
    <div role="status" aria-live="polite" aria-atomic="true">{notice.text && <div className="toast" key={notice.key}><CheckCircle2 size={18} />{notice.text}</div>}</div>
  </CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart precisa de CartProvider')
  return context
}
