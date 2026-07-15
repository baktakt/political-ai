# Designsystem — förslag och rationale

## Utgångspunkt

Samma komponentbibliotek som nyhetsbrevet `built-intelligence-components`
(hairline-ramar, `bi-mono`-kickers, kortlayouter, `SectionLabel`,
`Header`/`Footer`) — men en egen färgpalett så att webbplatsen inte
förväxlas med nyhetsbrevet, och en ton anpassad till ett valår snarare än
en fackpublikation.

## Varför civic/election-paletten

Uppdraget kräver uttryckligen: **inte** rött-mot-blått, **inte**
kampanjestetik, **inte** futuristiska AI-klyschor (robotar, glödande
hjärnor). Lösningen: en enda dov, institutionell identitet — som ett
riksdagstryck eller en valmyndighets webbplats, inte som ett parti.

| Token | Ljust läge | Roll |
|---|---|---|
| `--paper` | `oklch(0.984 0.004 92)` | Bakgrund — varm röstsedel-vit, ej ren vit |
| `--ink` | `oklch(0.25 0.045 262)` | Text/rubriker — djup "parlamentarisk" marinblå |
| `--steel` | `oklch(0.45 0.09 258)` | Enda accentfärg — civic blue, används sparsamt |
| `--moss` | `oklch(0.46 0.075 155)` | Hållbarhetsmarkör (grupp-etikett för de 5 hållbarhetsämnena) |
| `--ochre` | `oklch(0.6 0.11 80)` | Reserverad arkivguld-accent (sällan använd) |
| `--terracotta` | `oklch(0.54 0.12 40)` | Varningston: motstridiga/ändrade ståndpunkter, saknade positioner vid markering |

Partiernas egna identifikationsfärger (`parties.json` → `color`) används
**enbart** som en liten 10×10px färgruta bredvid förkortningen
(`PartyMark.astro`) — aldrig som bakgrund, ram eller yta. Detta uppfyller
kravet "partiernas färger ska inte dominera sidan" samtidigt som
igenkänning bevaras.

Mörkt läge speglar samma struktur med omvänd ljushet (se `:root.dark` i
`global.css`) och styrs av `prefers-color-scheme` plus en manuell
`data-theme`-override.

## Typografi

- **Rubriker:** Fraunces (variabel), samma seriff som nyhetsbrevet —
  "editorial", inte "tech". Self-hosted via `@fontsource-variable/fraunces`
  (ingen Google Fonts-request vid sidladdning, jfr integritetskravet).
- **Brödtext:** Inter (variabel).
- **Mono/kicker:** JetBrains Mono, versaler, liten storlek, brett
  bokstavsavstånd — signalerar "metadata", används för datum, evidenstyper,
  käll-etiketter.

## Komponenter (nya, utöver ärvda BI-komponenter)

| Komponent | Syfte |
|---|---|
| `PartyMark.astro` | Färgruta + förkortning — enda stället partifärg syns |
| `EvidenceBadge.astro` | Evidensstatus: unik SVG-ikonform **+** textetikett per status (aldrig färg ensamt — WCAG 1.4.1) |
| `NotResearched.astro` | Skiljer "ej granskat" från "granskat, inget hittat" |
| `PositionBlock.astro` | Fällbar ståndpunkt: sammanfattning synlig, källor/klassning bakom `<details>` |
| `SourceItem.astro` | Fullständig källpost: typ, datum, utdrag, stödförklaring, extern länk |
| `Timeline.astro` | Vertikal tidslinje, hairline + punkt-markörer |
| `CompareTool.tsx` | Enda React-ön (interaktivt filter + delbar URL) |
| `NeutralityNote.astro` | Återanvänd neutralitetsdeklaration, alltid samma text |

## Motiv i stället för klichéer

Logotypen (`LogoMark`, ärvd) är ett neutralt rutnätsmotiv. Favicon är en
enkel valurne-linjeteckning (`public/favicon.svg`) — inget nätverks-/
hjärn-/robotmotiv. `EvidenceBadge` använder geometriska linjeformer (fylld
ruta, streckad ruta, pilar för motstridiga positioner) snarare än
trafikljusfärger eller ikonbibliotek med teknik-klichéer.

## Layout- och interaktionsprinciper

- **Mobile-first:** enkelkolumn som standard, `md:`/`lg:`-breakpoints lägger
  till kolumner. Tabeller (jämförelseverktyg, riksdagsaktivitet) får egen
  `overflow-x-auto`-container — sidan i övrigt scrollar aldrig sidledes.
- **Hairlines, inte skuggor:** `border-border` genomgående, `hover:border-foreground`
  för interaktiva kort — håller ytan "tryckt", inte "app-aktig".
- **Fällbara sektioner (`<details>`):** native HTML, fungerar utan JS,
  tillgängligt by default (tangentbord, skärmläsare).
- **Skip-link, synlig fokusring, `prefers-reduced-motion`:** definierade
  globalt i `global.css`, inte per komponent.

## Vad som medvetet undviks

Robotar, glödande hjärnor, futuristiska kretsmönster, rött-mot-blått,
kampanjaffisch-typografi, gamification (poäng, badges för "mest aktiva
parti"), dolda scoring-system, akademisk jargong utan förklaring.
