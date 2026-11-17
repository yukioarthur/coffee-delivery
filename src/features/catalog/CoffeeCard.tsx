import { ArrowUpRight } from 'lucide-react'
import { useState } from 'react'
import { QuantityControl } from '../../components/ui/QuantityControl'
import { Price } from '../../components/ui/Price'
import type { Coffee } from './mockData'

export function CoffeeCard({ coffee, onAdd }: { coffee: Coffee; onAdd: (id: string, quantity: number) => void }) {
  const [quantity, setQuantity] = useState(1)
  return <article className="coffee-card">
    <div className="coffee-photo"><img src={coffee.image} alt={`Xícara de ${coffee.name}`} loading="lazy" width="180" height="180" /></div>
    <div className="coffee-card-body"><div className="tags">{coffee.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
      <h3>{coffee.name}</h3><p>{coffee.description}</p>
      <div className="coffee-card-bottom"><Price cents={coffee.price} /><div className="card-controls"><QuantityControl value={quantity} onChange={setQuantity} name={coffee.name} /><button className="add-coffee" aria-label={`Adicionar ${coffee.name} ao carrinho`} onClick={() => { onAdd(coffee.id, quantity); setQuantity(1) }}><ArrowUpRight size={22} /></button></div></div>
    </div>
  </article>
}
