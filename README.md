# RS Simulador

Aplicação estática de estudo para montar um objeto temporário de imóvel. Não é um painel administrativo e não possui conexão com o site da corretora.

## Executar

Requisitos: Node.js 20.19+ e npm.

```sh
npm ci
npm run dev
```

`npm run build` gera `dist/`; `npm run preview` serve o build local. `npm test` valida o modelo e `npm run lint` verifica o código.

## Funcionamento

1. Preencha as sete etapas: básico, endereço, detalhes, apartamentos, condomínio, plantas e imagem principal.
2. Os tipos, construtoras e situações são opções fictícias do próprio simulador.
3. Imagens são arquivos locais, sem upload. Cada galeria aceita até 20 imagens de até 10 MB (JPEG, PNG, WebP, GIF ou AVIF).
4. `Gerar objeto` apresenta a prévia e o JSON. `Voltar ao formulário` permite ajustar a mesma simulação; `Reiniciar` descarta os dados.
5. Tudo fica na memória da página. Recarregar ou fechar a aba apaga os dados; não há rascunho persistente ou catálogo compartilhado.
6. O JSON copiado contém metadados dos arquivos, não os bytes das imagens nem endereços blob reutilizáveis. Não é uma exportação completa para outro site.

## Endereço e mapa

O endereço pode ser preenchido manualmente, sem serviços externos. Coordenadas são opcionais.

Para habilitar o mapa, configure apenas o token público `VITE_MAPBOX_TOKEN` conforme `.env.example`. O mapa carrega exclusivamente quando solicitado e consulta Mapbox/ViaCEP. Falhas nesses serviços não impedem o preenchimento manual.

## Independência

Não existem backend Express, login administrativo, CRUD remoto, SDK do Supabase, upload/exclusão no Cloudinary ou vínculo com `rscorretora`. A hospedagem entrega apenas arquivos estáticos; rotas `/api/*` retornam 404.

Não adicione chaves privadas em variáveis `VITE_*`: essas variáveis entram no código público. O histórico do projeto registra a antiga implementação; ela não deve ser implantada novamente com credenciais reais.
