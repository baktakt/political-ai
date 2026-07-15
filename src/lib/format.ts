/** Datumformattering på svenska för flexibla datum (YYYY, YYYY-MM, YYYY-MM-DD). */

const MONTHS = [
  "januari",
  "februari",
  "mars",
  "april",
  "maj",
  "juni",
  "juli",
  "augusti",
  "september",
  "oktober",
  "november",
  "december",
];

export function formatDate(date: string | null | undefined): string {
  if (!date) return "okänt datum";
  const parts = date.split("-");
  if (parts.length === 1) return parts[0];
  const year = parts[0];
  const month = MONTHS[Number(parts[1]) - 1] ?? "";
  if (parts.length === 2) return `${month} ${year}`;
  return `${Number(parts[2])} ${month} ${year}`;
}

export function hostFromUrl(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}
