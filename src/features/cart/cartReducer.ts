import { getCoffee } from '../catalog/mockData'

export type CartItem = { productId: string; quantity: number }
export type CartAction =
  | { type: 'ADD'; productId: string; quantity: number }
  | { type: 'SET_QUANTITY'; productId: string; quantity: number }
  | { type: 'REMOVE'; productId: string }
  | { type: 'CLEAR' }

export const CART_KEY = 'coffee:cart:v1'
export const DELIVERY_FEE = 350
const validQuantity = (value: number) => Number.isInteger(value) && value >= 1

export function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  if (action.type === 'CLEAR') return []
  if (action.type === 'REMOVE') return state.filter(item => item.productId !== action.productId)
  if (!getCoffee(action.productId) || !validQuantity(action.quantity)) return state
  const quantity = Math.min(99, action.quantity)
  if (action.type === 'SET_QUANTITY') return state.map(item => item.productId === action.productId ? { ...item, quantity } : item)
  const exists = state.some(item => item.productId === action.productId)
  return exists
    ? state.map(item => item.productId === action.productId ? { ...item, quantity: Math.min(99, item.quantity + quantity) } : item)
    : [...state, { productId: action.productId, quantity }]
}

export function hydrateCart(raw: string | null): CartItem[] {
  try {
    const data: unknown = JSON.parse(raw ?? '[]')
    if (!Array.isArray(data)) return []
    return data.reduce<CartItem[]>((items, item: unknown) => {
      if (!item || typeof item !== 'object' || !('productId' in item) || !('quantity' in item)) return items
      if (typeof item.productId !== 'string' || typeof item.quantity !== 'number' || !validQuantity(item.quantity)) return items
      return cartReducer(items, { type: 'ADD', productId: item.productId, quantity: item.quantity })
    }, [])
  } catch { return [] }
}

export function getTotals(items: CartItem[]) {
  const subtotal = items.reduce((sum, item) => sum + (getCoffee(item.productId)?.price ?? 0) * item.quantity, 0)
  const delivery = subtotal > 0 ? DELIVERY_FEE : 0
  return { subtotal, delivery, total: subtotal + delivery, count: items.reduce((sum, item) => sum + item.quantity, 0) }
}
