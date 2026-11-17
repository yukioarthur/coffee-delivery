import { z } from 'zod'
import { getCoffee } from '../catalog/mockData'
import { DELIVERY_FEE, getTotals, type CartItem } from '../cart/cartReducer'
import { checkoutSchema, type CheckoutData } from './schema'

const orderSchema = z.object({
  id: z.string().min(1), createdAt: z.string().datetime(), address: checkoutSchema,
  items: z.array(z.object({ productId: z.string(), name: z.string(), price: z.number().int().positive(), quantity: z.number().int().min(1).max(99), image: z.string() })).min(1).max(14),
  subtotal: z.number().int().positive(), delivery: z.literal(DELIVERY_FEE), total: z.number().int().positive(),
})
export type Order = z.infer<typeof orderSchema>
export const ORDER_KEY = 'coffee:last-order:v1'

export function createOrder(address: CheckoutData, items: CartItem[]): Order {
  if (items.length === 0) throw new Error('Um pedido precisa de itens')
  const totals = getTotals(items)
  return orderSchema.parse({
    id: `CD-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
    createdAt: new Date().toISOString(), address: { ...address },
    items: items.map(item => {
      const coffee = getCoffee(item.productId)
      if (!coffee) throw new Error('Produto inválido')
      return { productId: coffee.id, name: coffee.name, price: coffee.price, quantity: item.quantity, image: coffee.image }
    }),
    subtotal: totals.subtotal, delivery: DELIVERY_FEE, total: totals.total,
  })
}

export function parseOrder(data: unknown): Order | null {
  const result = orderSchema.safeParse(data)
  if (!result.success) return null
  const order = result.data
  const subtotal = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  if (order.subtotal !== subtotal || order.total !== subtotal + order.delivery || new Set(order.items.map(item => item.productId)).size !== order.items.length) return null
  for (const item of order.items) {
    const coffee = getCoffee(item.productId)
    if (!coffee || coffee.price !== item.price) return null
    // A imagem e o nome sempre vêm do catálogo local, nunca do storage.
    item.image = coffee.image
    item.name = coffee.name
  }
  return order
}

export function readOrder(): Order | null {
  try { return parseOrder(JSON.parse(sessionStorage.getItem(ORDER_KEY) ?? 'null')) } catch { return null }
}

export function saveOrder(order: Order): boolean {
  try { sessionStorage.setItem(ORDER_KEY, JSON.stringify(order)); return true } catch { return false }
}
