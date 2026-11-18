import { useCallback, useEffect, useRef, useState } from 'react'
import type { UseFormSetValue } from 'react-hook-form'
import { CepError, lookupCep, normalizeCep } from './cep'
import type { CheckoutData } from './schema'

export type CepStatus = 'idle' | 'loading' | 'success' | 'invalid' | 'not-found' | 'error'
type Result = { cep: string; status: CepStatus }
export const cepMessages: Record<CepStatus, string> = {
  idle: 'Ao sair do CEP, buscamos seu endereço no ViaCEP.',
  loading: 'Buscando endereço…',
  success: 'Endereço encontrado. Confira os dados e informe o número.',
  invalid: 'Informe um CEP válido com 8 dígitos para consultar.',
  'not-found': 'CEP não encontrado. Confira e corrija o CEP.',
  error: 'Não foi possível consultar o CEP. Tente novamente ou preencha o endereço manualmente.',
}

export function useCepLookup(setValue: UseFormSetValue<CheckoutData>) {
  const [result, setResult] = useState<Result>({ cep: '', status: 'idle' })
  const last = useRef<Result>({ cep: '', status: 'idle' })
  const active = useRef<AbortController | null>(null)
  const sequence = useRef(0)
  useEffect(() => () => { sequence.current += 1; active.current?.abort() }, [])

  const lookup = useCallback(async (rawCep: string, force = false): Promise<CepStatus> => {
    const cep = normalizeCep(rawCep)
    if (!force && last.current.cep === cep && ['success', 'not-found', 'error'].includes(last.current.status)) return last.current.status
    const request = ++sequence.current
    active.current?.abort()
    const controller = new AbortController()
    active.current = controller
    const publish = (status: CepStatus) => {
      if (sequence.current !== request) return
      last.current = { cep, status }
      setResult({ cep, status })
    }
    if (!/^\d{8}$/.test(cep)) { publish('invalid'); return 'invalid' }
    publish('loading')
    const timer = window.setTimeout(() => controller.abort(), 8000)
    try {
      const address = await lookupCep(cep, controller.signal)
      if (request !== sequence.current) return 'idle'
      for (const field of ['street', 'neighborhood', 'city', 'state'] as const) setValue(field, address[field], { shouldValidate: true, shouldDirty: true })
      publish('success')
      return 'success'
    } catch (error) {
      if (request !== sequence.current) return 'idle'
      const status: CepStatus = error instanceof CepError && error.code !== 'unavailable' ? error.code : 'error'
      publish(status)
      return status
    } finally { window.clearTimeout(timer) }
  }, [setValue])

  const invalidate = useCallback(() => {
    sequence.current += 1
    active.current?.abort()
    last.current = { cep: '', status: 'idle' }
    setResult(last.current)
  }, [])
  return { ...result, lookup, invalidate }
}
