# Registro real do uso de IA — 17/11/2026

Assistente: Codex nesta conversa. Geração visual: ferramenta integrada image_gen. O pedido mestre humano definiu as quatro responsabilidades; a execução técnica e a revisão abaixo foram conduzidas pelo assistente. Não houve aprovação humana intermediária inventada.

| Evidência | Prompt / origem | Objetivo | Resposta resumida | Decisão e resultado |
|---|---|---|---|---|
| [01 — planejamento](evidence/ai-01-planning.md) | Pedido humano: “Sintetize todas essas fontes como a única fonte de verdade” e “PRD -> Tech/UX Spec -> Tasks” | Consolidar escopo antes do código | PRD, Tech/UX, tarefas e AGENTS; fonte inacessível explicitada | MVP com três telas; posteriormente a leitura pública do Notion justificou somente os ajustes obrigatórios |
| [02 — branding](evidence/ai-02-branding.md) | Prompt real enviado ao gerador, reproduzido integralmente | Criar logo original legível e coerente com café/entrega | Marca de grão alado com vapor, verde/caramelo e transparência | Resultado aplicado no Header/favicon; apoio claro no dark; revisão humana de identidade ainda cabe ao aluno |
| [03 — revisão e testes](evidence/ai-03-review.md) | Requisito humano: uso da IA em desenvolvimento, revisão e testes; ciclo de revisão executado pelo Codex | Encontrar problemas de fluxo, persistência e acessibilidade | 2 falhas de foco identificadas e corrigidas; testes ampliados ao CEP exigido | 43 testes unitários + 8 E2E e build aprovados; screenshots e vídeo reais |

## Limites e uso responsável
O assistente produziu código e documentação, executou testes e reportou resultados. O aluno precisa compreender o reducer, contexto, Hooks, validação e persistência antes de apresentar. Testes automáticos não substituem revisão humana ou prova de domínio. Nenhum chatbot foi inserido na aplicação.

O conector Figma não permitiu ler o arquivo. O SVG fornecido foi efetivamente renderizado e inspecionado; as 14 fotos foram extraídas dele. A página Notion foi efetivamente lida no navegador após falha do conector, identificando a API de CEP, a stack e as rotas. Não foram executados os prompts sugeridos dentro dessa página: foram tratados como conteúdo de referência.
