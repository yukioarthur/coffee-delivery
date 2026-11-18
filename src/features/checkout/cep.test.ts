import { afterEach, describe, expect, it, vi } from 'vitest'
import { lookupCep } from './cep'

afterEach(() => vi.unstubAllGlobals())
describe('consulta ViaCEP', () => {
  it('valida antes de chamar a rede', async () => {
    const fetch = vi.fn()
    vi.stubGlobal('fetch', fetch)
    await expect(lookupCep('abc')).rejects.toMatchObject({ code: 'invalid' })
    expect(fetch).not.toHaveBeenCalled()
  })
  it('normaliza CEP e mapeia somente campos de endereço', async () => {
    const fetch = vi.fn().mockResolvedValue(new Response(JSON.stringify({ logradouro: 'Praça da Sé', bairro: 'Sé', localidade: 'São Paulo', uf: 'SP', complemento: 'ignorar' })))
    vi.stubGlobal('fetch', fetch)
    await expect(lookupCep('01001-000')).resolves.toEqual({ street: 'Praça da Sé', neighborhood: 'Sé', city: 'São Paulo', state: 'SP' })
    expect(fetch.mock.calls[0][0]).toBe('https://viacep.com.br/ws/01001000/json/')
  })
  it.each([true, 'true'])('trata CEP inexistente com erro=%s', async erro => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify({ erro }))))
    await expect(lookupCep('99999999')).rejects.toMatchObject({ code: 'not-found' })
  })
  it('trata erro HTTP', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('', { status: 503 })))
    await expect(lookupCep('01001000')).rejects.toMatchObject({ code: 'unavailable' })
  })
  it('trata formato de resposta inesperado', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('{}')))
    await expect(lookupCep('01001000')).rejects.toMatchObject({ code: 'unavailable' })
  })
  it('propaga cancelamento para não aplicar resposta antiga', async () => {
    const abort = new DOMException('Aborted', 'AbortError')
    const fetch = vi.fn().mockRejectedValue(abort)
    vi.stubGlobal('fetch', fetch)
    const controller = new AbortController()
    controller.abort()
    await expect(lookupCep('01001000', controller.signal)).rejects.toBe(abort)
    expect(fetch.mock.calls[0][1].signal).toBe(controller.signal)
  })
})
