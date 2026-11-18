import { z } from 'zod'
import { states } from './schema'

const responseSchema = z.object({ logradouro: z.string(), bairro: z.string(), localidade: z.string().min(1), uf: z.enum(states) })
export type CepAddress = { street: string; neighborhood: string; city: string; state: typeof states[number] }
export class CepError extends Error {
  constructor(public code: 'invalid' | 'not-found' | 'unavailable') { super(code) }
}
export const normalizeCep = (cep: string) => cep.trim().replace('-', '')

export async function lookupCep(cep: string, signal?: AbortSignal): Promise<CepAddress> {
  const normalized = normalizeCep(cep)
  if (!/^\d{8}$/.test(normalized)) throw new CepError('invalid')
  const response = await fetch(`https://viacep.com.br/ws/${normalized}/json/`, { signal, headers: { Accept: 'application/json' } })
  if (!response.ok) throw new CepError('unavailable')
  const data: unknown = await response.json()
  if (data && typeof data === 'object' && 'erro' in data && (data.erro === true || data.erro === 'true')) throw new CepError('not-found')
  const parsed = responseSchema.safeParse(data)
  if (!parsed.success) throw new CepError('unavailable')
  return { street: parsed.data.logradouro, neighborhood: parsed.data.bairro, city: parsed.data.localidade, state: parsed.data.uf }
}
