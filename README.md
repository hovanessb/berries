# Bomberry — website (Next.js)

Website for Bomberry Acai & Smoothies, 1223 N Grand Ave, Walnut, CA.

## Design

Styled after the designer's Bomberry app art (`App Assets/` in the project folder), adapted for the web:

- **The iris.** Concentric paper-cut red rings (`<Iris />`, `.bb-iris`) with Billy the berry in a cream spotlight. The hero opens the iris on load; ordering closes it on Billy before handing off to Toast.
- **Menu tiles.** White cards carrying the designer's photo-and-logotype art for each item (`lib/art.ts`, images in `public/menu/`). Items without art get their name set large in a cream spotlight.
- **The floor.** A black-and-white checker band, from the shop's real floor.
- **Type (Google Fonts via `next/font`).** Antonio for display (standing in for the designer's Proneic) and Montserrat for text and prices.
- **Colour.** Ring reds `#e3141c → #3f0306`, cream `#fdf2cc`, black. Tokens live at the top of `app/globals.css`.

To add art for a new item, export it to `public/menu/<slug>.jpg` and add it to `ITEM_ART` in `lib/art.ts`.

## How ordering works

| What | Where it comes from |
|---|---|
| Menu items, descriptions, prices, photos | Toast **Menus API v2** (read-only), cached 15 min |
| Sold-out ("86'd today") | Toast **Stock API** (read-only), cached 2 min |
| "Open now" banner | Toast **Restaurant availability API** (read-only), cached 10 min; falls back to posted hours |
| Cart, payment, pickup time, kitchen ticket | **Toast online ordering.** Every "Add to order" deep-links to that item's page on Toast |

Toast Standard API access only allows GET requests, so the site never creates orders or touches payments.
Until credentials are added (or if Toast is down), the site shows the built-in seed menu (`lib/seed-menu.ts`) and links to the Toast menu.

## Setup

```bash
npm install
cp .env.example .env.local   # fill in the Toast values
npm run dev                  # http://localhost:3000
```

### Getting Toast credentials (owner or manager)
1. Toast Web → **Integrations → Toast API access → Manage credentials** (needs RMS Essentials or higher and the *Manage Integrations* permission).
2. Create a credential with scopes **menus:read, stock:read, restaurants:read**.
3. Copy the client ID, client secret and the location GUID into `.env.local`.
4. Keep these server-side only. They're read in `lib/toast/*` (marked `server-only`) and never sent to the browser.

### Make the hand-off feel seamless
- In Toast Web, set the online ordering page's brand colour to `#4a1a4f` (acai) and upload the logo, so the Toast page feels like the same shop.
- After menu changes in Toast, it updates by itself within 15 minutes, or instantly with:
  `curl -X POST "https://YOUR-SITE/api/revalidate?secret=$REVALIDATE_SECRET"`

## Deploy
Works on Vercel out of the box: import the repo, add the env vars from `.env.example`, deploy.

## Map of the code
```
app/            layout (banner, header, footer, JSON-LD), / (home), /menu, /visit, /api/revalidate
components/     HandoffLink (the iris that closes on Billy before Toast), OrderCard,
                Deco (Iris, CheckerBand, Sticker), ReviewSlip (speech balloons), …
lib/toast/      client (auth + cached GET), menu, availability, links (Toast item deep links), types
lib/            art (designer item art), seed-menu, hours (Pacific time), site (address, phone, reviews)
app/globals.css design tokens and all styles
public/         brand/ (wordmark, Billy), menu/ (item art), shop/ (interior photos)
```

## To do when you have them
- Item art for Nutty Knockout and Mango Mayhem (they show type-only cards for now).
- Toast photos only show for items without designer art.
