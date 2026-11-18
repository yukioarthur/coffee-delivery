import { ArrowUpRight, ShoppingBag } from 'lucide-react'
import { ActionLink } from './Button'

export function EmptyCart() {
  return <section className="empty-cart"><ShoppingBag size={45} strokeWidth={1.4} /><span className="eyebrow">Uma boa pausa espera por você</span><h1>Seu carrinho está vazio.</h1><p>Escolha um café no catálogo. A gente cuida dos próximos passos com você.</p><ActionLink to="/">Explorar os cafés <ArrowUpRight size={18} /></ActionLink></section>
}
