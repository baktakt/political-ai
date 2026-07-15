/**
 * Dataåtkomst — hämtar och filtrerar innehåll från content collections.
 *
 * Viktiga principer:
 * - Endast poster med workflowStatus "publicerad" visas på webbplatsen.
 * - Partier listas alltid i bokstavsordning (neutralitetsprincip).
 * - Skillnaden mellan "ingen dokumenterad ståndpunkt" (granskad, inget
 *   hittat) och "ännu ej granskad" (ingen post alls) bevaras.
 */
import { getCollection, getEntry } from "astro:content";
import type { CollectionEntry } from "astro:content";

export type PartyEntry = CollectionEntry<"parties">;
export type TopicEntry = CollectionEntry<"topics">;
export type PositionEntry = CollectionEntry<"positions">;
export type SourceEntry = CollectionEntry<"sources">;

const collator = new Intl.Collator("sv");

/** Partier i bokstavsordning efter namn (neutral ordning, förklaras i metod). */
export async function getPartiesSorted(): Promise<PartyEntry[]> {
  const parties = await getCollection("parties");
  return parties.sort((a, b) => collator.compare(a.data.name, b.data.name));
}

/** Ämnen i taxonomins ordning. */
export async function getTopicsSorted(): Promise<TopicEntry[]> {
  const topics = await getCollection("topics");
  return topics.sort((a, b) => a.data.displayOrder - b.data.displayOrder);
}

export async function getTopicGroups() {
  const topics = await getTopicsSorted();
  return {
    samhalle: topics.filter((t) => t.data.group === "samhalle"),
    hallbarhet: topics.filter((t) => t.data.group === "hallbarhet"),
  };
}

/** Publicerade ståndpunkter (enda som visas på webbplatsen). */
export async function getPublishedPositions(): Promise<PositionEntry[]> {
  const positions = await getCollection("positions");
  return positions.filter((p) => p.data.workflowStatus === "publicerad");
}

export async function getPositionsByTopic(topicId: string) {
  const positions = await getPublishedPositions();
  return positions.filter((p) => p.data.topicId === topicId);
}

export async function getPositionsByParty(partyId: string) {
  const positions = await getPublishedPositions();
  return positions.filter((p) => p.data.partyId === partyId);
}

export async function getPublishedProposals() {
  const proposals = await getCollection("proposals");
  return proposals
    .filter((p) => p.data.workflowStatus === "publicerad")
    .sort((a, b) => collator.compare(b.data.date, a.data.date));
}

export async function getPublishedActions() {
  const actions = await getCollection("actions");
  return actions
    .filter((a) => a.data.workflowStatus === "publicerad")
    .sort((a, b) => collator.compare(b.data.date, a.data.date));
}

export async function getSourcesMap(): Promise<Map<string, SourceEntry>> {
  const sources = await getCollection("sources");
  return new Map(sources.map((s) => [s.id, s]));
}

export async function getTimelineForParty(partyId: string) {
  const events = await getCollection("timeline");
  return events
    .filter((e) => e.data.partyId === partyId)
    .sort((a, b) => collator.compare(b.data.date, a.data.date));
}

export async function getMeta() {
  const meta = await getEntry("meta", "meta");
  if (!meta) throw new Error("meta.json saknar posten 'meta'");
  return meta.data;
}

/**
 * Täckningsläge för en kombination av parti och ämne:
 * - en publicerad ståndpunkt (inklusive "ingen_dokumenterad"), eller
 * - "ej_granskad" när ingen granskning gjorts ännu.
 */
export type Coverage =
  | { state: "position"; position: PositionEntry }
  | { state: "ej_granskad" };

export function coverageFor(
  positions: PositionEntry[],
  partyId: string,
  topicId: string,
): Coverage {
  const position = positions.find(
    (p) => p.data.partyId === partyId && p.data.topicId === topicId,
  );
  return position ? { state: "position", position } : { state: "ej_granskad" };
}

/** Antal granskade ämnen per parti (dokumentationsläge, ingen kvalitetsmätning). */
export function reviewedTopicCount(
  positions: PositionEntry[],
  partyId: string,
): number {
  return positions.filter((p) => p.data.partyId === partyId).length;
}
