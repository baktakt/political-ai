# Ämnestaxonomi

Källa: `src/data/topics.json` (valideras mot `topicSchema` i `src/lib/schema.ts`).
19 ämnen i två grupper. Hållbarhet är ett **huvudspår med fem egna ämnen** —
inte en underrubrik till något annat ämne.

## AI i samhället (14)

| # | id | Titel |
|---|----|-------|
| 1 | `strategi` | Övergripande AI-strategi |
| 2 | `arbetsmarknad` | Jobb och arbetsmarknad |
| 3 | `utbildning` | Skola och utbildning |
| 4 | `naringsliv` | Företagande, innovation och konkurrenskraft |
| 5 | `offentlig-sektor` | AI i offentlig sektor |
| 6 | `vard-omsorg` | Vård och omsorg |
| 7 | `integritet` | Integritet, övervakning och rättigheter |
| 8 | `demokrati` | Demokrati, val och desinformation |
| 9 | `forsvar` | Försvar, cybersäkerhet och nationell säkerhet |
| 10 | `kultur-upphovsratt` | Kultur, journalistik och upphovsrätt |
| 11 | `reglering` | Reglering, säkerhet och ansvar |
| 12 | `suveranitet` | AI-suveränitet och infrastruktur |
| 13 | `jamlikhet` | Jämlikhet, inkludering och tillgänglighet |
| 14 | `barn-unga` | Barn och unga |

## AI & hållbarhet (5) — huvudspår

| # | id | Titel |
|---|----|-------|
| 15 | `miljoavtryck` | AI:s miljöavtryck |
| 16 | `hallbarhetsverktyg` | AI som verktyg för hållbar utveckling |
| 17 | `byggd-miljo` | Hållbart byggande och den byggda miljön |
| 18 | `rekyleffekter` | Rekyleffekter och total resursanvändning |
| 19 | `social-hallbarhet` | Social hållbarhet och rättvis omställning |

Varje ämne har: `description` (kort), `whyItMatters` (längre, för
"Varför frågan spelar roll"-rutan), `keyQuestions` (minst två neutrala
politiska nyckelfrågor) och `analysis` (redaktionell överens/oense-analys,
`null` tills ämnet granskats redaktionellt — se `metod`).

`parentTopic` finns i schemat för att i framtiden kunna gruppera ämnen
hierarkiskt (t.ex. underämnen till `miljoavtryck`), men används inte i
piloten — alla 19 ämnen är på samma nivå.

## Att lägga till ett ämne

1. Lägg till en post i `src/data/topics.json` med unikt `id` och nästa lediga
   `displayOrder`.
2. Kör `npm test` — schemat validerar strukturen automatiskt.
3. Astro genererar `/amnen/[id]/` automatiskt via `getStaticPaths`.
4. Lägg till ämnet i relevanta `questions.json`-poster om det ska synas under
   "Vanliga frågor".
