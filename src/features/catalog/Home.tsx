import { ArrowDown, ArrowUpRight, Coffee, PackageCheck, ShoppingBag, Timer, Truck } from 'lucide-react'
import { CoffeeCard } from './CoffeeCard'
import { coffees } from './mockData'

export function Home({ onAdd }: { onAdd: (id: string, quantity: number) => void }) {
  return <div className="container">
    <section className="hero" aria-labelledby="hero-heading"><div className="hero-copy"><span className="eyebrow">Sua pausa começa aqui</span>
      <h1 id="hero-heading">Um bom café.<br />Um dia <em>melhor.</em></h1>
      <p>Do primeiro gole à última ideia. Encontre o seu café favorito e deixe o resto com a gente.</p>
      <a className="button hero-cta" href="#cafes">Escolher meu café <ArrowUpRight size={19} /></a>
      <div className="hero-note"><Coffee size={16} /><span>Feito com cuidado. Entregue com carinho.</span></div>
    </div>
    <div className="hero-art" aria-label="Expresso cremoso em uma xícara"><span className="art-overline">Pequenos rituais, grandes momentos.</span><div className="coffee-orbit" /><span className="art-stamp">UMA PAUSA<br /><b>bem feita.</b><Coffee size={18} /></span><img className="hero-cup" src={coffees[2].image} alt="Expresso cremoso visto de cima" width="400" height="400" fetchPriority="high" /><div className="art-bottom"><span>Intenso no sabor.<br /><strong>Leve no seu dia.</strong></span><ArrowDown size={22} /></div></div>
    </section>
    <section className="benefits" aria-label="Por que escolher Coffee Delivery"><div><span className="benefit-icon"><ShoppingBag size={21} /></span><p>Escolha sem complicação<small>Seu favorito em poucos cliques</small></p></div><div><span className="benefit-icon"><PackageCheck size={21} /></span><p>Cuidado em cada detalhe<small>Do preparo até a embalagem</small></p></div><div><span className="benefit-icon"><Truck size={21} /></span><p>Uma pausa que chega até você<small>Entrega fictícia em 20–30 min</small></p></div></section>
    <section className="catalog" id="cafes" aria-labelledby="catalog-heading"><div className="catalog-heading"><div><span className="eyebrow">Encontre o seu favorito</span><h2 id="catalog-heading">Qual é o café de hoje?</h2></div><span className="catalog-count">14 jeitos de fazer uma boa pausa <Coffee size={17} /></span></div>
      <div className="coffee-grid">{coffees.map(coffee => <CoffeeCard key={coffee.id} coffee={coffee} onAdd={onAdd} />)}</div>
      <p className="catalog-footnote"><Timer size={14} /> Aproveite o ritual. Este é um projeto acadêmico com pedidos fictícios.</p>
    </section>
  </div>
}

