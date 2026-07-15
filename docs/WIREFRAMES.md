# Lågupplösta wireframes

Textbaserade layoutskisser för de centrala sidtyperna. Se den byggda
webbplatsen för fidelity — dessa är de ursprungliga strukturskisserna som
implementationen följer.

## Startsida

```
┌─────────────────────────────────────────────────┐
│ [Logo] Partierna om AI      Partier Ämnen Jämför…│ ← sticky header
├─────────────────────────────────────────────────┤
│ INFÖR RIKSDAGSVALET 2026                         │
│ Vad vill partierna med AI — och vad har de       │ ← H1, stor
│ faktiskt gjort?                                  │
│ [ingress-text, 2-3 meningar]                     │
│ [Se partierna] [Jämför] [Börja med en fråga]     │ ← CTA-rad
│ ┌───────────────────────────────────────────┐   │
│ │ NEUTRALITET: kort deklaration + länk       │   │ ← alltid synlig
│ └───────────────────────────────────────────┘   │
│ Research senast uppdaterad 15 juli 2026          │
├─────────────────────────────────────────────────┤
│ AI som politisk fråga  [två spalter brödtext]    │
├─────────────────────────────────────────────────┤
│ AI och hållbarhet      [två spalter + 5 kort]    │
├─────────────────────────────────────────────────┤
│ Ämnesområden (14)      [lista med nummer]        │
├─────────────────────────────────────────────────┤
│ Partierna (8)          [2×4 grid, alfabetiskt]   │
├─────────────────────────────────────────────────┤
│ Börja med en fråga     [2×2 kort]                │
├─────────────────────────────────────────────────┤
│ Metod / Källor / Korrigeringar  [3 kort]         │
├─────────────────────────────────────────────────┤
│ [Footer: brand, browse-länkar, system-länkar]    │
└─────────────────────────────────────────────────┘
Mobilt: samma sektioner staplade, grid → 1 kolumn,
CTA-knappar staplas vertikalt, meny → hamburgermeny.
```

## Partiprofil (`/partier/[id]/`)

```
┌─────────────────────────────────────────────────┐
│ Partierna / [Partinamn]                          │ ← brödsmulor
│ [Partinamn stor]              ┌─────────────┐    │
│ [neutral saklig beskrivning]  │ ■ Förkortn. │    │ ← faktaruta
│ [ev. regeringsnot]            │ Status      │    │
│                                │ Mandat 2022 │    │
│                                │ Verifierad  │    │
│                                │ [Partiets   │    │
│                                │  webbplats] │    │
│                                └─────────────┘    │
│ Research senast granskad …                       │
├─────────────────────────────────────────────────┤
│ AI- och hållbarhetshållning i korthet            │
│ [AI-ruta]              [Hållbarhets-ruta]        │
├─────────────────────────────────────────────────┤
│ Dokumenterade ståndpunkter                       │
│ AI i samhället (14 rader, fällbara)              │
│ AI & hållbarhet (5 rader, fällbara)               │
│  — varje rad: [evidensmärke] rubrik + summary    │
│    fälls ut → fördjupning + klassning + källor   │
├─────────────────────────────────────────────────┤
│ Konkreta förslag        [kort per förslag]       │
├─────────────────────────────────────────────────┤
│ Riksdagsaktivitet       [tabell: datum/typ/titel/│
│                          nivå/resultat]           │
├─────────────────────────────────────────────────┤
│ [Regering/Tidö-distinktion, om tillämpligt]      │
├─────────────────────────────────────────────────┤
│ Tidslinje               [vertikal, nyast överst] │
├─────────────────────────────────────────────────┤
│ Var dokumentation saknas [2 kolumner + ev.       │
│                           motstridigt-box]        │
├─────────────────────────────────────────────────┤
│ Källförteckning          [alla källor för sidan] │
├─────────────────────────────────────────────────┤
│ Senast granskad …        [Föreslå korrigering]   │
└─────────────────────────────────────────────────┘
```

## Ämnessida (`/amnen/[id]/`)

```
┌─────────────────────────────────────────────────┐
│ Ämnen / [Ämnesnamn]                               │
│ [grupp-etikett] · område N av 19                  │
│ [Ämnestitel stor] [beskrivning]                   │
├─────────────────────────────────────────────────┤
│ ┃ Varför frågan spelar roll                      │ ← vänsterlinje-ruta
│ ┃ [brödtext]                                      │
│ Politiska nyckelfrågor  [lista med "?"-markör]    │
├─────────────────────────────────────────────────┤
│ Partiernas ståndpunkter (8, bokstavsordning)      │
│  — samma fällbara radformat som partiprofilen     │
├─────────────────────────────────────────────────┤
│ Var partierna möts och skiljs åt                  │
│ [Samsyn-kort]            [Skiljelinje-kort]       │
├─────────────────────────────────────────────────┤
│ Förslag och riksdagsaktivitet                     │
├─────────────────────────────────────────────────┤
│ Saknade ståndpunkter    [granskat/ej granskat]    │
├─────────────────────────────────────────────────┤
│ Källor                                            │
├─────────────────────────────────────────────────┤
│ Senast granskad  [Jämför i ämnet] [Korrigering]   │
└─────────────────────────────────────────────────┘
```

## Jämförelseverktyg (`/jamfor/`)

```
┌─────────────────────────────────────────────────┐
│ Jämför partierna                                  │
├───────────────────────┬───────────────────────────┤
│ 1 · Välj partier       │ 2 · Välj ämnen            │
│ [checkbox-grid, 2 kol] │ [checkbox-grid, scrollbar]│
├───────────────────────┴───────────────────────────┤
│ 3 · Filtrera (valfritt)                           │
│ ( ) Alla  ( ) Endast förslag  ( ) Riksdag  ( ) Reg │
│ [ ] Nyligen uppdaterat  [ ] Markera saknat         │
│                                    [Kopiera länk]  │
├─────────────────────────────────────────────────┤
│ [Ämnesrubrik 1]                                   │
│ ┌─────────┬─────────┬─────────┐                  │
│ │ Parti A │ Parti B │ Parti C │  ← tabellhuvud     │
│ ├─────────┼─────────┼─────────┤                  │
│ │[status] │[status] │ Ej      │                  │
│ │summary  │summary  │ granskat│                  │
│ └─────────┴─────────┴─────────┘                  │
│ [Ämnesrubrik 2 …]                                 │
├─────────────────────────────────────────────────┤
│ "Utser ingen vinnare" — alltid synlig disclaimer  │
└─────────────────────────────────────────────────┘
Mobilt: tabeller får horisontell scroll inom egen
container (sidan i övrigt scrollar aldrig sidledes).
```

## Designprinciper som styr alla wireframes

- Hairline-ramar i stället för skuggor/färgblock — "editorial", inte "app".
- Mono-versal kicker (`bi-mono`) ovanför varje sektionsrubrik för orientering.
- Evidensstatus har alltid ikonform + textetikett, aldrig bara färg.
- Fällbara block (`<details>`) för fördjupning/källor — håller sidorna
  skanningsbara utan att gömma information bakom klick-igenom.
