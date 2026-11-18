# Task 08 — consulta pública de CEP

Status: concluída — 43 testes unitários e 7 E2E aprovados após consulta CEP.

Objetivo: atender RF-08/RN-07/RN-08 identificados na consulta da página pública do Notion.

Arquivos: features/checkout/cep.ts, useCepLookup.ts, Checkout.tsx, OrderSummary.tsx, schema.ts e testes associados; estilos de checkout.

Aceite: preencher campos disponíveis; número/complemento manuais; loading, erro de formato, não encontrado, indisponibilidade e timeout; cancelamento de requisições antigas; confirmação protegida; testes com respostas interceptadas.
