# Driftsättning

## Vercel (planerad plattform)

Projektet är ett standard Astro-projekt (statisk output, `output: "static"`
är Astros default). `vercel.json` i repots rot konfigurerar bygget
explicit så det inte beror på Vercels auto-detektering:

```json
{
  "framework": "astro",
  "installCommand": "npm install",
  "buildCommand": "npm run build",
  "outputDirectory": "dist"
}
```

samt en `headers`-sektion med grundläggande skyddshuvuden
(`X-Content-Type-Options: nosniff`, `Referrer-Policy:
strict-origin-when-cross-origin`, `X-Frame-Options: DENY`) — i linje med
webbplatsens integritetsprinciper, se `/om/#integritet`.

**Git-beroendet över SSH → HTTPS.** `built-intelligence-components`
installeras direkt från GitHub (`github:baktakt/...#branch` i
`package.json`). npm normaliserar internt den referensen till en
`git+ssh://git@github.com/...`-URL i `package-lock.json`, vilket fungerar
lokalt om man har en SSH-nyckel eller SSH-proxy konfigurerad — men Vercels
byggcontainer har ingen SSH-nyckel alls, vilket ger felet `git@github.com:
Permission denied (publickey)` vid `npm install`. Fixen är att låta git
själv skriva om alla ssh-URL:er till https innan npm anropar git, vilket
`vercel.json`s `installCommand` gör:
```sh
git config --global url."https://github.com/".insteadOf "git@github.com:"
git config --global url."https://github.com/".insteadOf "ssh://git@github.com/"
```
Det behövs eftersom `built-intelligence-components` är ett publikt repo —
https kräver ingen autentisering, till skillnad från ssh som kräver en
nyckel som inte finns i byggmiljön. Denna rad kan tas bort igen om/när
paketet publiceras till npm i stället för att installeras direkt från
GitHub.

1. **Importera repot** i Vercel: New Project → välj
   `baktakt/political-ai` → branch enligt önskemål (produktionsgren, t.ex.
   `main`, efter att piloten granskats och mergats dit). Vercel läser
   `vercel.json` automatiskt — inga manuella inställningar för build/output
   krävs.
2. **Miljövariabel:** sätt `SITE_URL` till den faktiska produktions-URL:en
   (t.ex. `https://partierna-om-ai.vercel.app` eller en egen domän) —
   `astro.config.mjs` läser denna för korrekta canonical-/OG-/sitemap-/
   RSS-URL:er. Utan den faller den tillbaka till en placeholder-URL.
3. **Node-version:** `package.json` anger `"engines": {"node": ">=20"}`;
   sätt motsvarande i Vercels projektinställningar om den inte auto-
   detekteras.

Inga andra tjänster (databas, auth, KV) behövs — hela datamängden är
statiska JSON-filer som bakas in i bygget.

## Efter varje driftsättning (rekommenderad rutin)

```sh
npm run check:links     # kräver att dist/ finns (körs efter build)
npm run check:a11y      # kräver Chromium — se not nedan
```

`check:a11y` behöver en Chromium-binär (`playwright-core` utan egen
webbläsarnedladdning). På Vercels build-miljö finns ingen webbläsare
förinstallerad — kör detta steg lokalt eller i en separat CI-jobb (t.ex.
GitHub Actions med `npx playwright install chromium`) snarare än som del
av Vercel-bygget.

## Lokal produktionsliknande körning

```sh
npm install
npm run build      # astro build && pagefind --site dist
npm run preview    # serverar dist/ lokalt för slutkontroll
```

## Domän och HTTPS

Hanteras av Vercel. Inga hemligheter eller API-nycklar krävs eftersom
webbplatsen inte har något backend, ingen analys och ingen extern
tjänsteintegration (se `/om/#integritet`).

## Rullback

Vercel behåller tidigare deployments — en trasig driftsättning kan rullas
tillbaka direkt i Vercels dashboard utan att röra git-historiken.
