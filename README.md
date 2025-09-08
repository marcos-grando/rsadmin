# RSAdmin

Sistema criado utilizando React, Vite, Node.js (Express), com banco de dados Supabase.

## Servidores instanciados no projeto

Na execução do projeto é instanciado dois servidores: um backend utilizando Express (Node.js) e um frontend com React (Vite).

- Express (Node.js):
  - Servidor estrutrado para lidar diretamente com as rotas da API (`app.js`);
  - Integra com banco de dados Supabase (`supbaseClient.server.js`);
  - Lida com arquivos via Multer;

---

## 📁 Estrutura do Projeto

```
├── api/                                   # centraliza as apis (Vercel)
│   └── index.js                           # repassa para app.js (app, { basePath: '/api' })
├── server/                                # todas as apis reais
│   ├── auth/                              # apis de autênticação
│   ├── supabase/                          # apis de crud
├── helpers/                               # funções auxiliares/helpers
│   ├── clients/                           # instanciamento do servidor cloudinary/supabase
│   ├── cloudinary/                        # upload/delete de imagens
│   └── util/                              # funções úteis no geral
├── src/                                   # frontend (React + Vite)
├── app.js                                 # todas rotas declaradas
└── .env.example                           # Como deve ficar .env
```

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
- Usar .env.example como modelo.

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

- Esse é um projeto piloto e está em desenvolvimento.
- Maior parte do projeto foi desenvolvido utilizando ferramentas novas para mim (exceto o Frontend puro).
