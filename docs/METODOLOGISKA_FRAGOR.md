# Olösta metodologiska frågor

Frågor som identifierades genom att faktiskt köra pilotresearchen (ett ämne
× alla partier, ett parti × alla ämnen) — inte hypotetiska, utan sådant som
konkret uppstod och behöver ett redaktionellt beslut innan full skalning.

## 1. Citattrohet från webbsidor kontra dokument

PDF:er och riksdagens dokumenttext (`data.riksdagen.se/dokument/{id}.text`)
kunde verifieras ordagrant. Citat hämtade från partiers webbsidor via
hämtverktyg är beroende av verktygets HTML-till-text-konvertering.
**Öppen fråga:** ska webbsidecitat kräva en andra, oberoende hämtning
(t.ex. `curl` + manuell textextraktion) innan publicering, eller räcker ett
verktyg om resultatet stickprovskontrolleras? Piloten stickprovskontrollerade
5 av 48 källänkar manuellt (se `reviews.json`).

## 2. Motioners slutliga utfall

Piloten redovisar motioner som "framlagt" (proposalStatus) utan att
verifiera utskottsbehandling eller votering. **Öppen fråga:** ska varje
motion få sitt betänkande/sin votering slagen upp innan publicering (ökar
researchtid kraftigt), eller är "framlagt + länk till motionen" tillräckligt
med en tydlig disclaimer, och betänkande/votering läggs till som en andra
researchvåg?

## 3. Partiprogram som inte kunnat öppnas i slutversion

Två fall i piloten: Moderaternas handlingsprogram (endast
stämmoproposition, ej den vid stämman antagna slutversionen) och
Socialdemokraternas partiprogram 2025 (nedladdat och citerat, men
kongressens exakta att-satsbeslut inte verifierade mot protokoll).
**Öppen fråga:** hur länge får en "bästa tillgängliga version"-källa
användas innan den måste ersättas eller flaggas som `andrad_standpunkt`
om slutversionen visar sig skilja sig?

## 4. Hur mycket ska en "ingen dokumenterad ståndpunkt" motivera sökningen?

`confidenceExplanation` för `ingen_dokumenterad`-poster innehåller idag en
lista över var vi sökt (se t.ex. KD:s arbetsmarknadsposition). **Öppen
fråga:** ska detta standardiseras till en strukturerad `searchedWhere[]`-
lista i schemat (i stället för fritext i `confidenceExplanation`) så att
täckningsgrad blir maskinellt jämförbar mellan partier?

## 5. Individnivå som ändå är politiskt relevant

Exempel: L-ledamoten Gellermans motion om hem-chatt-AI, eller
märkningskrav för AI-genererat material som i piloten endast finns som
enskild motion. Dessa är etiketterade `enskilt_uttalande`/`partyLevel:
false` och syns inte som partiets ståndpunkt — men kan ändå vara det enda
spår som finns av att frågan över huvud taget diskuteras i partiet.
**Öppen fråga:** bör ämnessidorna ha en separat, tydligt avgränsad sektion
för "enskilda ledamöters initiativ" i stället för att utelämna dem helt när
ingen partiställning finns?

## 6. Regeringspartiernas gemensamma politik vid gles egen dokumentation

KD hade i piloten *ingen* egen AI-arbetsmarknadsposition men *är*
medansvarig för regeringens AI-strategi. Nuvarande lösning: klassa som
`regeringsatgard` och skriv ut att ingen egen partiposition hittats.
**Öppen fråga:** riskerar detta att osynliggöra att ett regeringsparti kan
sakna en egen linje helt, om läsaren bara skummar evidensstatusen och inte
läser `confidenceExplanation`? Bör UI:t göra distinktionen "egen politik
saknas, endast regeringspolitik finns" mer visuellt framträdande?

## 7. Hur ofta ska valmanifest-bevakning ske under valrörelsen?

Endast SD:s 2026-valplattform var publicerad vid pilotens körning
(2026-07-15); övriga partiers väntas komma successivt fram till valet
(2026-09-13). **Öppen fråga:** hur ofta ska en bevakningsagent köras under
augusti–september för att fånga nya manifest utan att det blir en manuell
börda? Se `UNDERHALL.md` för ett förslag.

## 8. Jämviktning mellan djup och bredd vid full skalning

Pilotens ena spår (ett ämne på djupet) tog cirka 8 minuters agentarbete och
gav 24 källor för 8 partier; det andra (ett parti på djupet) gav 22 källor
för 18 ämnen. Full skalning är 8 partier × 19 ämnen = 152 kombinationer.
**Öppen fråga:** kör vi ämnesvis (som spår 1, konsekvent tvärsnitt men
långsammare per parti) eller partivis (som spår 2, snabbare täckning men
ämnesjämförelser byggs upp mer stegvis)? Rekommendation efter piloten:
ämnesvis, eftersom det ger jämnare underlag för `analysis`-fältets
överens/oense-sammanställning tidigare i processen.
