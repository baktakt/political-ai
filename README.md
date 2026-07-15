# Partierna om AI

En neutral, källbaserad webbplats om hur partierna i Sveriges riksdag
förhåller sig till artificiell intelligens och hållbarhet — vad de säger,
vad de föreslagit och vad de faktiskt gjort. Byggd i Astro, med det
delade komponentbiblioteket
[`built-intelligence-components`](https://github.com/baktakt/built-intelligence-components)
och en egen "civic election"-färgpalett.

**Detta är en pilotversion.** Den validerar hela kedjan — källmodell,
evidensklasser, sidlayout, neutralitetsprinciper, redaktionellt arbetsflöde
och hållbarhetsramverket — på ett fullt researchat ämne (Jobb och
arbetsmarknad, alla 8 partier) och ett fullt researchat parti
(Socialdemokraterna, 19 ämnen). Se `docs/FORSKNINGSLUCKOR.md` för exakt vad
som återstår.

## Kärnprincip

Webbplatsen är partipolitiskt neutral: den rekommenderar inget parti,
rangordnar inte partierna och räknar inte fram poäng. Den redovisar öppet
när dokumentation saknas — frånvaro av en ståndpunkt tolkas aldrig som
motstånd. Se `/metod/` (eller `src/pages/metod/index.astro`) för hela
metodiken.

## Snabbstart

```sh
npm install
npm run dev        # http://localhost:4321
```

```sh
npm run build       # astro build && pagefind --site dist
npm run preview     # serverar dist/ lokalt
```

Kräver Node ≥ 20. Komponentbiblioteket installeras direkt från GitHub
(`github:baktakt/built-intelligence-components#main`) — `npm install` drar
och bygger det automatiskt via dess `prepare`-skript.

## Kommandon

| Kommando | Gör |
|---|---|
| `npm run dev` | Utvecklingsserver med hot reload |
| `npm run build` | Produktionsbygge + Pagefind-sökindex |
| `npm run preview` | Serverar `dist/` lokalt |
| `npm run check` | Astro/TypeScript-typkontroll |
| `npm test` | Vitest — schema- och referensintegritetstester (`tests/data.test.ts`) |
| `npm run check:links` | Extern + intern länkkontroll → `docs/rapporter/lankkontroll.md` |
| `npm run check:a11y` | axe-core-tillgänglighetskontroll → `docs/rapporter/tillganglighet.md` (kräver `npm run build` först) |

## Struktur

```
src/
  data/            Strukturerad forskningsdata (JSON, se docs/DATAMODELL.md)
  lib/schema.ts    Zod-scheman — källa till sanning för datamodellen
  lib/content.ts   Dataåtkomst (filtrerar på publicerad workflowStatus m.m.)
  lib/evidence.ts  Etiketter för evidensstatus/-typ (svenska, ingen procent)
  content.config.ts  Astro content collections, en per datafil
  components/      Sidkomponenter (PositionBlock, EvidenceBadge, …)
                   samt CompareTool.tsx, den enda React-ön
  layouts/         BaseLayout.astro (Header/Footer från komponentbiblioteket)
  pages/           Filbaserad routing — se docs/SITEMAP.md
  styles/global.css  Civic election-palett, se docs/DESIGN_SYSTEM.md
tests/data.test.ts   Schema + referensintegritet + evidensregler
scripts/             check-links.mjs, check-a11y.mjs
docs/                All dokumentation som listas nedan
```

## Dokumentation

**Grundleveranser (innan webbplatsen byggdes):**
[Produktbrief](docs/PRODUKTBRIEF.md) ·
[Verifierad partilista](docs/PARTILISTA.md) ·
[Ämnestaxonomi](docs/TAXONOMI.md) ·
[Sitemap](docs/SITEMAP.md) ·
[Wireframes](docs/WIREFRAMES.md) ·
[Designsystem](docs/DESIGN_SYSTEM.md) ·
[Datamodell](docs/DATAMODELL.md) ·
[Olösta metodologiska frågor](docs/METODOLOGISKA_FRAGOR.md)

Källhierarki och forskningsmetodik i sin helhet ligger på webbplatsens
`/metod/`-sida (`src/pages/metod/index.astro`), inte dubblerad som eget
dokument — det är den publicerade, aktuella versionen.

**Slutleveranser:**
[Redaktionell granskningschecklista](docs/REDAKTIONELL_GRANSKNING.md) ·
[Uppdaterings- och underhållsguide](docs/UNDERHALL.md) ·
[Korrigeringsprocess](docs/KORRIGERINGSPROCESS.md) ·
[Kända begränsningar](docs/BEGRANSNINGAR.md) ·
[Forskningsluckor](docs/FORSKNINGSLUCKOR.md) ·
[Driftsättning](docs/DEPLOYMENT.md) ·
[Tillgänglighetsrapport](docs/rapporter/tillganglighet.md) ·
[Länkkontrollrapport](docs/rapporter/lankkontroll.md)

## Teknik

Astro 5 · React (endast för jämförelseverktyget, `client:only`) ·
Tailwind CSS v4 · Zod (schemavalidering via content collections) ·
Pagefind (statisk sökindexering, inga externa sökberoenden) · Vitest ·
axe-core/Playwright för tillgänglighetstest.

Inga användarkonton. Ingen spårning eller analys. Inga annonser. Inga
tredjepartsteckensnitt vid körning (self-hosted via `@fontsource*`).

## Skala upp researchen

Piloten täcker 26 av 152 möjliga parti–ämne-kombinationer. Nästa steg:
kör motsvarande forskningsprocess (samma hårda regler: inga påhittade
positioner, individ ≠ parti, parti ≠ regering, källor öppnade och
verifierade, kort citat, neutral svenska) för återstående 7 partier och
18 ämnen. Se `docs/UNDERHALL.md` → "Rutinuppdatering" för arbetsflödet och
`docs/FORSKNINGSLUCKOR.md` för vad som återstår.

## Licens och ägarskap

Internt projekt. Se `docs/PRODUKTBRIEF.md` för syfte och avgränsning.
