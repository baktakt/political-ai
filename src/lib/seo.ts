import { SITE } from "@/data/site";

export interface SeoProps {
  title?: string;
  description?: string;
  type?: "website" | "article";
  image?: string;
  publishedAt?: string;
}

export function pageTitle(title?: string): string {
  return title ? `${title} – ${SITE.name}` : `${SITE.name} – ${SITE.tagline}`;
}

export function truncateDescription(description?: string): string {
  const d = description ?? SITE.description;
  return d.length > 160 ? `${d.slice(0, 157).trimEnd()}…` : d;
}
