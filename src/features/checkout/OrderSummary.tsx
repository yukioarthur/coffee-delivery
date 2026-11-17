import { ArrowRight, ShoppingBag, Trash2 } from 'lucide-react'
import { QuantityControl } from '../../components/ui/QuantityControl'
import { formatMoney } from '../../components/ui/Price'
import { Button } from '../../components/ui/Button'
import { useCart } from '../cart/CartProvider'
import { getCoffee } from '../catalog/mockData'

export function OrderSummary({ submitting }: { submitting: boolean }) {
  const { items, dispatch, totals, notify } = useCart()
  return <aside className="order-summary" aria-labelledby="summary-title"><div className="summary-title"><h2 id="summary-title">Sua boa pausa</h2><span>{totals.count} {totals.count === 1 ? 'item' : 'itens'}</span></div>
    <ul className="cart-items">{items.map(item => {
      const coffee = getCoffee(item.productId)!
      return <li className="cart-item" key={item.productId}><img src={coffee.image} alt="" width="64" height="64" /><div className="cart-item-details"><h3>{coffee.name}</h3><span className="cart-unit">{formatMoney(coffee.price)} / un.</span><div className="cart-item-actions"><QuantityControl name={coffee.name} value={item.quantity} onChange={quantity => dispatch({ type: 'SET_QUANTITY', productId: item.productId, quantity })} /><button type="button" className="remove-button" aria-label={`Remover ${coffee.name}`} onClick={() => { dispatch({ type: 'REMOVE', productId: item.productId }); notify(`${coffee.name} removido do carrinho.`) }}><Trash2 size={16} /></button></div></div><strong className="line-price">{formatMoney(coffee.price * item.quantity)}</strong></li>
    })}</ul>
    <dl className="totals"><div><dt>Subtotal</dt><dd>{formatMoney(totals.subtotal)}</dd></div><div><dt>Entrega</dt><dd>{formatMoney(totals.delivery)}</dd></div><div className="grand-total"><dt>Total</dt><dd>{formatMoney(totals.total)}</dd></div></dl>
    <Button className="confirm-order" type="submit" form="checkout-form" disabled={submitting}>{submitting ? 'Confirmando…' : 'Confirmar pedido'}<ArrowRight size={18} /></Button>
    <p className="summary-note"><ShoppingBag size={14} /> Pedido fictício. Nenhuma cobrança será feita.</p>
  </aside>
}
