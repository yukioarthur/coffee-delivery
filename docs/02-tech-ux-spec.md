# Coffee Delivery — especificação técnica e UX

## Arquitetura
SPA estática, React 19, TypeScript, Vite. BrowserRouter com /, /checkout e /success; caminhos desconhecidos redirecionam à Home sem criar tela extra. Hosting precisa de fallback SPA (Vercel e Netlify configurados). Styled-components estiliza Button e o link reutilizável de ação, com tokens CSS; as features mantêm CSS local. A abordagem híbrida atende à stack solicitada sem converter os domínios em um arquivo único.

```text
src/
  assets/                 # fotos extraídas do SVG fornecido, logo IA, fontes locais
  components/ui/          # Button, QuantityControl, Price, EmptyCart
  features/catalog/       # Home, CoffeeCard, mockData.ts
  features/cart/          # tipos, reducer, storage, contexto e hook
  features/checkout/      # schema, formulário, resumo, consulta ViaCEP e hook
  features/success/       # confirmação e armazenamento de sessão
  layouts/                # header, footer, tema
  App.tsx                 # rotas e acessibilidade na navegação
```

Estado: CartProvider usa useReducer com ADD, SET_QUANTITY, REMOVE, CLEAR e inicializador seguro do LocalStorage. Preços e descrições vêm apenas do catálogo, nunca do JSON armazenado. Contexto oferece dispatch, itens e totais derivados. Hook useCart valida o provider. Quantidade provisória de um card é local via useState. Tema em contexto simples; endereço só no RHF; pedido concluído em SessionStorage para refresh. Sem persistir endereço em LocalStorage.

## Design system e diferenciação
Direção editorial de cafeteria: fundo creme #f7f5ef, superfície #ffffff, verde profundo #213c32, texto #25372f, caramelo #a95c32. Tema escuro: fundo #151e19, superfície #202c24, texto #f4f0e6, acento menta #b9d1a8. Tokens semânticos em CSS.

Tipografia: Fraunces para títulos e DM Sans para corpo, instaladas como pacotes e servidas localmente. Hierarquia 56–64px desktop e 38px mobile no hero. Conteúdo máximo 1200px. Grid 4 colunas desktop, 2 tablet, 1 mobile estreito. Cards com fotografia real, descrição, tags e área de compra consistente. Hero bento com texto e grande imagem de café; sem chamadas de funções extras. Ícones Lucide com tamanho/peso consistentes.

Header: marca leva à Home, tema alterna, carrinho leva ao checkout. Checkout divide formulário e resumo em desktop e empilha no mobile. Sucesso mantém a mesma identidade com selo de confirmação, endereço e próximos passos fictícios.

## Interações e acessibilidade
Botões reais com nomes descritivos, hit areas de 44px, estado disabled nos limites, foco visível. Tags informativas, sem filtros falsos. Feedback em role=status ao adicionar/remover. Labels persistentes, erro com aria-describedby e aria-invalid; RHF foca o primeiro erro. Pagamento com radio nativo em fieldset. Link de pular para conteúdo. Navegação altera título, rola ao topo e foca o main. Animações discretas desativadas por prefers-reduced-motion. Vazio explica como iniciar a compra. Não imitar campos de localização ou links sem ação.

## Consulta CEP (RF-08, RN-07/RN-08)
Única API externa: GET https://viacep.com.br/ws/{cep}/json/. Apenas oito dígitos são enviados; endereço completo e número não são transmitidos. Validar formato antes de chamar; Zod valida a resposta. Hook useCepLookup gerencia idle/loading/success/invalid/not-found/error, timeout de 8s, AbortController e identificação de consulta para não aplicar resposta antiga. Resposta sem rua/bairro exige preenchimento manual. Número/complemento nunca são sobrescritos. Permitir nova tentativa e fallback manual em indisponibilidade; CEP não encontrado bloqueia confirmação até correção. Desabilitar CTA durante consulta. Testes E2E interceptam a API para dados fictícios reproduzíveis; uma consulta real separada verifica conectividade, sem tornar os testes dependentes do serviço.

## Tipos e rastreabilidade
Coffee: catálogo com id/name/description/tags/price/image (RF-01). CartItem: productId/quantity (RF-02–06); DeliveryAddress: CEP/rua/número/complemento/bairro/cidade/UF; PaymentMethod: credit/debit/cash (RF-08–09). CheckoutData une endereço e pagamento para RHF. Order contém id, data, cópias de endereço/itens e totais (RF-10–13). CartProvider/reducer atende RN-01–06 e RN-10; Router RF-07/RN-09; temas/layout RF-14–15; assets/branding RF-16.

## Validação e integridade
Zod normaliza textos com trim, CEP com regex, UF em enum de 27 estados, pagamento em enum. Cálculos em centavos. Estado reidratado é limitado e sanitizado; ações inválidas não mutam objetos. Pedido construído com itens clonados; validação de sessão protege renderização contra JSON inválido. Checkout sem itens nunca cria pedido.

## Testes
Vitest: operações imutáveis do reducer, limites, hidratação corrompida e totais; schema: inválidos, CEP, UF e pagamento. Playwright: fluxo real catálogo → persistência/reload → edição → validação → pedido → confirmação/reload → carrinho limpo, tema persistente e storage bloqueado. Screenshots desktop (1440), tablet (768), mobile (390 e 320), sem overflow. Verificar console, imagens carregadas e teclado. Os testes não validam serviço postal ou pagamento, que não existem.

## Publicação
Build estático em dist, sem secrets. Configurações para Vercel/Netlify e GitHub Actions de testes/build. Sites é opção equivalente de prévia publicada; audiência deve ser informada e não pode ser confundida com deploy público. GitHub público depende de um destino de repositório disponível.
