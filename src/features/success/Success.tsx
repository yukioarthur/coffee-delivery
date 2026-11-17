import { ArrowUpRight, Bike, Check, Coffee, CreditCard, MapPin, Timer } from 'lucide-react'
import { useState } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { formatMoney } from '../../components/ui/Price'
import { parseOrder, readOrder } from '../checkout/order'
import { paymentLabels } from '../checkout/schema'

export function Success() {
  const location = useLocation()
  const [order] = useState(() => parseOrder(location.state?.order) ?? readOrder())
  if (!order) return <Navigate to="/" replace />
  return <div className="container success-page"><div className="success-heading"><span className="success-check"><Check size={27} /></span><span className="eyebrow">Pedido confirmado</span><h1>Sua próxima pausa<br />já tem um <em>bom café.</em></h1><p>Agora é só imaginar o aroma chegando. Obrigado por escolher a Coffee Delivery!</p><span className="order-number">Pedido {order.id}</span></div>
    {location.state?.sessionSaved === false && <p className="session-warning" role="status">Seu navegador bloqueou o armazenamento da sessão. Esta confirmação ficará disponível enquanto esta tela estiver aberta.</p>}
    <div className="success-layout"><section className="delivery-details" aria-labelledby="delivery-title"><h2 id="delivery-title">Tudo certo por aqui.</h2><div className="delivery-row"><span><MapPin size={20} /></span><div><small>Seu endereço de entrega</small><p><strong>{order.address.street}, {order.address.number}</strong><br />{order.address.complement && <>{order.address.complement}<br /></>}{order.address.neighborhood} · {order.address.city}, {order.address.state}<br />CEP {order.address.cep}</p></div></div><div className="delivery-row"><span><Timer size={20} /></span><div><small>Previsão ilustrativa de entrega</small><p><strong>20–30 minutos</strong></p></div></div><div className="delivery-row"><span><CreditCard size={20} /></span><div><small>Pagamento na entrega</small><p><strong>{paymentLabels[order.address.payment]}</strong></p></div></div><p className="fiction-note">Pedido fictício de um projeto acadêmico. Não haverá cobrança nem entrega real.</p></section>
      <section className="success-receipt" aria-labelledby="receipt-title"><div className="receipt-art" aria-hidden="true"><div className="receipt-art-circle"><Bike size={84} strokeWidth={1} /><span><Coffee size={22} /></span></div><p>Café bom.<br /><em>Momento melhor.</em></p></div><div className="receipt-content"><h2 id="receipt-title">Um resumo da sua pausa</h2><ul>{order.items.map(item => <li key={item.productId}><span>{item.quantity}× {item.name}</span><strong>{formatMoney(item.price * item.quantity)}</strong></li>)}</ul><div className="receipt-delivery"><span>Entrega</span><span>{formatMoney(order.delivery)}</span></div><div className="receipt-total"><span>Total do pedido</span><strong>{formatMoney(order.total)}</strong></div></div></section>
    </div><Link to="/" className="button success-return">Voltar para os cafés <ArrowUpRight size={18} /></Link>
  </div>
}
