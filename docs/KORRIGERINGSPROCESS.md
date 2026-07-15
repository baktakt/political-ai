# Korrigeringsprocess (internt arbetsflöde)

Den publika policyn och formuläret finns på `/korrigeringar/`. Detta
dokument beskriver hanteringen bakom kulisserna.

## Inflöde

Korrigeringsformuläret (`src/pages/korrigeringar/index.astro`) öppnar ett
GitHub-ärende med sidan och felbeskrivningen förifyllda — kräver inget
eget backend. Ärenden kan också komma via e-post eller direkt som
GitHub-issues.

## Hantering, steg för steg

1. **Registrera** anmälan som en post i `src/data/corrections.json`
   (`status: "mottagen"`).
2. **Granska mot originalkällan** — öppna den källa påståendet grundar
   sig på (`sourceIds` på den berörda `position`/`proposal`/`action`) och
   avgör om anmälan stämmer. Sätt `status: "under_granskning"` under tiden.
3. **Om felet bekräftas:**
   - Rätta texten i relevant `src/data/*.json`-fil.
   - Om felet kan ha gett en skev bild av ett parti (positivt eller
     negativt): skriv det uttryckligen i `resolution`.
   - Sätt `status: "atgardad"` och fyll i `resolution` med vad som
     ändrades.
   - Lägg till en post i `updates.json` (`type: "korrigering"`).
   - Uppdatera `lastUpdatedAt`/`lastReviewedAt` för den berörda posten.
4. **Om anmälan avvisas:**
   - Sätt `status: "avvisad"` och motivera i `resolution` — avvisade
     anmälningar redovisas också, med motivering (krav i uppdraget).
5. **Publicera** — `corrections.json` renderas direkt på `/korrigeringar/`
   som en öppen logg; ingen separat publiceringsknapp behövs.

## Prioritering

Sakfel som felaktigt tillskriver ett parti en ståndpunkt de inte har
(eller döljer en de har) hanteras med förtur framför språkliga/kosmetiska
fel, i linje med neutralitetsprincipen.

## Skillnad mot vanlig innehållsuppdatering

En korrigering rättar ett **fel** i redan publicerat material. En vanlig
uppdatering (se `UNDERHALL.md`) lägger till **ny** dokumentation (t.ex. ett
nytt valmanifest). Båda loggas i `updates.json`, men bara korrigeringar
får en egen post i `corrections.json` och räknas i den öppna
rättelsestatistiken.
