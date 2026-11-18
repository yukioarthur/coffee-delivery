import { z } from 'zod'

export const states = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'] as const
export const paymentLabels = { credit: 'Cartão de crédito', debit: 'Cartão de débito', cash: 'Dinheiro' }
export const checkoutSchema = z.object({
  cep: z.string().trim().regex(/^\d{5}-?\d{3}$/, 'Informe um CEP com 8 dígitos.'),
  street: z.string().trim().min(3, 'Informe a rua (mínimo 3 caracteres).').max(100, 'Use até 100 caracteres.'),
  number: z.string().trim().min(1, 'Informe o número ou S/N.').max(12, 'Use até 12 caracteres.'),
  complement: z.string().trim().max(100, 'Use até 100 caracteres.'),
  neighborhood: z.string().trim().min(2, 'Informe o bairro.').max(80, 'Use até 80 caracteres.'),
  city: z.string().trim().min(2, 'Informe a cidade.').max(80, 'Use até 80 caracteres.'),
  state: z.enum(states, { error: 'Selecione uma UF válida.' }),
  payment: z.enum(['credit', 'debit', 'cash'], { error: 'Escolha uma forma de pagamento.' }),
})
export type CheckoutData = z.infer<typeof checkoutSchema>
export type DeliveryAddress = Omit<CheckoutData, 'payment'>
export type PaymentMethod = CheckoutData['payment']
