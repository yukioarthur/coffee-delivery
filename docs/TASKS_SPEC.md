# TASKS_SPEC — acompanhamento

Executar uma tarefa de implementação por vez. Specs canônicas: [PRD](01-prd.md) e [Tech/UX](02-tech-ux-spec.md).

- [x] 01 Setup e design system
- [x] 02 Home e catálogo
- [x] 03 Carrinho e persistência
- [x] 04 Checkout validado
- [x] 05 Sucesso
- [x] 06 Testes, revisão e evidências — 43 testes unitários, 8 E2E e build aprovados
- [ ] 07 Documentação, Git e publicação
- [x] 08 Consulta CEP obrigatória — escopo confirmado na página pública do Notion
- [x] 09 Alinhamento styled-components, /success e aviso sem pedido

Ordem da revisão final: 08 → 09 → revalidar 06 → concluir 07. A fonte completa só ficou acessível no navegador após a primeira rodada local; as novas obrigações foram registradas antes dessas alterações.

Detalhes e critérios de conclusão em [tasks](tasks/).







## Rastreabilidade das tarefas

| ID | Objetivo / requisitos | Arquivos principais | Pronto |
|---|---|---|---|
| 01 | Base, temas, RF-14–16 | main, styles, layouts, UI | Build inicial aprovado |
| 02 | Catálogo RF-01–03 | features/catalog | 14 cafés, responsivo |
| 03 | Carrinho RF-03–06, RN-01–06 | features/cart | Operações e persistência seguras |
| 04 | Formulário RF-08–11 | features/checkout | Endereço/pagamento/totais válidos |
| 05 | Confirmação RF-12–13, RN-09 | features/success | Snapshot, refresh, vazio |
| 06 | Qualidade RF-01–16 | tests, *.test.ts, evidence | Build, 43 unitários e 8 E2E aprovados |
| 07 | Entrega e documentação | README, docs, Git/hosting | Links e evidências verificadas |
| 08 | Consulta CEP RF-08, RN-07–08 | cep, useCepLookup, Checkout | Preenchimento, erros, loading e cancelamento testados |
| 09 | Stack e rotas RF-07, RN-09 | Button, App, Success | Styled-components e /success; build aprovado |
