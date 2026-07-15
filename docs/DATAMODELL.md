# Datamodell

Fullständig definition: `src/lib/schema.ts` (Zod-scheman, källa till sanning).
Astro content collections (`src/content.config.ts`) läser JSON-filer i
`src/data/` och validerar dem mot dessa scheman vid varje bygge — ett
schemafel stoppar bygget.

## Entiteter

### Party (`parties.json`)
`id, name, abbreviation, officialUrl, color, colorNote, seats2022,
currentSeats, parliamentaryStatus, governmentStatus, governmentNote,
summary, aiSummary, aiPriorities[], sustainabilityPriorities[],
lastReviewedAt, verifiedAt, verificationSourceIds[]`

`aiSummary: null` och `lastReviewedAt: null` betyder uttryckligen
"ej granskad ännu" — skilt från en tom sträng, som webbplatsen aldrig
producerar.

### Topic (`topics.json`)
`id, title, shortTitle, description, whyItMatters, keyQuestions[], group
("samhalle"|"hallbarhet"), parentTopic, displayOrder, analysis`
(analysis: `{agreements[], disagreements[], note, updatedAt}` eller `null`
tills ämnet granskats redaktionellt).

### PartyPosition (`positions.json`)
`id, partyId, topicId, summary, detailedPosition, evidenceStatus,
evidenceTypes[], confidenceExplanation, sourceIds[], workflowStatus,
lastUpdatedAt`

Schemat tvingar (via `.refine`): varje `evidenceStatus` utom
`ingen_dokumenterad` måste ha ≥1 `sourceIds`. Högst en position per
`(partyId, topicId)`-par (testad, inte schematvingad — se `tests/data.test.ts`).

### Proposal (`proposals.json`)
`id, partyId, topicIds[], title, description, date, status,
implementationStatus, sourceIds[], workflowStatus`

### ParliamentaryAction (`actions.json`)
`id, partyId, actionType, title, date, documentNumber, result, partyLevel
(bool), topicIds[], sourceIds[], workflowStatus`

`partyLevel` är den tekniska implementationen av kravet "individ ≠ parti":
`true` för parti-/kommittémotioner, `false` för enskilda motioner.

### Source (`sources.json`)
`id, title, publisher, author, publicationDate, url, accessedAt,
sourceType, excerpt, supportExplanation, officialPolicy, archivedUrl,
isCurrent`

`excerpt` testas (`tests/data.test.ts`) att vara ≤60 ord — inga långa
copyright-citat. `officialPolicy` skiljer partiets egna dokument från t.ex.
mediarapportering om ett uttalande.

### TimelineEvent (`timeline.json`)
`id, partyId, date, title, description, eventType, sourceIds[]`

### ResearchReview (`reviews.json`)
`id, partyId (null = hela datamängden), reviewer, reviewDate,
topicsReviewed[], unresolvedQuestions[], notes`

### Correction (`corrections.json`)
`id, submittedAt, pageUrl, description, status, resolution`

### Ytterligare samlingar (utöver kravlistans minimum)
- **VoterQuestion** (`questions.json`): `id, question, intro, topicIds[],
  displayOrder` — driver `/fragor/`.
- **GlossaryEntry** (`glossary.json`): `id, term, definition, example`.
- **UpdateEntry** (`updates.json`): `id, date, title, description, type`
  — driver `/uppdateringar/` och RSS-flödet.
- **DatasetMeta** (`meta.json`, singleton `id: "meta"`):
  `datasetVersion, lastUpdated, researchLastUpdated, pilot, notes` — visas
  i sidfoten på varje sida ("Research uppdaterad …").

## Referensintegritet

Alla `partyId`/`topicId`/`sourceIds`-fält är strängreferenser (ingen
databas-FK), integriteten upprätthålls av `tests/data.test.ts`:
varje position/förslag/åtgärd/tidslinjehändelse måste peka på ett parti,
ämne och källor som faktiskt existerar. Detta är den enda "constraint"-
mekanismen — avsiktligt enkel eftersom hela datamängden är statiska
JSON-filer under versionskontroll, inte en databas.

## Evidensklassificering — inga poäng

`evidenceStatus` (10 värden) och `evidenceType` (11 värden) är enums med
textetiketter (`src/lib/evidence.ts`), inte numeriska fält. Detta är en
medveten begränsning i schemat: det finns inget `confidenceScore: number`-
fält att lägga till av misstag, eftersom kravet är "inga opaka
AI-konfidensprocent" och "ingen numerisk ideologiskala".

## Arbetsflöde (`workflowStatus`)

`upptackt → extraherad → behover_verifiering → verifierad →
behover_redaktionell_granskning → godkand → publicerad → foraldrad →
arkiverad`. Endast `"publicerad"` visas på webbplatsen
(`src/lib/content.ts` → `getPublishedPositions()` m.fl. filtrerar bort
allt annat). Detta gör det säkert att lägga in ograskat researchmaterial i
samma filer utan att det oavsiktligt publiceras.
