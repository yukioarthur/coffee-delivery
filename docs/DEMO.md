# Demonstração do fluxo

[Vídeo real do teste de compra](evidence/demo-compra.webm). Reprodução rápida e automatizada, com endereço fictício e resposta ViaCEP interceptada; screenshots permitem examinar cada estado com calma.

Para apresentar ao professor:
1. Na Home, aumentar Expresso Tradicional para 2 e adicionar; adicionar 1 Latte. O badge deve mostrar 3 unidades.
2. Atualizar a página para demonstrar persistência.
3. No checkout, aumentar/diminuir um produto e explicar subtotal e frete fixo. Total de 2 expressos + 1 latte: R$ 36,20.
4. Tentar confirmar vazio e mostrar os erros. Informar um CEP conhecido e aguardar a consulta pública; conferir dados e preencher número/complemento. Não usar endereço pessoal em gravações compartilhadas.
5. Selecionar pagamento, mudar para dark e mostrar a adaptação no celular.
6. Confirmar e explicar o snapshot independente. Recarregar a confirmação e abrir o carrinho vazio.

Pontos para explicar: Props em CoffeeCard; ações imutáveis do reducer; Context API; Hooks de tema/carrinho/CEP; cálculos em centavos; RHF + Zod; LocalStorage versus SessionStorage; cancelamento de consultas; limites da simulação e da IA.
