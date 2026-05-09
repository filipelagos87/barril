# Barril Choperia

Site one-pager institucional do Barril Choperia (Shopping Sul, Bancários — João Pessoa/PB) com painel admin para edição de cardápio, galeria e textos.

## Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS 3
- Supabase (Postgres + Auth + Storage)
- Hospedagem: Cloudflare Pages

## Rodando localmente

1. **Pré-requisitos:** Node 20+, conta Supabase.
2. **Instalar deps:** `npm install`
3. **Variáveis de ambiente:** copie `.env.local` e preencha:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://<seu-projeto>.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<sua-anon-key>
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```
4. **Banco:** no SQL Editor do Supabase, execute em ordem:
   - `supabase/migrations/0001_init.sql` — schema, RLS e buckets
   - `supabase/migrations/0002_seed_cardapio.sql` — 18 categorias, 161 itens, configs default
5. **Criar usuário admin:** no Supabase → Authentication → Add user (email/senha do Edson).
6. **Rodar:** `npm run dev` → http://localhost:3000 (admin em `/admin`).

## Estrutura

```
app/
  page.tsx                    # one-pager público (SSR, revalidate=60)
  layout.tsx                  # metadata, fontes, OG
  sitemap.ts, robots.ts       # SEO
  admin/
    login/page.tsx            # tela de login
    (authed)/                 # route group protegida
      layout.tsx              # nav + auth guard
      page.tsx                # dashboard
      cardapio/               # edição inline de preços + CRUD
      galeria/                # upload e gerenciamento de fotos
      config/                 # textos do site
  auth/signout/route.ts       # POST → logout

components/                   # Hero, Historia, Cardapio, Galeria, Visite, StructuredData
lib/
  supabase/{server,client,middleware}.ts
  data.ts                     # getSitePayload (servidor)
  defaults.ts                 # fallback config
  format.ts, types.ts, utils.ts
middleware.ts                 # protege /admin

supabase/migrations/          # SQL: schema + seed
```

## Painel admin

- `/admin/cardapio` — clique no preço pra editar inline (salva no blur). Toggle ativo/destaque, criar/editar/excluir item via drawer.
- `/admin/galeria` — upload múltiplo (Supabase Storage bucket `galeria`), legenda inline, toggle visibilidade.
- `/admin/config` — textos do hero, história, contato, horário e mapa. Salva no blur.

## Deploy

Cloudflare Pages → conectar repo → build `npm run build`, output `.next`. Apontar domínio (sugestão `barrilchopperia.com.br`) via DNS Cloudflare.

## Decisões fora do escopo (v1)

Pedido online, reservas, eventos, fidelidade, multi-idioma, histórico de preços. Ver `DESIGN.md` (se gerado depois) para racional completo.
