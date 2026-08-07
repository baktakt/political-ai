# Språkgranskning: AI-tilltal

Datum: 2026-08-07

## Omfattning

Granskningen omfattar den publicerade svenska gränssnittstexten i `src/pages/`, `src/components/` och de korta introduktionerna i `src/data/questions.json`. Sökningen fokuserade på upprepade övergångsfraser, generella förstärkningar, symmetriska konstruktioner och överanvändning av tankstreck.

## Ändrat

- De tio frågeintroduktionerna hade samma `Här är ...`-konstruktion. De har fått rakare, varierade ingångar utan att ändra ämne eller sakuppgift.
- Omvärlds-, ämnes-, parti- och om-sidorna har fått kortare meningar, färre tankstreck och mindre självrefererande formuleringar.
- Ord som `betydande`, `faktiskt`, `viktigt` och `robust` har inte tagits bort slentrianmässigt. De står kvar när de är en precis beskrivning eller en källa näraliggande formulering.

## Lämnat för redaktionell sakgranskning

`positions.json`, `sources.json`, `proposals.json` och `parties.json` innehåller politiska sammanfattningar, belägg och citat. Där förekommer vissa formuleringar som annars kan låta genererade, exempelvis `världsklass`, `avgörande`, `robust` och `omfattande`.

De ska inte normaliseras automatiskt. I många fall återger de partiets eller källans egna ord, och en språklig ändring kan flytta nyans eller bevisvärde. Vid fortsatt redaktionell granskning bör varje sådan ändring bedömas mot den länkade primärkällan.

## Bedömning

Den tydligaste AI-signalen i den publika redaktionella texten var upprepning och ett lite för jämnt "guide-röstläge", inte enskilda modeord. Efter ändringarna är ingångarna mer direkta och mindre mallartade, samtidigt som neutralitets- och källkraven är bevarade.
