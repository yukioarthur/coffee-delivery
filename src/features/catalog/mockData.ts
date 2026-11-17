import coffee1 from '../../assets/coffees/coffee-1.png'
import coffee2 from '../../assets/coffees/coffee-2.png'
import coffee3 from '../../assets/coffees/coffee-3.png'
import coffee4 from '../../assets/coffees/coffee-4.png'
import coffee5 from '../../assets/coffees/coffee-5.png'
import coffee6 from '../../assets/coffees/coffee-6.png'
import coffee7 from '../../assets/coffees/coffee-7.png'
import coffee8 from '../../assets/coffees/coffee-8.png'
import coffee9 from '../../assets/coffees/coffee-9.png'
import coffee10 from '../../assets/coffees/coffee-10.png'
import coffee11 from '../../assets/coffees/coffee-11.png'
import coffee12 from '../../assets/coffees/coffee-12.png'
import coffee13 from '../../assets/coffees/coffee-13.png'
import coffee14 from '../../assets/coffees/coffee-14.png'

export type Coffee = { id: string; name: string; description: string; tags: string[]; price: number; image: string }
export const coffees: Coffee[] = [
  { id: 'tradicional', name: 'Expresso Tradicional', description: 'O clássico que abraça: café puro, intenso e feito na medida.', tags: ['Tradicional'], price: 990, image: coffee1 },
  { id: 'americano', name: 'Expresso Americano', description: 'A intensidade do expresso em uma versão mais leve e suave.', tags: ['Tradicional'], price: 990, image: coffee2 },
  { id: 'cremoso', name: 'Expresso Cremoso', description: 'Seu expresso de sempre, com uma camada extra de cremosidade.', tags: ['Tradicional'], price: 990, image: coffee3 },
  { id: 'gelado', name: 'Expresso Gelado', description: 'Café intenso com gelo para refrescar a sua pausa.', tags: ['Tradicional', 'Gelado'], price: 1090, image: coffee4 },
  { id: 'leite', name: 'Café com Leite', description: 'A dupla que faz sentir em casa: café e leite bem quentinho.', tags: ['Tradicional', 'Com leite'], price: 1190, image: coffee5 },
  { id: 'latte', name: 'Latte', description: 'Expresso com leite vaporizado e uma espuma delicada.', tags: ['Tradicional', 'Com leite'], price: 1290, image: coffee6 },
  { id: 'capuccino', name: 'Capuccino', description: 'Café, leite cremoso e um toque de canela. Uma pausa completa.', tags: ['Tradicional', 'Com leite'], price: 1290, image: coffee7 },
  { id: 'macchiato', name: 'Macchiato', description: 'Expresso marcante finalizado com uma nuvem de leite.', tags: ['Tradicional', 'Com leite'], price: 1290, image: coffee8 },
  { id: 'mocaccino', name: 'Mocaccino', description: 'Café e chocolate com leite cremoso para adoçar o dia.', tags: ['Tradicional', 'Com leite'], price: 1490, image: coffee9 },
  { id: 'chocolate', name: 'Chocolate Quente', description: 'Chocolate aveludado com leite. Aconchego em uma xícara.', tags: ['Especial', 'Com leite'], price: 1390, image: coffee10 },
  { id: 'cubano', name: 'Cubano', description: 'Café gelado com rum, creme de leite e um toque de hortelã.', tags: ['Especial', 'Alcoólico', 'Gelado'], price: 1690, image: coffee11 },
  { id: 'havaiano', name: 'Havaiano', description: 'O encontro do café com a suavidade do leite de coco.', tags: ['Especial'], price: 1490, image: coffee12 },
  { id: 'arabe', name: 'Árabe', description: 'Café com especiarias e uma personalidade que surpreende.', tags: ['Especial'], price: 1490, image: coffee13 },
  { id: 'irlandes', name: 'Irlandês', description: 'Café com uísque irlandês e creme: um clássico especial.', tags: ['Especial', 'Alcoólico'], price: 1690, image: coffee14 },
]

export const getCoffee = (id: string) => coffees.find(coffee => coffee.id === id)
