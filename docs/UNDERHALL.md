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
   npm run build             # Astro-validering + Pagefind-index
   npm run check:links       # externa + interna länkar
   npm run check:a11y        # axe-core på nyckelsidor (kräver build)
   ```

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

## Uppdatera komponentbiblioteket

```sh
npm install github:baktakt/built-intelligence-components#main
```
Byt `#main` mot en specifik commit/tag för att pinna en version. Kör
`npm run build` efteråt — brutna Tailwind-klasser eller borttagna
exports syns direkt som byggfel.

## Driftsättning

Se `DEPLOYMENT.md`.
