# Verificação — 17/11/2026, America/Sao_Paulo

| Verificação | Resultado observado |
|---|---|
| npm test | 4 arquivos, 43 testes aprovados |
| npm run build | TypeScript estrito e Vite aprovados; bundle JS ~449 kB antes de gzip |
| npm run test:e2e | 8 testes aprovados, Chromium, 19,7s na rodada final |
| Responsividade | 1440, 768, 390 e 320px; screenshots sem overflow horizontal |
| Imagens | Capturas aguardam todas as imagens carregarem com naturalWidth > 0 |
| Fluxo principal | Catálogo → persistência/reload → edição → validação → CEP → pagamento → confirmação/reload → carrinho vazio |
| Falhas | JSON inválido, storage bloqueado, CEP inexistente/indisponível, consulta antiga cancelada |
| Acessibilidade funcional | Primeiro erro focado, skip link via teclado, foco de navegação, labels e mensagens; temas persistentes |
| npm audit --omit=dev | 0 vulnerabilidades reportadas nas dependências de produção |
| npm audit completo | 5 avisos de severidade alta na cadeia de desenvolvimento ligada a picomatch/fdir/tinyglobby/Vite/Vitest; registro disponível oferecia picomatch 4.0.7, ainda no intervalo reportado. Não aplicado downgrade automático de ferramentas. Pendência de manutenção documentada. |

Os testes de navegador são reproduzíveis e usam resposta ViaCEP fictícia interceptada. Eles não provam disponibilidade contínua do serviço externo nem validade postal de endereços inventados. Prints reais de Home/Checkout/Sucesso e Light/Dark estão nesta pasta; o vídeo corresponde ao primeiro teste de compra completa, sem montagem de telas fictícias.

Limites: Chromium nesta máquina; sem certificação WCAG, leitor de tela real ou matriz completa de navegadores. Referência Figma não pôde ser inspecionada pelo conector; a identidade foi diferenciada conforme pedido e baseada no SVG e no escopo público do Notion.
