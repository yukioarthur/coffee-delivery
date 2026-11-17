import { ArrowUpRight, ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'

export function EmptyCart() {
  return <section className="empty-cart"><ShoppingBag size={45} strokeWidth={1.4} /><span className="eyebrow">Uma boa pausa espera por você</span><h1>Seu carrinho está vazio.</h1><p>Escolha um café no catálogo. A gente cuida dos próximos passos com você.</p><Link className="button" to="/">Explorar os cafés <ArrowUpRight size={18} /></Link></section>
}
