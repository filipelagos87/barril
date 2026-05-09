# Deploy — Cloudflare Pages

Site é static export do Next.js. Cloudflare Pages serve direto, sem adapter, sem `nodejs_compat`, sem env vars.

## Configuração no Cloudflare Pages

1. **https://dash.cloudflare.com → Workers & Pages → barril → Settings → Build & deployments → Build configurations → Edit**

2. **Substitua os campos** pelos valores abaixo:

   | Campo | Valor |
   |---|---|
   | **Framework preset** | `None` (ou `Next.js (Static HTML Export)` se aparecer) |
   | **Build command** | `npm run build` |
   | **Build output directory** | `out` |
   | **Root directory** | (vazio) |
   | **Node version** | `20` ou `22` |

3. **Environment variables**: nenhuma é obrigatória.

   *Opcional*: se quiser que `sitemap.xml`, `robots.txt` e o JSON-LD apontem pro domínio final, adicione `NEXT_PUBLIC_SITE_URL = https://barrilchopperia.com.br` (ou o domínio que for usar).

4. **Settings → Functions → Compatibility flags**: pode **remover** o `nodejs_compat` se já tiver adicionado — não é necessário pra static export.

5. **Deployments → último deploy → "..." → Retry deployment** (ou faça qualquer commit, que dispara redeploy automático).

## Pra atualizar o site

Toda mudança vai por `git push`. Cloudflare detecta e redeploya em ~2 min:

```bash
# Editou lib/cardapio.ts pra mudar um preço:
git add lib/cardapio.ts
git commit -m "atualiza preço Mar.Beer 2.500ml"
git push
```

## Domínio customizado

1. **Registre o domínio** no Registro.br (~R$ 40/ano).
2. **No Cloudflare Pages → Custom domains → Set up a custom domain** → digite o domínio.
3. **No Registro.br** → mude os DNS pros nameservers do Cloudflare.
4. **Espere a propagação** (minutos até 24h).
5. **Atualize `NEXT_PUBLIC_SITE_URL`** se quiser que sitemap/JSON-LD apontem pro domínio.

## Troubleshooting

- **Build falha em "next build"** → cheque se algum import quebrou ao mexer nos arquivos `lib/`.
- **Imagem não aparece** → confira se o caminho em `lib/galeria.ts` ou `lib/config.ts` bate com um arquivo real em `public/images/`.
- **Site fica em cache antigo** → Cloudflare Pages serve com cache. Hard refresh (Ctrl+Shift+R) ou aguarde alguns minutos.
