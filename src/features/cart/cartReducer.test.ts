import { describe, expect, it } from 'vitest'
import { cartReducer, getTotals, hydrateCart } from './cartReducer'

describe('carrinho: regras de negócio', () => {
  it('adiciona e acumula o mesmo produto sem mutar o estado anterior', () => {
    const state = Object.freeze([Object.freeze({ productId: 'tradicional', quantity: 2 })])
    const next = cartReducer([...state], { type: 'ADD', productId: 'tradicional', quantity: 3 })
    expect(next).toEqual([{ productId: 'tradicional', quantity: 5 }])
    expect(state[0].quantity).toBe(2)
    expect(next[0]).not.toBe(state[0])
  })
  it('adiciona produtos diferentes em linhas diferentes', () => {
    expect(cartReducer([{ productId: 'latte', quantity: 1 }], { type: 'ADD', productId: 'tradicional', quantity: 2 })).toHaveLength(2)
  })
  it('limita soma e edição a 99 unidades', () => {
    expect(cartReducer([{ productId: 'latte', quantity: 98 }], { type: 'ADD', productId: 'latte', quantity: 5 })[0].quantity).toBe(99)
    expect(cartReducer([{ productId: 'latte', quantity: 1 }], { type: 'SET_QUANTITY', productId: 'latte', quantity: 110 })[0].quantity).toBe(99)
  })
  it.each([0, -1, 1.5, NaN, Infinity])('rejeita quantidade inválida %s', quantity => {
    const state = [{ productId: 'latte', quantity: 1 }]
    expect(cartReducer(state, { type: 'ADD', productId: 'latte', quantity })).toBe(state)
  })
  it('ignora produto inexistente', () => {
    expect(cartReducer([], { type: 'ADD', productId: 'inventado', quantity: 1 })).toEqual([])
  })
  it('edita, remove e limpa o carrinho', () => {
    const original = [{ productId: 'latte', quantity: 2 }, { productId: 'tradicional', quantity: 1 }]
    const edited = cartReducer(original, { type: 'SET_QUANTITY', productId: 'latte', quantity: 4 })
    expect(edited[0].quantity).toBe(4)
    expect(original[0].quantity).toBe(2)
    expect(cartReducer(edited, { type: 'REMOVE', productId: 'latte' })).toEqual([original[1]])
    expect(cartReducer(edited, { type: 'CLEAR' })).toEqual([])
  })
  it('calcula em centavos e cobra frete apenas com produtos', () => {
    expect(getTotals([{ productId: 'tradicional', quantity: 2 }, { productId: 'latte', quantity: 1 }])).toEqual({ subtotal: 3270, delivery: 350, total: 3620, count: 3 })
    expect(getTotals([])).toEqual({ subtotal: 0, delivery: 0, total: 0, count: 0 })
  })
})

describe('hidratação segura', () => {
  it.each([null, '', '{quebrado', '{}', 'null', '42'])('tolera storage inválido %s', raw => {
    expect(hydrateCart(raw)).toEqual([])
  })
  it('descarta linhas inválidas, consolida duplicadas e limita quantidades', () => {
    expect(hydrateCart(JSON.stringify([null, { productId: 'inexistente', quantity: 2 }, { productId: 'latte', quantity: -1 }, { productId: 'latte', quantity: '2' }, { productId: 'latte', quantity: 90, price: 1 }, { productId: 'latte', quantity: 20 }]))).toEqual([{ productId: 'latte', quantity: 99 }])
  })
})
