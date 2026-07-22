# Forskningsluckor

Statusen är **2026-07-22**. Detta dokument räknas som en del av
transparenskravet: luckor ska redovisas öppet, inte gömmas. Motsvarande
information är också maskinläsbar direkt i datan (`workflowStatus`,
frånvaro av `positions`-poster) och syns på varje part i- och ämnessida som
"Ännu ej granskat".

## Täckning: kombinationer av parti och ämne

152 möjliga kombinationer (8 partier × 19 ämnen).

- **Granskade i piloten:** 58 (18 för S över alla ämnen utom arbetsmarknad
  som ägs av det andra spåret, plus 8 för arbetsmarknad över alla partier —
  S räknas en gång — samt C/strategi, C/utbildning, C/offentlig sektor,
  C/integritet, C/kultur-upphovsrätt, C/suveränitet och C/byggd miljö efter
  granskning av valmanifest, AI-sida och riksdagsmotioner, samt L/strategi,
  L/utbildning, L/näringsliv och L/suveränitet efter granskning av
  valmanifest 2026, samt MP/strategi, MP/utbildning, MP/offentlig sektor,
  MP/integritet och MP/miljöavtryck efter breddad granskning av partiets
  AI-material, samt V/strategi, V/offentlig sektor, V/vård, V/integritet och
  V/försvar efter breddad granskning av partiets AI-sida och
  riksdagsmotioner, samt M/strategi, M/näringsliv och M/vård utifrån
  Moderaternas stämmohandlingar 2025, samt KD/strategi, KD/utbildning,
  KD/näringsliv och KD/integritet där inga egna partinivåpositioner
  hittades, samt SD/strategi, SD/utbildning, SD/offentlig sektor och
  SD/reglering utifrån kommittémotion 2024/25:1424).
- **Ej granskade:** 94. Dessa visas som "Ännu ej granskat" på webbplatsen,
  inte som "ingen dokumenterad ståndpunkt" (en granskad slutsats) — se
  skillnaden i `metod`-sidans princip.

## Ämnen med full pilottäckning (alla 8 partier)

`arbetsmarknad` — se `src/data/positions.json` (id-prefix matchar `topicId`).

## Partier med full pilottäckning (alla 19 ämnen)

`s` (Socialdemokraterna) — 18 dokumenterade ståndpunkter + 1 uttrycklig
"ingen dokumenterad ståndpunkt" (`byggd-miljo`).

## Kända enskilda luckor inom det granskade materialet

- **S / byggd-miljö:** ingen ståndpunkt om AI i bygg- och samhällsplanering
  hittades trots sökning i utgiftsområdesmotioner, partiprogram och
  webbplats.
- **C / byggd-miljö:** granskad och dokumenterad som riksdagsaktivitet via
  kommittémotion om digitaliserad planering; AI-positionen är begränsad till
  möjlig effektivisering och behov av utvärderade regeländringar, inte
  byggproduktion eller materialoptimering.
- **KD / arbetsmarknad:** ingen egen partiposition hittades; endast
  regeringens gemensamma AI-strategi (där KD:s civilminister är ansvarigt
  statsråd) är dokumenterad.
- **KD / strategi, utbildning, näringsliv och integritet:** inga egna
  partinivåpositioner hittades i granskade partikanaler och Riksdagens öppna
  data. Relevanta träffar var regeringspolitik eller enskilda motioner, inte
  KD-partilinje.
- **SD / arbetsmarknad:** berörs endast indirekt (via skolans värde för
  "framtidens arbetsmarknad"); SD:s egen valplattform 2026 innehåller
  överhuvudtaget inga AI-relaterade skrivningar (verifierat genom
  fulltextsökning). Samma kommittémotion 2024/25:1424 har 2026-07-22
  använts för granskade positioner om strategi, utbildning, offentlig sektor
  och reglering.
- **L / arbetsmarknad:** motsvarande — indirekt berört via kompetens-
  försörjning, inget uttalat ställningstagande om AI:s effekter på jobb.
- **S:** inga dokumenterade ståndpunkter hittades specifikt om AI-kompisar/
  chattbottar för barn, datacenters vattenanvändning och rapporteringskrav,
  algoritmisk diskriminering som egen fråga, svenska språkmodeller/
  superdatorer som egen satsning, eller ersättningsmodeller för kreatörer
  vid AI-träning på deras verk — trots att flera näraliggande ämnen (t.ex.
  barn och unga i stort, miljöavtryck i stort) har annan dokumentation.

Se `docs/METODOLOGISKA_FRAGOR.md` för processfrågorna dessa luckor väcker,
och varje partis/ämnes egen sida för fullständig `confidenceExplanation`
med sökvägar.

## Ej verifierat (skiljer sig från "ingen ståndpunkt")

- Utskotts- och voteringsutfall för samtliga refererade motioner under
  2024/25–2025/26 (alla proposals har `status: "framlagt"`, inget
  `"bifallet"`/`"avslaget"` är ännu verifierat).
- Slutversionen av Moderaternas handlingsprogram (endast
  stämmoproposition öppnad; använd för M/arbetsmarknad, M/strategi,
  M/näringsliv och M/vård).
- Kongressprotokoll för S 2025 (partiprogram och politiska riktlinjer
  öppnade i slutversion; själva mötesprotokollet med att-satser inte).
- Övriga partiers valmanifest inför valet 2026-09-13 är under bevakning.
  SD:s valplattform 2026 var integrerad 2026-07-15. Centerpartiets
  valmanifest 2026 hittades och AI-avsnittet integrerades 2026-07-16.
  Liberalernas valmanifest 2026 integrerades delvis 2026-07-17 för
  strategi och arbetsmarknad, kompletterades 2026-07-19 med utbildning och
  granskades vidare 2026-07-20 för näringsliv och AI-suveränitet. Samma dag
  kompletterades MP för fem ämnen utifrån AI-sida och kommittémotioner, men
  inget MP-valmanifest 2026 kunde verifieras. V kompletterades 2026-07-21
  för fem ämnen utifrån AI-sida och riksdagsmotioner. M kompletterades senare
  2026-07-21 för tre ämnen utifrån stämmohandlingarna 2025. Senare
  2026-07-21 granskades KD för strategi, utbildning, näringsliv och
  integritet utan att egna partinivåpositioner hittades. Ännu senare
  2026-07-21 breddades C med sex ämnen utifrån AI-sida, valmanifest och
  kommittémotioner. SD kompletterades 2026-07-22 för strategi, utbildning,
  offentlig sektor och reglering utifrån kommittémotion 2024/25:1424; SD:s
  valplattform 2026 innehåller fortsatt inga AI-skrivningar enligt tidigare
  fulltextsökning. Inget V-, M-, KD-, S- eller MP-valmanifest 2026 kunde
  verifieras via testade URL:er dessa körningar. Övriga ämnen återstår.

## Nästa steg för att stänga luckorna

Se körordningen i `README.md` → "Skala upp researchen": kör motsvarande
research-agentmall (samma hårda regler, samma outputschema) för
återstående 7 partier × 18 ämnen, prioritera enligt ordningen i
`src/data/topics.json` (`displayOrder`), och integrera med samma
`scripts/`-mönster som användes för piloten (se `integrate_topic.py`/
`integrate_party_s.py`-mönstret beskrivet i `UNDERHALL.md`).
