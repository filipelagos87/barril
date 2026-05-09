# Barril Choperia

Site one-pager institucional do Barril Choperia (Shopping Sul, Bancários — João Pessoa/PB). 100% estático, sem backend.

## Stack

- Next.js 15 (App Router) + TypeScript — gerando `output: 'export'` (HTML/CSS/JS estáticos)
- Tailwind CSS 3
- Hospedagem: Cloudflare Pages

## Onde editar cada coisa

Tudo é arquivo `.ts`. Edita, dá `git push`, Cloudflare faz redeploy automático em ~2 min.

| Quero mudar… | Arquivo |
|---|---|
| Preço, nome, descrição, destaque de item do cardápio | [`lib/cardapio.ts`](lib/cardapio.ts) |
| Adicionar/remover item ou categoria | [`lib/cardapio.ts`](lib/cardapio.ts) |
| Headline, telefone, WhatsApp, horário, endereço, mapa | [`lib/config.ts`](lib/config.ts) |
| Fotos da galeria | [`lib/galeria.ts`](lib/galeria.ts) + arquivos em `public/images/gallery/` |
| Foto do hero | substituir `public/images/hero/barril.jpeg` |
| Logos | substituir arquivos em `public/images/logo/` |
| Texto da história | campo `historia_paragrafos` em [`lib/config.ts`](lib/config.ts) |
| Reel do Instagram embedado | campo `historia_video_url` em [`lib/config.ts`](lib/config.ts) |
| Cores, tipografia, estilo | [`tailwind.config.js`](tailwind.config.js) e [`app/globals.css`](app/globals.css) |
| Estrutura visual de uma seção | componentes em `components/` |

## Rodando localmente

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build estático

```bash
npm run build
# saída em ./out/  (HTML + CSS + JS prontos pra servir como arquivos estáticos)
```

## Workflow pra editar preço (exemplo)

1. Abre `lib/cardapio.ts`
2. Acha o item (Ctrl+F pelo código ou nome)
3. Muda o `preco`
4. Salva
5. ```bash
   git add lib/cardapio.ts
   git commit -m "atualiza preço do chopp 1L"
   git push
   ```
6. Em ~2 min o site público está com o novo preço.

## Estrutura

```
app/
  layout.tsx      # metadata, fontes, OG
  page.tsx        # one-pager (importa lib/config, lib/cardapio, lib/galeria)
  globals.css     # estilos globais + classes utilitárias
  sitemap.ts      # gera /sitemap.xml
  robots.ts       # gera /robots.txt

components/
  Hero.tsx, Historia.tsx, Cardapio.tsx, CardapioInteractive.tsx,
  Galeria.tsx, Visite.tsx, StructuredData.tsx

lib/
  cardapio.ts     # 18 categorias, 161 itens
  config.ts       # textos, contatos, links
  galeria.ts      # lista de fotos
  format.ts       # formatPrice (R$)
  types.ts        # tipos compartilhados

public/
  images/         # hero, logo, gallery
```

## Deploy

Veja [DEPLOY.md](DEPLOY.md) para os passos no Cloudflare Pages.

## Decisões fora do escopo

Pedido online, reservas, eventos, fidelidade, multi-idioma, painel admin web, banco de dados. Cardápio é estático — alterações via commit.
