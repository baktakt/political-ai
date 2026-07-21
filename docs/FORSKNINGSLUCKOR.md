# Forskningsluckor

Statusen är **2026-07-21**. Detta dokument räknas som en del av
transparenskravet: luckor ska redovisas öppet, inte gömmas. Motsvarande
information är också maskinläsbar direkt i datan (`workflowStatus`,
frånvaro av `positions`-poster) och syns på varje part i- och ämnessida som
"Ännu ej granskat".

## Täckning: kombinationer av parti och ämne

152 möjliga kombinationer (8 partier × 19 ämnen).

- **Granskade i piloten:** 44 (18 för S över alla ämnen utom arbetsmarknad
  som ägs av det andra spåret, plus 8 för arbetsmarknad över alla partier —
  S räknas en gång — samt C/strategi och L/strategi, L/utbildning,
  L/näringsliv och L/suveränitet efter granskning av valmanifest 2026,
  samt MP/strategi, MP/utbildning, MP/offentlig sektor, MP/integritet och
  MP/miljöavtryck efter breddad granskning av partiets AI-material, samt
  V/strategi, V/offentlig sektor, V/vård, V/integritet och V/försvar efter
  breddad granskning av partiets AI-sida och riksdagsmotioner, samt
  M/strategi, M/näringsliv och M/vård utifrån Moderaternas stämmohandlingar
  2025).
- **Ej granskade:** 108. Dessa visas som "Ännu ej granskat" på webbplatsen,
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
- **KD / arbetsmarknad:** ingen egen partiposition hittades; endast
  regeringens gemensamma AI-strategi (där KD:s civilminister är ansvarigt
  statsråd) är dokumenterad.
- **SD / arbetsmarknad:** berörs endast indirekt (via skolans värde för
  "framtidens arbetsmarknad"); SD:s egen valplattform 2026 innehåller
  överhuvudtaget inga AI-relaterade skrivningar (verifierat genom
  fulltextsökning).
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
  2026-07-21 för tre ämnen utifrån stämmohandlingarna 2025; inget V-, M-,
  KD-, S- eller MP-valmanifest 2026 kunde verifieras via testade URL:er dessa
  körningar. Övriga ämnen återstår.

## Nästa steg för att stänga luckorna

Se körordningen i `README.md` → "Skala upp researchen": kör motsvarande
research-agentmall (samma hårda regler, samma outputschema) för
återstående 7 partier × 18 ämnen, prioritera enligt ordningen i
`src/data/topics.json` (`displayOrder`), och integrera med samma
`scripts/`-mönster som användes för piloten (se `integrate_topic.py`/
`integrate_party_s.py`-mönstret beskrivet i `UNDERHALL.md`).
