# Driftsättning

## Vercel (planerad plattform)

Projektet är ett standard Astro-projekt (statisk output, `output: "static"`
är Astros default) och kräver ingen konfiguration utöver:

1. **Importera repot** i Vercel: New Project → välj
   `baktakt/political-ai` → branch enligt önskemål (produktionsgren, t.ex.
   `main`, efter att piloten granskats och mergats dit).
2. **Framework preset:** Vercel identifierar Astro automatiskt.
   - Build command: `npm run build`
   - Output directory: `dist`
   - Install command: `npm install` (standard)
3. **Miljövariabel:** sätt `SITE_URL` till den faktiska produktions-URL:en
   (t.ex. `https://partierna-om-ai.vercel.app` eller en egen domän) —
   `astro.config.mjs` läser denna för korrekta canonical-/OG-/sitemap-/
   RSS-URL:er. Utan den faller den tillbaka till en placeholder-URL.
4. **Node-version:** `package.json` anger `"engines": {"node": ">=20"}`;
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
