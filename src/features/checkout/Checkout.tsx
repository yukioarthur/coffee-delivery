import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, Banknote, CreditCard, LoaderCircle, MapPin, WalletCards } from 'lucide-react'
import { useRef } from 'react'
import { useForm, type FieldErrors, type UseFormRegister } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { EmptyCart } from '../../components/ui/EmptyCart'
import { useCart } from '../cart/CartProvider'
import { OrderSummary } from './OrderSummary'
import { checkoutSchema, paymentLabels, states, type CheckoutData } from './schema'
import { createOrder, saveOrder } from './order'
import { cepMessages, useCepLookup } from './useCepLookup'

type AddressField = Exclude<keyof CheckoutData, 'payment' | 'state'>
function Field({ name, label, placeholder, register, errors, className = '', afterBlur, afterChange, ...inputProps }: { name: AddressField; label: string; placeholder: string; register: UseFormRegister<CheckoutData>; errors: FieldErrors<CheckoutData>; className?: string; autoComplete?: string; inputMode?: 'numeric'; maxLength?: number; afterBlur?: () => void; afterChange?: () => void }) {
  const error = errors[name]
  const registration = register(name)
  return <div className={`field ${className}`}><label htmlFor={name}>{label}{name === 'complement' && <span>Opcional</span>}</label><input id={name} placeholder={placeholder} {...registration} onBlur={event => { void registration.onBlur(event); afterBlur?.() }} onChange={event => { void registration.onChange(event); afterChange?.() }} aria-invalid={Boolean(error)} aria-describedby={[error ? `${name}-error` : '', name === 'cep' ? 'cep-status' : ''].filter(Boolean).join(' ') || undefined} {...inputProps} />{error && <p id={`${name}-error`} className="field-error" role="alert">{error.message}</p>}</div>
}

export function Checkout() {
  const { items, dispatch } = useCart()
  const navigate = useNavigate()
  const submitted = useRef(false)
  const { register, handleSubmit, setFocus, setValue, getValues, setError, clearErrors, resetField, formState: { errors, isSubmitting } } = useForm<CheckoutData>({ resolver: zodResolver(checkoutSchema), shouldFocusError: false, defaultValues: { cep: '', street: '', number: '', complement: '', neighborhood: '', city: '' } })
  const cepLookup = useCepLookup(setValue)
  const consultCep = () => { void cepLookup.lookup(getValues('cep')) }
  const focusFirstError = (invalid: FieldErrors<CheckoutData>) => {
    const fieldOrder: (keyof CheckoutData)[] = ['cep', 'street', 'number', 'complement', 'neighborhood', 'city', 'state', 'payment']
    const first = fieldOrder.find(field => invalid[field])
    if (first) setFocus(first)
  }
  const submit = async (address: CheckoutData) => {
    if (submitted.current || items.length === 0) return
    submitted.current = true
    const status = await cepLookup.lookup(address.cep)
    if (status === 'not-found' || status === 'invalid' || status === 'idle') {
      setError('cep', { type: 'lookup', message: cepMessages[status] }, { shouldFocus: true })
      submitted.current = false
      return
    }
    const finalAddress = checkoutSchema.safeParse(getValues())
    if (!finalAddress.success) {
      setFocus(finalAddress.error.issues[0].path[0] as keyof CheckoutData)
      submitted.current = false
      return
    }
    const order = createOrder(finalAddress.data, items)
    const sessionSaved = saveOrder(order)
    dispatch({ type: 'CLEAR' })
    navigate('/success', { replace: true, state: { order, sessionSaved } })
  }
  return <div className="container checkout-page"><Link className="back-link" to="/"><ArrowLeft size={15} /> Continuar escolhendo</Link>
    {items.length === 0 ? <EmptyCart /> : <><div className="page-heading"><span className="eyebrow">Falta pouco para a sua pausa</span><h1>Do seu jeito. No seu endereço.</h1><p>Confira seus cafés e conte para a gente onde entregar.</p></div><div className="checkout-layout">
      <form id="checkout-form" onSubmit={handleSubmit(submit, focusFirstError)} noValidate><section className="checkout-section" aria-labelledby="address-title"><div className="section-intro"><span><MapPin size={22} /></span><div><h2 id="address-title">Endereço de entrega</h2><p>Preencha seu endereço para este pedido fictício.</p></div></div>
        <div className="address-fields">
          <Field name="cep" label="CEP" placeholder="00000-000" autoComplete="postal-code" inputMode="numeric" maxLength={9} register={register} errors={errors} className="field-cep" afterBlur={consultCep} afterChange={() => { if (cepLookup.status === 'success') for (const field of ['street', 'neighborhood', 'city', 'state'] as const) resetField(field); cepLookup.invalidate(); clearErrors('cep') }} />
          <div id="cep-status" className={`cep-status ${['error', 'invalid', 'not-found'].includes(cepLookup.status) ? 'cep-problem' : ''}`} role="status" aria-live="polite">{cepLookup.status === 'loading' && <LoaderCircle size={14} className="loading-icon" />}<span>{cepMessages[cepLookup.status]}</span>{cepLookup.status === 'error' && <button type="button" onClick={() => { void cepLookup.lookup(getValues('cep'), true) }}>Tentar novamente</button>}</div>
          <Field name="street" label="Rua" placeholder="Nome da rua" autoComplete="address-line1" maxLength={100} register={register} errors={errors} className="field-full" />
          <Field name="number" label="Número" placeholder="123 ou S/N" maxLength={12} register={register} errors={errors} />
          <Field name="complement" label="Complemento" placeholder="Apartamento, bloco…" autoComplete="address-line2" maxLength={100} register={register} errors={errors} className="field-wide" />
          <Field name="neighborhood" label="Bairro" placeholder="Seu bairro" maxLength={80} register={register} errors={errors} />
          <Field name="city" label="Cidade" placeholder="Sua cidade" autoComplete="address-level2" maxLength={80} register={register} errors={errors} />
          <div className="field field-state"><label htmlFor="state">UF</label><select id="state" defaultValue="" {...register('state')} autoComplete="address-level1" aria-invalid={Boolean(errors.state)} aria-describedby={errors.state ? 'state-error' : undefined}><option value="" disabled>UF</option>{states.map(state => <option key={state} value={state}>{state}</option>)}</select>{errors.state && <p className="field-error" id="state-error" role="alert">{errors.state.message}</p>}</div>
        </div>
      </section>
      <section className="checkout-section payment-section" aria-labelledby="payment-title"><div className="section-intro"><span><WalletCards size={22} /></span><div><h2 id="payment-title">Como você prefere pagar?</h2><p>Pagamento na entrega. Sem dados de cartão por aqui.</p></div></div>
        <fieldset className="payment-options" aria-describedby={errors.payment ? 'payment-error' : undefined}><legend>Forma de pagamento na entrega</legend>{(['credit', 'debit', 'cash'] as const).map(method => <label className="payment-option" key={method}><input type="radio" value={method} {...register('payment')} aria-invalid={Boolean(errors.payment)} />{method === 'cash' ? <Banknote size={20} /> : <CreditCard size={20} />}<span>{paymentLabels[method]}</span></label>)}</fieldset>{errors.payment && <p className="field-error" id="payment-error" role="alert">{errors.payment.message}</p>}
      </section></form><OrderSummary submitting={isSubmitting} checkingCep={cepLookup.status === 'loading'} />
    </div></>}
  </div>
}
