import { Moon, ShoppingBag, Sun } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTheme } from './ThemeProvider'
import logo from '../assets/logo.png'

export function Header({ count = 0 }: { count?: number }) {
  const { theme, toggle } = useTheme()
  return <header className="site-header"><div className="header-inner container">
    <Link to="/" className="brand" aria-label="Coffee Delivery — início"><img src={logo} alt="" /><span className="brand-name">coffee<small>delivery</small></span></Link>
    <span className="header-caption">Uma pausa boa muda o seu dia.</span>
    <nav className="header-actions" aria-label="Navegação principal">
      <button className="icon-button" onClick={toggle} aria-label={theme === 'light' ? 'Ativar modo escuro' : 'Ativar modo claro'}>{theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}</button>
      <Link to="/checkout" className="cart-link" aria-label={`Carrinho com ${count} ${count === 1 ? 'item' : 'itens'}`}><ShoppingBag size={18} /><span className="cart-label">Meu carrinho</span><span className="cart-count">{count}</span></Link>
    </nav>
  </div></header>
}
