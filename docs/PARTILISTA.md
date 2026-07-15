# Verifierad partilista

Verifierad **2026-07-15** mot officiella källor — inte utifrån tidigare
kunskap om svensk politik (se metodikens krav på steg 1).

## Källor

1. [Ledamöter och partier](https://www.riksdagen.se/sv/ledamoter-och-partier/)
   — Sveriges riksdag. Bekräftar: 8 riksdagspartier, valperioden 2022–2026,
   349 mandat, samt att 9 ledamöter (1 S, 3 SD, 3 V, 2 M) lämnat sina partier
   under mandatperioden men behåller sina platser utan partibeteckning.
2. [Personlista](https://data.riksdagen.se/personlista/?utformat=json) —
   riksdagens öppna data. Maskinläsbar bekräftelse av mandatfördelningen
   2026-07-15.
3. [Valresultat 2022](https://www.val.se/valresultat/riksdag-region-och-kommun/2022/valresultat.html)
   — Valmyndigheten. Officiellt valresultat per parti.
4. [Regeringen och Sverigedemokraterna presenterar bokslut över Tidöavtalet](https://www.regeringen.se/pressmeddelanden/2026/05/regeringen-och-sverigedemokraterna-presenterar-bokslut-over-tidoavtalet/)
   (2026-05-05) — Regeringskansliet. Bekräftar regeringens sammansättning
   (M, KD, L) och SD:s roll som samarbetsparti via Tidöavtalet, aktuellt vid
   kontrolldatumet.

## Partier (bokstavsordning)

| Parti | Förk. | Mandat 2022 | Ledamöter nu | Status |
|---|---|---|---|---|
| Centerpartiet | C | 24 | 24 | Opposition |
| Kristdemokraterna | KD | 19 | 19 | Regering |
| Liberalerna | L | 16 | 16 | Regering |
| Miljöpartiet de gröna | MP | 18 | 18 | Opposition |
| Moderaterna | M | 68 | 66 | Regering (statsministerparti) |
| Socialdemokraterna | S | 107 | 106 | Opposition |
| Sverigedemokraterna | SD | 73 | 70 | Samarbetsparti (Tidöavtalet) |
| Vänsterpartiet | V | 24 | 21 | Opposition |

Data lagras i `src/data/parties.json` och valideras mot `partySchema`
(`src/lib/schema.ts`). Fältet `verificationSourceIds` kopplar varje parti
till källorna ovan (i `src/data/sources.json`), så verifieringen är
spårbar från datan själv, inte bara från detta dokument.

## Att lägga till eller ta bort ett parti

Arkitekturen är byggd för detta (krav i brief): lägg till/ta bort en post i
`parties.json` (schemat kräver `id`, `officialUrl`, `color`,
`verificationSourceIds` m.m.), uppdatera `PARTY_IDS` i `src/lib/schema.ts`,
och kör om `npm test` — referensintegritetstesterna slår larm om något
`positions`/`proposals`/`actions`-item pekar på ett parti som inte längre
finns.
