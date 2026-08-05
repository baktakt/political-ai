/** Webbplatsens grundkonfiguration. */

export const SITE = {
  name: "Partierna om AI",
  tagline: "Riksdagspartierna om AI och hållbarhet — granskat och källbelagt",
  brandSubtitle: "AI · hållbarhet · politik",
  description:
    "Neutral, källbaserad väljarinformation om hur riksdagspartierna förhåller sig till artificiell intelligens och hållbarhet: vad de säger, vad de föreslagit och vad de gjort.",
  neutralityStatement:
    "Webbplatsen är partipolitiskt neutral. Den rekommenderar inte något parti och rangordnar inte partierna. Alla partier granskas med samma metod, och varje påstående är kopplat till en källa.",
  /** Kontaktväg för korrigeringar. GitHub-issues är primär kanal i piloten. */
  repoUrl: "https://github.com/baktakt/political-ai",
  contactEmail: null as string | null,
};

export type NavItem = { href: string; label: string };

export const NAV_ITEMS: NavItem[] = [
  { href: "/partier/", label: "Partierna" },
  { href: "/fragor/", label: "Frågor" },
  { href: "/jamfor/", label: "Jämför" },
  { href: "/amnen/", label: "Ämnen" },
  { href: "/omvarldsbevakning/", label: "Omvärld" },
  { href: "/sok/", label: "Sök" },
];

export const FOOTER_BROWSE_LINKS: NavItem[] = [
  { href: "/partier/", label: "Partierna" },
  { href: "/fragor/", label: "Vanliga frågor" },
  { href: "/jamfor/", label: "Jämför partier" },
  { href: "/amnen/", label: "Ämnen" },
  { href: "/omvarldsbevakning/", label: "Omvärldsbevakning" },
  { href: "/sok/", label: "Sök" },
];

export const FOOTER_SYSTEM_LINKS: NavItem[] = [
  { href: "/metod/", label: "Metod och källor" },
  { href: "/kallor/", label: "Källförteckning" },
  { href: "/ordlista/", label: "Ordlista" },
  { href: "/uppdateringar/", label: "Uppdateringar" },
  { href: "/korrigeringar/", label: "Korrigeringar" },
  { href: "/om/", label: "Om webbplatsen" },
];
