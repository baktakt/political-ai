# Sitemap

```
/                           Startsida — syfte, AI som politisk fråga,
                            AI & hållbarhet, ämnesöversikt, partiöversikt,
                            väljarfrågor, metod-teaser, neutralitetsdeklaration

/partier/                   Partiöversikt — alla 8 partier, samma layout,
                            bokstavsordning
/partier/[id]/              Partiprofil (c, kd, l, m, mp, s, sd, v)
                              - Övergripande AI/hållbarhetshållning
                              - Ståndpunkter ämne för ämne (19 ämnen)
                              - Konkreta förslag
                              - Riksdagsaktivitet (tabell)
                              - Regering/Tidöavtalet-distinktion (vid behov)
                              - Tidslinje
                              - Luckor: ingen ståndpunkt / ej granskat /
                                motstridigt eller ändrat
                              - Källförteckning
                              - Länk: föreslå korrigering

/amnen/                     Ämnesöversikt — 14 "AI i samhället" +
                            5 "AI & hållbarhet" (huvudspår, ej fotnot)
/amnen/[id]/                Ämnessida (19 st, se TAXONOMI.md för id-lista)
                              - Varför frågan spelar roll + nyckelfrågor
                              - Partiernas ståndpunkter sida vid sida
                              - Jämförande analys (överens/oense)
                              - Förslag och riksdagsaktivitet
                              - Saknade ståndpunkter (granskat vs ej granskat)
                              - Källor
                              - Länk: jämför partier i ämnet / korrigering

/jamfor/                    Jämförelseverktyg (React-ö)
                              - Välj partier + ämnen
                              - Filter: evidensstatus, endast förslag,
                                endast riksdagsaktivitet, endast
                                regeringsåtgärder, nyligen uppdaterat
                              - Markera saknade ståndpunkter
                              - Delbar URL (query-parametrar)

/fragor/                    Väljarfrågor — översikt
/fragor/[id]/               Enskild fråga besvarad ur strukturerad data,
                            partier i bokstavsordning, länk vidare till
                            ämnessidans källor

/kallor/                    Fullständig källförteckning, grupperad enligt
                            källhierarkin (partiwebb → … → expertanalys)

/metod/                     Metodik: principer, källhierarki, evidensstatus,
                            evidenstyper, hantering av osäkerhet, redaktionellt
                            arbetsflöde, granskningsrutin, öppenhet om
                            AI-användning, begränsningar

/ordlista/                  Ordlista — tekniska/parlamentariska begrepp

/uppdateringar/             Versionshistorik / uppdateringslogg
/rss.xml                    RSS-feed för uppdateringar

/korrigeringar/             Öppen korrigeringspolicy + formulär (öppnar
                            GitHub-ärende) + logg över genomförda rättelser

/om/                        Syfte, neutralitet, integritet, tillgänglighet,
                            teknik/öppenhet, kontakt

/sok/                       Fritextsök (Pagefind) över allt publicerat
                            innehåll, med filter (parti, ämnesgrupp, typ)

/404                        Anpassad felsida med sökgenväg

Icke-sidor:
/sitemap-index.xml          Genererad av @astrojs/sitemap
/robots.txt                 Statisk
/favicon.svg                Statisk (valurne-motiv, ej robotar/hjärnor)
```

## Navigering

Huvudmeny (alla sidor): Partierna · Ämnen · Jämför · Frågor · Metod · Sök.
Sidfot: samma länkar plus Källförteckning, Ordlista, Uppdateringar,
Korrigeringar, Om webbplatsen. Mobilmeny är en CSS-only `<details>`-lösning
(ingen JS-hydrering krävs för navigeringen), ärvd från komponentbiblioteket.
