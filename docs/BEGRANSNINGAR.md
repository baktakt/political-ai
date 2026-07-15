# Kända begränsningar

Detta är den permanenta, publicerade begränsningslistan (speglas kort på
`/metod/`). Skiljer sig från `FORSKNINGSLUCKOR.md`, som är ett ögonblicks-
läge över *täckning*; det här dokumentet beskriver vad webbplatsen
**strukturellt** inte gör, oavsett hur mycket research som läggs till.

## Vad webbplatsen inte mäter eller gör

- **Ingen rekommendation.** Ingen algoritm eller redaktör räknar fram
  vilket parti en läsare "borde" rösta på.
- **Ingen rangordning eller poängsättning.** Evidensstatus beskriver hur
  väl belagd en ståndpunkt är — inte hur bra politiken är. Ett parti med
  fler granskade ämnen är inte "bättre", bara mer dokumenterat (se
  `PartyCard.astro`, som uttryckligen skriver ut detta).
- **Ingen mätning av politikens kvalitet, kostnad eller genomförbarhet.**
  Det ligger utanför uppdraget och kräver typer av expertis (t.ex.
  nationalekonomisk konsekvensanalys) som inte ingår i källhierarkin.
- **Ingen mätning av intern åsiktsspridning i partierna.** En officiell
  ståndpunkt kan dölja intern oenighet; webbplatsen redovisar bara vad som
  är dokumenterat officiellt.
- **Fångar inte odokumenterade åsikter.** Om ett parti tycker något men
  aldrig skrivit ner det i ett granskningsbart forum, syns det inte här —
  och ska inte antas.
- **Ingen realtidsuppdatering.** Ståndpunkter kan hinna ändras mellan
  granskningstillfällen; varje sida visar sitt eget "senast granskad"-datum.
- **Ingen personanpassning.** Inga konton, ingen lagrad läshistorik, inget
  "hitta ditt parti"-quiz.

## Metodologiska begränsningar

- **Källor beroende av offentlig tillgänglighet.** Om ett parti tar bort
  eller ändrar en sida efter att den citerats syns det som en döende länk
  vid nästa länkkontroll (`scripts/check-links.mjs`), inte automatiskt.
  `archivedUrl`-fältet finns i schemat för att adressera detta men är inte
  fyllt i i piloten.
- **AI-assisterad research, redaktionellt granskad — inte fri från fel.**
  Se `/metod/#ai-anvandning`. Varje källa länkas så att läsaren själv kan
  kontrollera den, men verktygsbaserad citatextraktion (särskilt från
  webbsidor snarare än PDF/dokument) har lägre garanterad ordagrannhet —
  se punkt 1 i `METODOLOGISKA_FRAGOR.md`.
- **Svensk kontext specifikt.** Källhierarkin och den parlamentariska
  vokabulären (partimotion, kommittémotion, betänkande) är byggd för
  Sveriges riksdag och överförs inte automatiskt till andra länders system.
- **Statisk export.** Webbplatsen byggs som statiska HTML-sidor; data
  uppdateras genom att ändra JSON-filerna och bygga om, inte i realtid.
  Detta är en avsiktlig avvägning för enkelhet, transparens (all data i
  versionskontrollerad JSON) och låg driftskostnad — inte en begränsning
  som planeras åtgärdas.

## Tillgänglighetsbegränsningar i piloten

Automatiserade tester (axe-core, se `docs/rapporter/tillganglighet.md`)
täcker 14 representativa sidor, inte varje enskild parti-/ämnessida
(vilka delar mall och komponenter, så risken för mall-specifika fel är
låg men inte noll). Manuell tangentbords- och skärmläsartestning av hela
sidträdet har inte genomförts i piloten — se `README.md` för rekommenderad
uppföljning.
