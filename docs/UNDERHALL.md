# Uppdaterings- och underhållsguide

## Uppdateringsfrekvens

Enligt metodiken (`/metod/#granskning`): löpande under valrörelsen
(2026-07 → 2026-09-13), särskilt när nya valmanifest publiceras, annars
minst kvartalsvis. Efter valet: revidera vid regeringsbildning/nya
koalitionsavtal, annars kvartalsvis tills nästa valrörelse.

## Rutinuppdatering (checklista)

1. **Bevaka nya primärkällor** — nya valmanifest, partiprogram, motioner
   (`data.riksdagen.se/dokumentlista/?sok=...&doktyp=mot`), regeringsbeslut.
2. **Kör research** för berörd parti/ämne-kombination med samma
   agentprompt-mall som piloten (se `agent`-anropen i sessionens historik
   eller rekonstruera från `docs/METODOLOGISKA_FRAGOR.md` + schemat i
   `src/lib/schema.ts`) — samma hårda regler gäller varje gång:
   inga påhittade positioner, individ ≠ parti, parti ≠ regering,
   evidensklassning, korta citat, neutral svenska.
3. **Validera researchoutput** som fristående JSON innan integrering:
   ```sh
   python3 -c "import json; json.load(open('research-output.json'))"
   ```
4. **Integrera** i `src/data/*.json` — antingen manuellt för enstaka
   poster, eller med ett litet integrationsskript i stil med de som
   användes för piloten (läs befintlig fil, dedupa källor på `url` inte
   bara `id`, lägg till nya poster, skriv tillbaka med `indent=2`).
5. **Sätt `workflowStatus`** progressivt: ny data landar som
   `"behover_redaktionell_granskning"`, höjs till `"publicerad"` först
   efter att `REDAKTIONELL_GRANSKNING.md`-checklistan är avbockad.
6. **Uppdatera** `parties.json` → `lastReviewedAt` och `meta.json` →
   `researchLastUpdated`/`lastUpdated` för det som faktiskt granskades.
7. **Lägg till en post** i `updates.json` (`type: "innehall"` eller
   `"metod"`) så ändringen syns i uppdateringsloggen och RSS-flödet.
8. **Kör hela testkedjan** innan push:
   ```sh
   npm test                 # schema + referensintegritet
   npm run check             # Astro/TypeScript-typkontroll (kör npm run sync först vid tveksamhet)
   npm run build             # Astro-validering + Pagefind-index
   npm run check:links       # externa + interna länkar
   npm run check:a11y        # axe-core på nyckelsidor (kräver build)
   ```
   `npm run check` är lätt att glömma eftersom `astro build`/`astro dev` inte
   stoppar på typfel — den upptäcker regressioner som annars bara syns som
   `any`-typade värden i editorn (t.ex. om `.astro/types.d.ts` av misstag
   faller ur `tsconfig.json`s `include`, vilket händer tyst och utan
   byggfel).

## Att lägga till ett nytt parti (t.ex. om ett nytt parti tar sig in i riksdagen)

1. Verifiera mot riksdagen.se/Valmyndigheten precis som i
   `PARTILISTA.md`, med samma källkvalitet.
2. Lägg till posten i `parties.json` och till `PARTY_IDS` i
   `src/lib/schema.ts`.
3. Kör `npm test` — inget annat kodställe behöver ändras; sidgenerering
   (`getStaticPaths`) och jämförelseverktyget läser partilistan dynamiskt.

## Att ta bort ett parti (lämnar riksdagen)

Ta **inte** bort historisk data. Sätt i stället partiets poster till
`workflowStatus: "arkiverad"` och överväg en `governmentStatus`-uppdatering
snarare än att radera — webbplatsens syfte inkluderar spårbar historik
(`TimelineEvent`, `ResearchReview`).

## Att lägga till ett nytt ämne

Se `TAXONOMI.md` → "Att lägga till ett ämne". Kom ihåg att lägga till
motsvarande `keyQuestions` och eventuellt en `questions.json`-post om
ämnet ska vara en egen väljarfråga.

## Komponentbiblioteket är vendorat, inte ett git-beroende

`built-intelligence-components` installerades ursprungligen direkt från
GitHub (`github:baktakt/built-intelligence-components#branch`). Det gav
ett byggfel på Vercel: npm normaliserar den typen av beroende till en
`git+ssh://`-URL i `package-lock.json`, och när det väl skrevs om till
https körde det in i ett annat problem — Vercels egen GitHub-integration
injicerar ett kort-livat token som bara är behörigt för **detta** repo
(`political-ai`), inte för syskonrepot, så även en ren https-hämtning
floppade med "Invalid username or token".

Lösningen (2026-07-15): paketets faktiska källkod — inte hela
demo/galleri-appen den också är i sitt eget repo, bara det som verkligen
importeras (`components/bi`, `components/ui`, `data`, `lib`, `styles.css`,
`index.ts`, `ui.ts`) — ligger nu i `vendor/built-intelligence-components/`
i det här repot, installerat via en lokal `file:`-beroende:
```json
"built-intelligence-components": "file:vendor/built-intelligence-components"
```
Ingen nätverks- eller git-åtkomst behövs vid `npm install` längre —
npm symlänkar `node_modules/built-intelligence-components` till
`vendor/built-intelligence-components/` och kör dess egna `prepare`-skript
(tsup) lokalt, precis som förut men utan fjärrhämtningen.

**Att uppdatera vendorkopian** när originalbiblioteket
(`baktakt/built-intelligence-components`) ändras: kopiera över de ändrade
filerna manuellt (`components/bi/*`, `components/ui/*`, `data/*`, `lib/utils.ts`,
`lib/formatters.ts`, `styles.css`, `index.ts`, `ui.ts`) till
`vendor/built-intelligence-components/src/`, kör `npm install` om från
repots rot, och kör hela testkedjan (steg 8 ovan). `vendor/.../package.json`
är medvetet trimmad (bara det den vendorade koden faktiskt importerar —
se dess `dependencies`) — om en ny import tillkommer som kräver ett
paket som inte redan finns där, lägg till det.

## Driftsättning

Se `DEPLOYMENT.md`.
