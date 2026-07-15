# Redaktionell granskningschecklista

Används innan en `position`/`proposal`/`parliamentaryAction`-post får
`workflowStatus: "publicerad"`. Motsvarar kraven i uppdragsbeskrivningens
kvalitetskontroll-avsnitt, omsatt till en konkret checklista per post.

## Före publicering — obligatoriskt för varje påstående

- [ ] Källan är öppnad (inte bara sökträff-utdrag).
- [ ] Källan har kontrollerats — texten som citeras/refereras finns
      faktiskt där.
- [ ] Påståendet återger källan korrekt (ingen överdrift, ingen
      förenkling som ändrar innebörden).
- [ ] Partitillhörigheten är verifierad (rätt `partyId`, och om det är en
      motion: rätt avsändare).
- [ ] Belägget är klassificerat (`evidenceStatus` **och** `evidenceTypes`,
      inte bara det ena).
- [ ] Publiceringsdatum är noterat (`publicationDate`/`date`); om okänt,
      `null` snarare än gissat.
- [ ] Är det en **partimotion/kommittémotion** (partinivå,
      `partyLevel: true`) eller en **enskild motion** (`false`)? Enskilda
      motioner får aldrig representeras som partiets ståndpunkt utan
      tydlig markering.
- [ ] Är det ett **personligt uttalande**, en **koalitionskompromiss**
      eller ett **regeringsbeslut**? Rätt `evidenceType` valt
      (`enskilt_uttalande` / `koalitionsavtal` / `regeringspolitik`).
- [ ] Har partiets position ändrats sedan en tidigare granskad källa?
      Om ja: `evidenceStatus: "andrad_standpunkt"` och båda tidpunkterna
      beskrivna med datum.
- [ ] Är språket neutralt? Inga värdeord ("bra", "otillräckligt",
      "modernt") om de inte är direkta citat markerade som sådana.
- [ ] Är eventuell tolkning tydligt markerad ("Tolkning: …") och aldrig
      formulerad som partiets officiella ståndpunkt?
- [ ] Tillämpas exakt samma granskningsstandard som för övriga partier i
      samma ämne? (Stickprov: läs igenom samtliga 8 partiers text för
      ämnet i följd och jämför tonen.)
- [ ] Skulle formuleringen kunna gynna eller missgynna ett parti om den
      lästes isolerat, utanför sitt sammanhang?
- [ ] Är källan synlig och länkad för läsaren (inte bara refererad i
      redaktionella anteckningar)?

## Före publicering — per ämnessida

- [ ] Alla 8 partier är antingen `positions`-post eller uttryckligt
      "ej granskat"; inget parti saknas tyst.
- [ ] `analysis`-fältet (överens/oense) bygger enbart på ståndpunkter
      som faktiskt är publicerade för det ämnet — inte på antaganden om
      partier som inte granskats än.

## Före publicering — schemavalidering (automatiserad)

- [ ] `npm test` grönt (schema + referensintegritet + evidensregler).
- [ ] `npm run build` grönt (Astro validerar collections mot Zod-schema).
- [ ] `npm run check:links` kör utan nya trasiga interna länkar.

## Vid rättelse (se även `KORRIGERINGSPROCESS.md`)

- [ ] Ursprunglig felaktig text och ny korrekt text är båda spårbara
      (git-historik + post i `corrections.json`).
- [ ] Om felet kan ha gett en skev bild av ett parti: detta anges
      uttryckligen i `resolution`-fältet.
- [ ] Rättelsen loggas i `updates.json` (`type: "korrigering"`) så den
      syns i RSS-flödet och på `/uppdateringar/`.
