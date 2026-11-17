import { describe, expect, it } from 'vitest'
import { checkoutSchema } from './schema'

const valid = { cep: '01310-100', street: 'Rua das Flores', number: '321', complement: '', neighborhood: 'Vila Nova', city: 'São Paulo', state: 'SP', payment: 'credit' }
describe('checkout: validação', () => {
  it('aceita endereço, complemento vazio e número S/N', () => {
    expect(checkoutSchema.safeParse({ ...valid, number: 'S/N' }).success).toBe(true)
  })
  it('aceita CEP sem hífen e remove espaços externos', () => {
    const result = checkoutSchema.parse({ ...valid, cep: '01310100', street: '  Rua das Flores  ' })
    expect(result.street).toBe('Rua das Flores')
  })
  it.each(['', '123', 'abcdefgh', '123456789', '1234-5678'])('rejeita CEP inválido %s', cep => {
    expect(checkoutSchema.safeParse({ ...valid, cep }).success).toBe(false)
  })
  it.each(['XX', '', 'sp'])('rejeita UF inválida %s', state => {
    expect(checkoutSchema.safeParse({ ...valid, state }).success).toBe(false)
  })
  it('exige endereço e forma de pagamento conhecidos', () => {
    expect(checkoutSchema.safeParse({ ...valid, street: '  ' }).success).toBe(false)
    expect(checkoutSchema.safeParse({ ...valid, payment: undefined }).success).toBe(false)
    expect(checkoutSchema.safeParse({ ...valid, payment: 'pix' }).success).toBe(false)
  })
  it.each(['credit', 'debit', 'cash'])('aceita pagamento %s', payment => {
    expect(checkoutSchema.safeParse({ ...valid, payment }).success).toBe(true)
  })
})
