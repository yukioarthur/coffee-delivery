import { Minus, Plus } from 'lucide-react'

export function QuantityControl({ value, onChange, name }: { value: number; onChange: (next: number) => void; name: string }) {
  return <div className="quantity" role="group" aria-label={`Quantidade de ${name}`}>
    <button type="button" aria-label={`Diminuir ${name}`} disabled={value <= 1} onClick={() => onChange(value - 1)}><Minus size={15} /></button>
    <output aria-label={`Quantidade de ${name}`}>{value}</output>
    <button type="button" aria-label={`Aumentar ${name}`} disabled={value >= 99} onClick={() => onChange(value + 1)}><Plus size={15} /></button>
  </div>
}
