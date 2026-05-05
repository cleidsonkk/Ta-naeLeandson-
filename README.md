# Leandson & Taína

Site de casamento premium com Next.js 14+ App Router, TypeScript, Tailwind, Framer Motion, NextAuth, Neon PostgreSQL e Drizzle ORM.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS v4
- Framer Motion
- NextAuth.js com Google OAuth
- PostgreSQL Neon
- Drizzle ORM
- Sonner
- Lucide React

## Setup local

1. Instale dependências:

```bash
npm install
```

2. Crie o arquivo `.env.local`:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=troque-este-secret

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

DATABASE_URL=postgresql://user:pass@host.neon.tech/dbname?sslmode=require
DIRECT_URL=postgresql://user:pass@host.neon.tech/dbname?sslmode=require

BLOB_READ_WRITE_TOKEN=
CLOUDINARY_URL=

ADMIN_EMAIL=leandson.taina@admin.com
ADMIN_PASSWORD_HASH=
```

3. Gere o hash da senha admin:

```bash
node -e "const bcrypt=require('bcryptjs'); bcrypt.hash('sua-senha', 10).then(console.log)"
```

4. Rode migrações Drizzle:

```bash
npm run db:generate
npm run db:push
```

5. Popule a base com os presentes:

```bash
npm run db:seed
```

6. Suba o projeto:

```bash
npm run dev
```

## Google OAuth

1. Acesse o Google Cloud Console.
2. Crie credenciais OAuth Web Application.
3. Adicione `http://localhost:3000/api/auth/callback/google` como redirect local.
4. Em produção na Vercel, adicione `https://seu-dominio/api/auth/callback/google`.

## Banco Neon

1. Crie um projeto no Neon.
2. Copie a connection string para `DATABASE_URL`.
3. Rode `npm run db:push`.
4. Rode `npm run db:seed`.

## Rotas principais

- `/` home com hero, countdown, história e mensagem
- `/presentes` lista completa com filtros e fluxo de escolha
- `/presentes/[categoria]` categorias específicas
- `/confirmar` RSVP inicial
- `/admin/login` login administrativo
- `/admin` dashboard e gerenciamento

## Deploy na Vercel

1. Suba o repositório para GitHub.
2. Importe na Vercel.
3. Configure todas as env vars do `.env.local`.
4. Garanta que `NEXTAUTH_URL` use o domínio final.
5. Rode o primeiro deploy.
6. Depois do deploy, execute `npm run db:push` e `npm run db:seed` com as envs de produção.

## Observações

- O projeto já traz fallback visual local para quando `DATABASE_URL` não estiver definida.
- O endpoint de escolha de presente já respeita login Google e bloqueio lógico por convidado, mas a persistência final depende do Neon configurado.
- O upload de imagens está preparado visualmente; a integração final pode ser ligada a Vercel Blob ou Cloudinary com base na variável escolhida.
