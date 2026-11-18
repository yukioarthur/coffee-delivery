# Evidência 03 — revisão e depuração com IA

Origem: solicitação humana de uso de IA em planejamento, desenvolvimento, revisão e testes. Este ciclo foi executado autonomamente pelo Codex, sem inventar uma nova pergunta ou aprovação do aluno.

Objetivo: comprovar o fluxo funcional e corrigir falhas observadas. Primeira rodada: 36 testes unitários aprovados; 2 de 5 E2E falharam em foco. Falhas reais: CEP não recebia foco como primeiro erro visual; primeiro Tab não chegava ao link de pular conteúdo porque o main era focado no carregamento inicial.

Resposta/decisão: definir ordem explícita do primeiro erro no RHF e focar main apenas nas mudanças de rota. A segunda rodada passou nos 5 E2E. Após a leitura completa do Notion, foram adicionados 7 testes unitários de CEP e 3 E2E de preenchimento, falha/carregamento e cancelamento de consulta antiga. O build também revelou tipos de imagem genéricos em evaluateAll nos testes; o código passou a estreitar com instanceof HTMLImageElement.

Resultado final observado: 43 unitários, 8 E2E e build aprovados. [Verificação](verification.md), [vídeo real](demo-compra.webm) e screenshots nesta pasta. Os E2E usam API interceptada para dados fictícios e reprodução. Não se afirma teste manual por uma pessoa, auditoria completa WCAG ou aprovação do professor.
