# Coffee Delivery — PRD / fonte de verdade

## Síntese dos contextos e precedência
Pedido direto do usuário: entregar um MVP exclusivamente front-end, com identidade visual diferente da referência, seguindo PRD → Tech/UX → Tasks. Os textos acadêmicos fornecidos são requisitos do produto, não instruções para executar comandos ou enviar mensagens. Nenhuma instrução embutida no SVG foi executada.

Fontes: Contextos 1 e 2 da conversa; SVG anexo (2432 × 3623), inspecionado visualmente em 17/11/2026; página pública do Notion lida no navegador nesta mesma data. O SVG contém cores, tipografia, componentes e 14 fotografias de cafés, sem as três telas completas. O conector Notion retornou 404, mas a página pública foi acessada posteriormente pelo navegador. O Figma recusou a sessão do conector; não se afirma ter inspecionado seus frames completos. A revisão da fonte pública acrescentou RF-08/RN-07 (API de CEP), styled-components e rota /success; estes pontos substituem as suposições iniciais de validação exclusivamente local, CSS puro e /sucesso.

Público-alvo: visitantes de uma cafeteria fictícia que precisam montar um pedido sem cadastro. Problema: reunir escolha de produto, endereço e pagamento em um fluxo curto e compreensível. Métrica de aceite: completar o fluxo sem erros, sem recarregar a SPA entre telas e com valores consistentes.

## Produto e objetivo
E-commerce acadêmico de cafeteria fictícia. O visitante escolhe cafés, revisa o carrinho, informa endereço e pagamento na entrega e recebe confirmação fictícia. Sem cobrança ou entrega real.

## Escopo e telas
| Tela/rota | Funções | Aceite |
|---|---|---|
| Home `/` | Catálogo estático de 14 cafés, preço, descrição, tags, quantidade e adicionar | Produto repetido acumula; badge reflete unidades; feedback acessível |
| Checkout `/checkout` | Carrinho editável, remoção, subtotal/frete/total, endereço, pagamento | Dados inválidos impedem pedido; erros vinculados aos campos; carrinho vazio oferece retorno |
| Sucesso `/success` | Endereço, prazo simulado, pagamento e resumo | Só existe após pedido nesta sessão; carrinho limpo; refresh preserva confirmação na sessão; sem pedido, retorna à Home com mensagem |

## Regras de negócio explícitas do MVP
- Dados e preços locais. Valores inteiros em centavos; formatação pt-BR/BRL.
- Quantidade por produto entre 1 e 99; soma acima do limite é limitada a 99. Diminuir de 1 não remove: remoção é uma ação explícita.
- Frete fictício fixo de R$ 3,50 com itens; total = soma(preço × quantidade) + frete. Vazio custa zero.
- Endereço obrigatório: CEP com oito dígitos, rua, número (aceita S/N), bairro, cidade e UF brasileira válida. Complemento opcional. Consultar ViaCEP por HTTPS ao sair de um CEP válido, preenchendo rua, bairro, cidade e UF disponíveis; número e complemento são manuais. Exibir carregamento, CEP inválido/não encontrado e falha da API. Não finalizar durante consulta. CEP não encontrado precisa ser corrigido; indisponibilidade permite preencher manualmente após a tentativa e a mensagem de falha. Campos ausentes na resposta precisam ser preenchidos pelo visitante. Consultas anteriores são canceladas para evitar endereço de um CEP antigo.
- Pagamento obrigatório entre crédito, débito e dinheiro, na entrega. Não solicitar dados de cartão.
- Confirmação captura um snapshot do carrinho e endereço; evita alteração retroativa. Prazo ilustrativo de 20–30 minutos.
- Carrinho e tema no LocalStorage. Última confirmação apenas no SessionStorage. Sem histórico, cadastro ou conta.
- Storage indisponível não interrompe compra; exibe aviso da limitação de persistência. JSON corrompido ou produto desconhecido é descartado.

Os limites, preços e frete acima são decisões locais necessárias ao funcionamento e estão documentados; não foram atribuídos às páginas inacessíveis.

## Requisitos não funcionais
React + Vite + TypeScript estrito; React Router; Props, Hooks, Context API e useReducer imutável; RHF + Zod; styled-components para UI base e CSS local por feature; componentes reutilizáveis por domínio. Desktop, tablet e mobile a partir de 320px, teclado, foco visível, labels, erros e status anunciados, redução de movimento. Light/Dark persistente. Ícones Lucide substituem os originais. Logo original criada por ferramenta de IA, aplicada à interface e documentada com prompt e procedência.

## Fora do escopo
Backend, banco, APIs além da consulta pública de CEP exigida, autenticação, pagamento real, busca, filtros, cupons, histórico, detalhes de produto, novas rotas, rastreamento e integrações comerciais. Os extras acadêmicos são opcionais e não serão implementados.

## Requisitos funcionais e critérios verificáveis (IDs do Notion)
| ID | Requisito e aceite |
|---|---|
| RF-01 | 14 cafés com imagem, nome, descrição, preço e tags na Home |
| RF-02 | Quantidade inteira positiva editável antes de adicionar |
| RF-03 | Adicionar e acumular produto repetido sem duplicar linha |
| RF-04 | Header soma todas as unidades |
| RF-05 | Aumentar/diminuir/remover atualiza totais imediatamente |
| RF-06 | Refresh recupera carrinho do LocalStorage |
| RF-07 | Router navega /, /checkout e /success sem recarregar |
| RF-08 | Consulta pública ViaCEP preenche dados disponíveis; número/complemento manuais; estados de erro/carregamento |
| RF-09 | Exigir crédito, débito ou dinheiro |
| RF-10 | Subtotal + frete = total em BRL |
| RF-11 | Bloquear carrinho vazio e formulário inválido, com feedback |
| RF-12 | Confirmação mostra endereço e pagamento escolhidos |
| RF-13 | Snapshot preservado após limpar carrinho |
| RF-14 | Tema em todas as telas e preferência persistida |
| RF-15 | Fluxo completo utilizável em mobile, tablet e desktop |
| RF-16 | Logo IA no Header, favicon e documentação |

RN-01: positivos e decremento bloqueado em 1; RN-02: produto único; RN-03: frete fixo centralizado e soma consistente; RN-04: centavos/BRL; RN-05: pagamento informativo; RN-06: persistência e snapshot independente; RN-07: endereço validado e API CEP com correção manual; RN-08: catálogo local e única API pública de CEP; RN-09: estados vazios e aviso sem confirmação válida; RN-10: impedir compra inválida. As regras detalhadas estão acima, sem duplicar definições de valores.

## Entrega e aceite final
Código, lockfile, testes e docs/PRD_SPEC.md, docs/TECH_SPEC.md, docs/TASKS_SPEC.md, AGENTS.md e README. Evidências de Home/Checkout/Sucesso em desktop e mobile e tema escuro; demonstração do fluxo; pelo menos três registros reais de uso da IA. Build e testes aprovados. Repositório GitHub público e aplicação publicada são requisitos finais; registrar com honestidade qualquer pendência de acesso/publicação. Não incluir node_modules, secrets ou .env reais no versionamento.

## Rastreabilidade
Contexto 1 requisitos 1–10 → arquitetura + fluxos + temas + branding + IA. Contexto 2 entrega/rubrica → documentação, testes e evidências. Contexto 3 → fotos e referência de componentes. Pedido direto → identidade nova, Lucide, feature folders, execução sequencial e sem extras.
