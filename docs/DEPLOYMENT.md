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

**Komponentbiblioteket är vendorat, inte ett fjärrberoende.**
`built-intelligence-components` installerades ursprungligen direkt från
GitHub, vilket gav byggfel på Vercel — först `git@github.com: Permission
denied (publickey)` (npm normaliserar `github:...`-beroenden till
`git+ssh://` i lockfilen, och Vercels byggcontainer har ingen SSH-nyckel),
och sedan, efter att ha skrivit om ssh till https, `Invalid username or
token` (Vercels egen GitHub-integration injicerar ett token som bara är
behörigt för det här repot, inte för syskonrepot). Lösningen: paketets
källkod ligger vendorad i `vendor/built-intelligence-components/` och
installeras som ett lokalt `file:`-beroende — ingen nätverks- eller
git-åtkomst krävs alls vid `npm install`. Se `UNDERHALL.md` →
"Komponentbiblioteket är vendorat" för hur man uppdaterar vendorkopian.

1. **Importera repot** i Vercel: New Project → välj
   `baktakt/political-ai` → branch enligt önskemål (produktionsgren, t.ex.
   `main`, efter att piloten granskats och mergats dit). Vercel läser
   `vercel.json` automatiskt — inga manuella inställningar för build/output
   krävs.
2. **Miljövariabel:** sätt `SITE_URL` till den faktiska produktions-URL:en
   (för närvarande `https://ai-valet.vercel.app`) — `astro.config.mjs` läser
   denna för korrekta canonical-/OG-/sitemap-/RSS-URL:er. Utan den faller den
   tillbaka till produktionsadressen ovan.
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
