export const formatMoney = (cents: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cents / 100)

export function Price({ cents }: { cents: number }) {
  return <span className="price"><small>R$</small> {formatMoney(cents).replace(/R\$\s*/, '')}</span>
}
