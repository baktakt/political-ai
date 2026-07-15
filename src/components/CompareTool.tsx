/**
 * Jämförelseverktyg — React-ö (client:only).
 *
 * Låter besökaren välja partier och ämnen, filtrera på evidensstatus och
 * kopiera en delbar länk. Verktyget utser aldrig någon vinnare och
 * rangordnar inte partierna; det visar dokumenterade ståndpunkter sida
 * vid sida, inklusive var dokumentation saknas.
 */
import { useMemo, useState } from "react";
import {
  EVIDENCE_STATUS_LABELS,
  EVIDENCE_STATUS_TONE,
} from "@/lib/evidence";
import type { EvidenceStatus } from "@/lib/schema";

type PartyItem = { id: string; name: string; abbreviation: string; color: string };
type TopicItem = { id: string; title: string; shortTitle: string; group: string };
type PositionItem = {
  id: string;
  partyId: string;
  topicId: string;
  summary: string;
  evidenceStatus: EvidenceStatus;
  lastUpdatedAt: string;
};

interface Props {
  parties: PartyItem[];
  topics: TopicItem[];
  positions: PositionItem[];
  /** ISO-datum; "nyligen uppdaterad" räknas relativt detta. */
  researchLastUpdated: string;
}

const STATUS_FILTERS: { id: string; label: string; statuses: EvidenceStatus[] }[] = [
  { id: "forslag", label: "Endast konkreta förslag", statuses: ["konkret_forslag"] },
  { id: "riksdag", label: "Endast riksdagsaktivitet", statuses: ["riksdagsaktivitet"] },
  { id: "regering", label: "Endast regeringsåtgärder", statuses: ["regeringsatgard"] },
];

function readUrlState(allParties: PartyItem[], allTopics: TopicItem[]) {
  const params = new URLSearchParams(window.location.search);
  const partyIds = new Set(allParties.map((p) => p.id));
  const topicIds = new Set(allTopics.map((t) => t.id));
  const parties = (params.get("partier") ?? "")
    .split(",")
    .filter((id) => partyIds.has(id));
  const topics = (params.get("amnen") ?? "")
    .split(",")
    .filter((id) => topicIds.has(id));
  const statusFilter = params.get("filter") ?? "";
  return {
    parties: new Set(parties),
    topics: new Set(topics),
    statusFilter: STATUS_FILTERS.some((f) => f.id === statusFilter) ? statusFilter : "",
    onlyRecent: params.get("nyligen") === "1",
    highlightMissing: params.get("markera") === "1",
  };
}

export default function CompareTool({ parties, topics, positions, researchLastUpdated }: Props) {
  const [state, setState] = useState(() => readUrlState(parties, topics));
  const [copied, setCopied] = useState(false);

  const update = (patch: Partial<typeof state>) => {
    const next = { ...state, ...patch };
    setState(next);
    setCopied(false);
    const params = new URLSearchParams();
    if (next.parties.size) params.set("partier", [...next.parties].join(","));
    if (next.topics.size) params.set("amnen", [...next.topics].join(","));
    if (next.statusFilter) params.set("filter", next.statusFilter);
    if (next.onlyRecent) params.set("nyligen", "1");
    if (next.highlightMissing) params.set("markera", "1");
    const query = params.toString();
    history.replaceState(null, "", query ? `?${query}` : window.location.pathname);
  };

  const toggle = (key: "parties" | "topics", id: string) => {
    const next = new Set(state[key]);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    update({ [key]: next } as Partial<typeof state>);
  };

  const selectedParties = parties.filter((p) => state.parties.has(p.id));
  const selectedTopics = topics.filter((t) => state.topics.has(t.id));

  const recentCutoff = useMemo(() => {
    const d = new Date(researchLastUpdated);
    d.setDate(d.getDate() - 90);
    return d.toISOString().slice(0, 10);
  }, [researchLastUpdated]);

  const activeStatuses = STATUS_FILTERS.find((f) => f.id === state.statusFilter)?.statuses;

  function cellFor(partyId: string, topicId: string) {
    const position = positions.find((p) => p.partyId === partyId && p.topicId === topicId);
    if (!position) return { kind: "ej_granskad" as const };
    if (activeStatuses && !activeStatuses.includes(position.evidenceStatus))
      return { kind: "filtrerad" as const, position };
    if (state.onlyRecent && position.lastUpdatedAt < recentCutoff)
      return { kind: "filtrerad" as const, position };
    if (position.evidenceStatus === "ingen_dokumenterad")
      return { kind: "ingen" as const, position };
    return { kind: "position" as const, position };
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
    } catch {
      // Urklipp kan vara blockerat — visa länken så den kan kopieras manuellt.
      window.prompt("Kopiera länken:", window.location.href);
    }
  }

  const missingStyle = "border border-dashed border-border p-3 text-xs text-muted-foreground";

  return (
    <div className="mt-8 space-y-8">
      <div className="grid gap-6 md:grid-cols-2">
        <fieldset className="border border-border bg-card p-4">
          <legend className="bi-mono px-1">1 · Välj partier</legend>
          <div className="grid grid-cols-2 gap-1.5">
            {parties.map((party) => (
              <label
                key={party.id}
                className="flex cursor-pointer items-center gap-2 px-1.5 py-1 text-sm hover:bg-muted"
              >
                <input
                  type="checkbox"
                  checked={state.parties.has(party.id)}
                  onChange={() => toggle("parties", party.id)}
                  className="h-4 w-4 accent-[var(--steel)]"
                />
                <span
                  className="inline-block h-2.5 w-2.5 shrink-0 border border-border"
                  style={{ background: party.color }}
                  aria-hidden="true"
                />
                {party.name}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="border border-border bg-card p-4">
          <legend className="bi-mono px-1">2 · Välj ämnen</legend>
          <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 max-h-64 overflow-y-auto pr-1">
            {topics.map((topic) => (
              <label
                key={topic.id}
                className="flex cursor-pointer items-center gap-2 px-1.5 py-1 text-sm hover:bg-muted"
              >
                <input
                  type="checkbox"
                  checked={state.topics.has(topic.id)}
                  onChange={() => toggle("topics", topic.id)}
                  className="h-4 w-4 shrink-0 accent-[var(--steel)]"
                />
                <span>
                  {topic.shortTitle}
                  {topic.group === "hallbarhet" && (
                    <span className="bi-mono !text-[9px] ml-1.5" style={{ color: "var(--moss)" }}>
                      hållbarhet
                    </span>
                  )}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <fieldset className="border border-border bg-card p-4">
        <legend className="bi-mono px-1">3 · Filtrera (valfritt)</legend>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="radio"
              name="statusfilter"
              checked={state.statusFilter === ""}
              onChange={() => update({ statusFilter: "" })}
              className="h-4 w-4 accent-[var(--steel)]"
            />
            Visa alla ståndpunkter
          </label>
          {STATUS_FILTERS.map((f) => (
            <label key={f.id} className="flex cursor-pointer items-center gap-2">
              <input
                type="radio"
                name="statusfilter"
                checked={state.statusFilter === f.id}
                onChange={() => update({ statusFilter: f.id })}
                className="h-4 w-4 accent-[var(--steel)]"
              />
              {f.label}
            </label>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 border-t border-border pt-3 text-sm">
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              checked={state.onlyRecent}
              onChange={() => update({ onlyRecent: !state.onlyRecent })}
              className="h-4 w-4 accent-[var(--steel)]"
            />
            Endast nyligen uppdaterade
          </label>
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              checked={state.highlightMissing}
              onChange={() => update({ highlightMissing: !state.highlightMissing })}
              className="h-4 w-4 accent-[var(--steel)]"
            />
            Markera saknade ståndpunkter
          </label>
          <button
            type="button"
            onClick={copyLink}
            className="ml-auto border border-foreground px-3 py-1 text-xs uppercase tracking-wide hover:bg-foreground hover:text-background transition-colors"
          >
            {copied ? "Länk kopierad ✓" : "Kopiera delbar länk"}
          </button>
        </div>
      </fieldset>

      {selectedParties.length === 0 || selectedTopics.length === 0 ? (
        <p className="border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
          Välj minst ett parti och ett ämne för att se jämförelsen.
        </p>
      ) : (
        <div className="space-y-10">
          {selectedTopics.map((topic) => (
            <section key={topic.id} aria-labelledby={`jmf-${topic.id}`}>
              <div className="flex flex-wrap items-end justify-between gap-2 border-t border-border pt-4">
                <h2 id={`jmf-${topic.id}`} className="font-display text-xl">
                  {topic.title}
                </h2>
                <a
                  href={`/amnen/${topic.id}/`}
                  className="border-b border-border pb-0.5 text-xs text-muted-foreground hover:text-foreground"
                >
                  Till ämnessidan med källor
                </a>
              </div>
              <div className="mt-3 overflow-x-auto">
                <table className="w-full min-w-[36rem] border-collapse text-sm">
                  <caption className="sr-only">
                    Dokumenterade ståndpunkter om {topic.title} för valda partier
                  </caption>
                  <thead>
                    <tr>
                      {selectedParties.map((party) => (
                        <th
                          key={party.id}
                          scope="col"
                          className="border border-border bg-muted px-3 py-2 text-left align-top"
                          style={{ width: `${100 / selectedParties.length}%` }}
                        >
                          <span className="flex items-center gap-2 font-medium">
                            <span
                              className="inline-block h-2.5 w-2.5 border border-border"
                              style={{ background: party.color }}
                              aria-hidden="true"
                            />
                            {party.name}
                          </span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {selectedParties.map((party) => {
                        const cell = cellFor(party.id, topic.id);
                        return (
                          <td key={party.id} className="border border-border px-3 py-3 align-top">
                            {cell.kind === "ej_granskad" && (
                              <div
                                className={missingStyle}
                                style={
                                  state.highlightMissing
                                    ? { borderColor: "var(--terracotta)", color: "var(--terracotta)" }
                                    : undefined
                                }
                              >
                                Ännu ej granskat. Säger inget om partiets hållning.
                              </div>
                            )}
                            {cell.kind === "ingen" && (
                              <div
                                className={missingStyle}
                                style={
                                  state.highlightMissing
                                    ? { borderColor: "var(--terracotta)", color: "var(--terracotta)" }
                                    : undefined
                                }
                              >
                                Ingen dokumenterad ståndpunkt hittades i de granskade källorna.
                              </div>
                            )}
                            {cell.kind === "filtrerad" && (
                              <div className="p-1 text-xs text-muted-foreground">
                                Döljs av aktivt filter.
                              </div>
                            )}
                            {cell.kind === "position" && (
                              <div>
                                <span
                                  className="inline-flex items-center gap-1.5 border border-border bg-card px-1.5 py-0.5 text-[10px] leading-tight"
                                  title="Evidensstatus — se metodsidan"
                                >
                                  <span
                                    className="inline-block h-2 w-2"
                                    style={{ background: EVIDENCE_STATUS_TONE[cell.position.evidenceStatus] }}
                                    aria-hidden="true"
                                  />
                                  {EVIDENCE_STATUS_LABELS[cell.position.evidenceStatus]}
                                </span>
                                <p className="mt-2 leading-relaxed">{cell.position.summary}</p>
                                <a
                                  href={`/amnen/${topic.id}/#standpunkt-${cell.position.id}`}
                                  className="mt-2 inline-block border-b border-border pb-0.5 text-xs text-muted-foreground hover:text-foreground"
                                >
                                  Fördjupning och källor
                                </a>
                              </div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          ))}
          <p className="border-t border-border pt-4 text-xs text-muted-foreground">
            Jämförelsen visar dokumentationsläget i de granskade källorna — den utser ingen
            vinnare och rangordnar inte partierna. Att en ståndpunkt saknas betyder inte att
            partiet är emot. Klassningen förklaras på{" "}
            <a href="/metod/" className="border-b border-border pb-px hover:text-foreground">
              metodsidan
            </a>
            .
          </p>
        </div>
      )}
    </div>
  );
}
