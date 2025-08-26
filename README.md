# Server

Sistema criado utilizando React, Vite, Node.js (Express), com banco de dados Supabase.

## Servidores instanciados no projeto

Na execução do projeto é instanciado dois servidores: um backend utilizando Express (Node.js) e um frontend com React (Vite).

- Express (Node.js):
  - Servidor estrutrado para lidar diretamente com as rotas da API (`server.js`);
  - Integra com banco de dados Supabase (`supbaseClient.server.js`);
  - Lida com arquivos via Multer;
  - Exclusivo para ambiente local.

- Vite (React):
  - Servidor configurado para redirecionar as API's (`/api`) para o servidor Express local;
  - Lida diretamente com o browser e interação com usuários.

Em produção (Vercel) a estrutura se adapta ao 'ambiente serverless da Vercel', sendo cada rota da API transformada em uma função isolada a partir da pasta (`/api`), tornando desnecessário o uso do servidor Express.

---

## 📁 Estrutura do Projeto

```
├── api/                                   # Todas APIs declaradas
├── api/clients/supabaseClient.server.js   # Cliente Supabase (backend)
├── src/                                   # Toda estrutura frontend
├── src/utilities/supabaseClient.js        # Cliente Supabase (frontend)
├── server.js                              # Servidor Express (desenvolvimento local)
├── .env                                   # Variáveis de ambiente
├── vite.config.js                         # Configuração Vite
├── package.json                           # Scripts e dependências
```

---

## ⚙️ Execução do Projeto

### Desenvolvimento local

```bash
npm install
npm run dev
```

O comando (`npm run dev`) executa simultaneamente:
- Express na porta `3000` (API local);
- Vite na porta `5173` (React);

Requisição para `/api` são redirecionadas para o backend via proxy:
```js
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
            }
        }
    }
```

Execução simultânea devido (`package.json`) com 'concurrently':
```json
"scripts": {
  "dev": "concurrently -k \"npm:dev:server\" \"npm:dev:client\"",
  "dev:server": "node server.js",
  "dev:client": "vite",
  "build": "vite build",
  "preview": "vite preview"
}
```

### Produção (Vercel)

- A pasta `/api/` é usada pela Vercel para criar funções serverless.
- O arquivo `server.js` é ignorado no deploy.

---

## 🌐 Variáveis de Ambiente (.env)

| Variável              | Uso                       |
| --------------------- | ------------------------- |
| NODE_ENV              | Ambiente (dev/prod)       |
| PORT                  | Porta local (dev)         |
| CORS_ORIGIN           | CORS do front             |
| ADMIN_PASSWORD_HASH   | Senha admin (bcrypt hash) |
| JWT_ACCESS_SECRET     | JWT access                |
| JWT_REFRESH_SECRET    | JWT refresh               |
| SUPABASE_URL          | Supabase URL              |
| SUPABASE_KEY          | Supabase Key              |
| CLOUDINARY_CLOUD_NAME | Cloudinary Name           |
| CLOUDINARY_API_KEY    | Cloudinary Key            |
| CLOUDINARY_API_SECRET | Cloudinary secret         |
| VITE_MAPBOX_TOKEN     | Mapbox (frontend)         |

- Usar `dotenv` para carregar no backend.
- As variáveis são acessadas pelo React via `import.meta.env`.

---

## 🧩 Principais Arquivos

### server.js
Servidor Express que fornece rotas locais para desenvolvimento:
- Usa `express` para rotas HTTP.
- `multer` para upload de arquivos em memória.
- `@supabase/supabase-js` para integração com Supabase.
- Ignorado em produção.

### vite.config.js
- Define proxy para `/api` → `http://localhost:3000`.
- Configura o plugin React para Vite.

### supabaseClient.js
- Cliente do Supabase usado no frontend.
- Usa variáveis `VITE_` (visíveis ao browser).

### supabaseClient.server.js
- Cliente do Supabase usado no backend.
- Usa variáveis privadas com `process.env`.

### package.json
- Scripts principais:
  - `dev`: roda client e server juntos.
  - `dev:server`: inicia Express.
  - `dev:client`: inicia Vite.
- Usa `concurrently`, `dotenv`, `supabase-js`, entre outros.

---

## ✅ Tecnologias e Bibliotecas

- React + Vite
- Express
- Supabase
- Multer
- Cloudinary
- Dotenv
- Concurrently

---

## 📌 Observações

- A estrutura tá pronta para escalar com novas rotas e páginas react;
- Em produção (Vercel), cada função na pasta `/api/` deve ser isolada (compatível ao ambiente serverless).

---

## ✍️ Licença

Este projeto está licenciado sob a Licença MIT.
