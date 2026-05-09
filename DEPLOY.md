# Deploy — Cloudflare Pages

Site SSR com Next.js 15. Cloudflare Pages roda via adapter `@cloudflare/next-on-pages` que o framework preset já configura pra você.

## Passo a passo (UI)

1. **Acesse** https://dash.cloudflare.com → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.

2. **Conecte sua conta GitHub** e selecione o repo `filipelagos87/barril`.

3. **Configure o build** com estes valores:

   | Campo | Valor |
   |---|---|
   | **Production branch** | `main` |
   | **Framework preset** | `Next.js` |
   | **Build command** | `npx @cloudflare/next-on-pages@1` |
   | **Build output directory** | `.vercel/output/static` |
   | **Root directory** | (deixe vazio — root do repo) |

4. **Variáveis de ambiente** (na mesma tela, seção "Environment variables"):

   Pra subir em **modo preview** (sem Supabase ainda) — não adicione nada, só clica em deploy. O site sobe com textos default e admin em modo preview.

   Pra subir **com Supabase** já configurado — adicione 3 vars:

   ```
   NEXT_PUBLIC_SUPABASE_URL       = https://<seu-projeto>.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY  = <sua-anon-key>
   NEXT_PUBLIC_SITE_URL           = https://<sua-url-cloudflare>.pages.dev
   ```

   (Você pode adicionar/editar essas vars depois sem precisar rebuildar tudo do zero — basta um redeploy.)

5. **Clique em "Save and Deploy"**. Primeiro build leva ~3 minutos. Você verá o log em tempo real.

6. **Após o build**, vá em **Settings → Functions → Compatibility flags** e adicione `nodejs_compat` em **Production** e **Preview**. Isso é necessário pro Supabase + outras libs Node funcionarem no edge runtime do Cloudflare.

   Depois disso, dispare um redeploy (Settings → Deployments → Retry).

## Domínio customizado

Quando quiser apontar `barrilchopperia.com.br` (ou outro):

1. **Registre o domínio** no Registro.br (~R$ 40/ano).
2. **No Cloudflare Pages** → **Custom domains** → **Set up a custom domain** → digite o domínio.
3. **No painel do Registro.br** → mude os DNS pros nameservers que o Cloudflare te der (algo como `xxx.ns.cloudflare.com`).
4. **Espere a propagação** (até 24h, mas geralmente em minutos).
5. **Atualize `NEXT_PUBLIC_SITE_URL`** nas env vars do Cloudflare pro domínio final, e dispare redeploy.

## Atualizando

A partir de agora, **todo `git push` na branch `main`** dispara um deploy automático no Cloudflare Pages. Pra mexer em algo:

```bash
git add .
git commit -m "ajusta hero"
git push
```

Cloudflare detecta o push, builda, e atualiza em ~3min.

## Quando o Edson precisar mexer (admin)

Acesse `https://<seu-dominio>/admin/login` com o e-mail e senha cadastrados no Supabase. Tudo que ele editar (preço, foto, texto) vai pro banco e fica visível no site público dentro de **60 segundos** (Next.js revalida o cache automaticamente).

## Troubleshooting

- **Build falhou em "compatibility flag"** → confira que `nodejs_compat` está ativo em Production E Preview environments.
- **Página em branco em produção** → cheque os logs em Pages → Deployments → seu build → Functions logs.
- **Admin dá 500 mesmo com Supabase configurado** → confira se as 2 env vars `NEXT_PUBLIC_SUPABASE_*` estão setadas e se você rodou as migrations no Supabase.
- **Site não atualiza após edição no admin** → revalida em 60s (configurado em `app/page.tsx`). Pra forçar revalidate antes, redeploy via Cloudflare.
