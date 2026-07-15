# Produktbrief — Partierna om AI

## Vad

En neutral, källbaserad webbplats där svenska väljare kan förstå och jämföra
hur riksdagens åtta partier förhåller sig till artificiell intelligens och
hållbarhet: vad de säger, vad de föreslagit och vad de faktiskt gjort genom
motioner, voteringar, budgetar och regeringsbeslut.

## Varför

AI är på väg att bli en valfråga utan att väljare har ett samlat, opartiskt
ställe att jämföra partiernas politik. Existerande bevakning är antingen
spridd över enskilda nyhetsartiklar, eller partiernas egen kampanjretorik.
Ingen aktör samlar dokumenterade ståndpunkter, klassificerar hur väl belagda
de är, och redovisar öppet var dokumentation saknas.

## För vem

Svenska väljare utan specialkunskaper om AI eller riksdagsprocedur, som vill
bilda sig en egen uppfattning inför valet 2026-09-13. Sekundärt: journalister,
forskare och civilsamhällesorganisationer som behöver en källbelagd
utgångspunkt.

## Kärnprincip

Webbplatsen **beskriver** dokumenterade positioner — den **rekommenderar**
inget parti, **rangordnar** inte partierna och räknar inte fram poäng eller
"bästa match". Se `metod`-sidan och `src/lib/schema.ts` för hur detta
upprätthålls tekniskt (inga procentsiffror, inga viktade score-fält).

## Omfattning (pilot → fullskalig)

Piloten (denna leverans) validerar hela kedjan — källmodell, evidensklasser,
sidlayout, neutralitetsprinciper, redaktionellt arbetsflöde och
hållbarhetsramverket — på:

- **Ett ämne på djupet, alla partier:** Jobb och arbetsmarknad (19 ämnen finns
  definierade i taxonomin, se `TAXONOMI.md`)
- **Ett parti på djupet, alla ämnen:** Socialdemokraterna (18 av 19 ämnen
  dokumenterade; ett med explicit "ingen dokumenterad ståndpunkt")

Efter redaktionell granskning av piloten skalas researchen till full
täckning: 8 partier × 19 ämnen = 152 kombinationer, plus löpande uppdatering
inför och under valrörelsen.

## Vad som är i piloten kontra inte

**I piloten:** partilista verifierad mot officiella källor, taxonomi,
datamodell, metodik, hela webbplatsens sidstruktur och komponenter,
jämförelseverktyg, sökfunktion, ett fullt researchat ämne och parti.

**Inte i piloten:** fullständig research för övriga 7 partier × 18 återstående
ämnen. Dessa visas öppet som "Ännu ej granskat" — se `FORSKNINGSLUCKOR.md`.

## Teknikval

Astro (statisk site-generator, samma familj som nyhetsbrevsprojektet
`built-intelligence-components`), med komponentbiblioteket återanvänt via
`npm install github:baktakt/built-intelligence-components` och en egen
"civic election"-färgpalett (se `DESIGN_SYSTEM.md`). Strukturerad data som
JSON valideras med Zod-scheman via Astro content collections. Inga
användarkonton, ingen spårning, inga annonser.

## Framgångsmått (kvalitativa, inte engagemangsmått)

- Varje publicerat påstående har minst en verifierbar källa.
- Samma granskningsstandard tillämpad på alla partier.
- Luckor i dokumentationen är synliga, inte gömda.
- Webbplatsen uppfyller WCAG 2.2 AA.
