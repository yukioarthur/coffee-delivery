import { describe, expect, it } from 'vitest'
import { createOrder, parseOrder } from './order'
import type { CheckoutData } from './schema'

const address: CheckoutData = { cep: '01310-100', street: 'Rua das Flores', number: '321', complement: '', neighborhood: 'Vila Nova', city: 'São Paulo', state: 'SP', payment: 'cash' }
describe('snapshot do pedido', () => {
  it('copia endereço e itens e preserva total após mudanças no carrinho', () => {
    const items = [{ productId: 'latte', quantity: 2 }]
    const order = createOrder(address, items)
    items[0].quantity = 4
    expect(order.items[0].quantity).toBe(2)
    expect(order.address).not.toBe(address)
    expect(order.total).toBe(2930)
    expect(parseOrder(order)?.id).toBe(order.id)
  })
  it('não cria pedido vazio', () => { expect(() => createOrder(address, [])).toThrow() })
  it('rejeita confirmação corrompida ou adulterada', () => {
    const order = createOrder(address, [{ productId: 'latte', quantity: 1 }])
    expect(parseOrder({})).toBeNull()
    expect(parseOrder({ ...order, total: 1 })).toBeNull()
    expect(parseOrder({ ...order, items: [{ ...order.items[0], productId: 'fake' }] })).toBeNull()
  })
  it('restaura nome e imagem exclusivamente do catálogo local', () => {
    const order = createOrder(address, [{ productId: 'latte', quantity: 1 }])
    const loaded = parseOrder({ ...order, items: [{ ...order.items[0], name: 'Falso', image: 'https://example.com/tracker' }] })
    expect(loaded?.items[0].name).toBe('Latte')
    expect(loaded?.items[0].image).toBe(order.items[0].image)
  })
})
