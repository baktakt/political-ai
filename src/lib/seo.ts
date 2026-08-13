import { SITE } from "@/data/site";

export interface SeoProps {
  /** Sidans egna titel. Läggs alltid före webbplatsnamnet. */
  title?: string;
  /** Sidans egen beskrivning. Används i vanlig metadata och i delningskort. */
  description?: string;
  type?: "website" | "article";
  /** Valfri väg till en egen delningsbild; annars används webbplatsens standardbild. */
  image?: string;
  /** Beskrivning av delningsbilden för skärmläsare och delningstjänster. */
  imageAlt?: string;
  publishedAt?: string;
}

export function pageTitle(title?: string): string {
  return title ? `${title} – ${SITE.name}` : `${SITE.name} – ${SITE.tagline}`;
}

export function truncateDescription(description?: string): string {
  const d = description ?? SITE.description;
  return d.length > 160 ? `${d.slice(0, 157).trimEnd()}…` : d;
}
