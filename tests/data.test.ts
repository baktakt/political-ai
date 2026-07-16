/**
 * Datavalideringstester.
 *
 * Säkerställer att den strukturerade datamängden är schemakorrekt och
 * internt konsistent: alla referenser (parti, ämne, källa) måste peka på
 * existerande poster, och evidensreglerna från metodiken upprätthålls.
 */
import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import {
  partySchema,
  topicSchema,
  positionSchema,
  proposalSchema,
  parliamentaryActionSchema,
  sourceSchema,
  timelineEventSchema,
  researchReviewSchema,
  correctionSchema,
  voterQuestionSchema,
  glossaryEntrySchema,
  updateEntrySchema,
  datasetMetaSchema,
  watchReportSchema,
  PARTY_IDS,
} from "../src/lib/schema";

const DATA = join(__dirname, "..", "src", "data");
const load = (name: string) =>
  JSON.parse(readFileSync(join(DATA, `${name}.json`), "utf-8"));

const parties = load("parties");
const topics = load("topics");
const positions = load("positions");
const proposals = load("proposals");
const actions = load("actions");
const sources = load("sources");
const timeline = load("timeline");
const reviews = load("reviews");
const corrections = load("corrections");
const questions = load("questions");
const glossary = load("glossary");
const updates = load("updates");
const meta = load("meta");
const watchReports = load("omvarldsbevakning");

const partyIds = new Set(parties.map((p: any) => p.id));
const topicIds = new Set(topics.map((t: any) => t.id));
const sourceIds = new Set(sources.map((s: any) => s.id));

function validateAll(name: string, items: any[], schema: { parse: (x: unknown) => unknown }) {
  for (const item of items) {
    try {
      schema.parse(item);
    } catch (error) {
      throw new Error(`${name}/${item?.id ?? "?"}: ${error}`);
    }
  }
}

describe("schemavalidering", () => {
  it("parties.json följer schemat", () => validateAll("parties", parties, partySchema));
  it("topics.json följer schemat", () => validateAll("topics", topics, topicSchema));
  it("positions.json följer schemat", () => validateAll("positions", positions, positionSchema));
  it("proposals.json följer schemat", () => validateAll("proposals", proposals, proposalSchema));
  it("actions.json följer schemat", () => validateAll("actions", actions, parliamentaryActionSchema));
  it("sources.json följer schemat", () => validateAll("sources", sources, sourceSchema));
  it("timeline.json följer schemat", () => validateAll("timeline", timeline, timelineEventSchema));
  it("reviews.json följer schemat", () => validateAll("reviews", reviews, researchReviewSchema));
  it("corrections.json följer schemat", () => validateAll("corrections", corrections, correctionSchema));
  it("questions.json följer schemat", () => validateAll("questions", questions, voterQuestionSchema));
  it("glossary.json följer schemat", () => validateAll("glossary", glossary, glossaryEntrySchema));
  it("updates.json följer schemat", () => validateAll("updates", updates, updateEntrySchema));
  it("meta.json följer schemat", () => validateAll("meta", meta, datasetMetaSchema));
  it("omvarldsbevakning.json följer schemat", () =>
    validateAll("omvarldsbevakning", watchReports, watchReportSchema));
});

describe("partilistan", () => {
  it("innehåller exakt de åtta verifierade riksdagspartierna", () => {
    expect([...partyIds].sort()).toEqual([...PARTY_IDS].sort());
  });
  it("alla partier har verifieringskällor som existerar", () => {
    for (const p of parties) {
      for (const sid of p.verificationSourceIds) {
        expect(sourceIds.has(sid), `${p.id}: verifieringskälla ${sid} saknas`).toBe(true);
      }
    }
  });
});

describe("taxonomin", () => {
  it("innehåller 19 ämnen med unik displayOrder 1–19", () => {
    expect(topics).toHaveLength(19);
    const orders = topics.map((t: any) => t.displayOrder).sort((a: number, b: number) => a - b);
    expect(orders).toEqual(Array.from({ length: 19 }, (_, i) => i + 1));
  });
  it("har fem hållbarhetsämnen (hållbarhet är ett huvudspår)", () => {
    expect(topics.filter((t: any) => t.group === "hallbarhet")).toHaveLength(5);
  });
});

describe("referensintegritet", () => {
  it("unika id:n i varje samling", () => {
    for (const [name, items] of Object.entries({ parties, topics, positions, proposals, actions, sources, timeline, questions, glossary, updates, watchReports })) {
      const ids = (items as any[]).map((x) => x.id);
      expect(new Set(ids).size, `dubblett-id i ${name}`).toBe(ids.length);
    }
  });
  it("högst en ståndpunkt per parti och ämne", () => {
    const keys = positions.map((p: any) => `${p.partyId}:${p.topicId}`);
    expect(new Set(keys).size).toBe(keys.length);
  });
  it("alla ståndpunkter refererar existerande parti, ämne och källor", () => {
    for (const p of positions) {
      expect(partyIds.has(p.partyId), `${p.id}: okänt parti`).toBe(true);
      expect(topicIds.has(p.topicId), `${p.id}: okänt ämne`).toBe(true);
      for (const sid of p.sourceIds) {
        expect(sourceIds.has(sid), `${p.id}: källa ${sid} saknas`).toBe(true);
      }
    }
  });
  it("alla förslag och riksdagsaktiviteter refererar existerande entiteter", () => {
    for (const collection of [proposals, actions]) {
      for (const x of collection) {
        expect(partyIds.has(x.partyId), `${x.id}: okänt parti`).toBe(true);
        for (const tid of x.topicIds) expect(topicIds.has(tid), `${x.id}: okänt ämne ${tid}`).toBe(true);
        for (const sid of x.sourceIds) expect(sourceIds.has(sid), `${x.id}: källa ${sid} saknas`).toBe(true);
      }
    }
  });
  it("tidslinjer och frågor refererar existerande entiteter", () => {
    for (const e of timeline) {
      expect(partyIds.has(e.partyId), `${e.id}: okänt parti`).toBe(true);
      for (const sid of e.sourceIds) expect(sourceIds.has(sid), `${e.id}: källa ${sid} saknas`).toBe(true);
    }
    for (const q of questions) {
      for (const tid of q.topicIds) expect(topicIds.has(tid), `${q.id}: okänt ämne ${tid}`).toBe(true);
    }
  });
  it("omvärldsbevakningen refererar existerande ämnen och har unika URL:er", () => {
    for (const r of watchReports) {
      for (const tid of r.relatedTopicIds) {
        expect(topicIds.has(tid), `${r.id}: okänt ämne ${tid}`).toBe(true);
      }
    }
    const urls = watchReports.map((r: any) => r.url);
    expect(new Set(urls).size, "samma rapport-URL förekommer flera gånger").toBe(urls.length);
  });
});

describe("metodikens evidensregler", () => {
  it("ståndpunkter med belägg har minst en källa; utan belägg kräver förklaring", () => {
    for (const p of positions) {
      if (p.evidenceStatus !== "ingen_dokumenterad") {
        expect(p.sourceIds.length, `${p.id}: saknar källa`).toBeGreaterThanOrEqual(1);
      } else {
        expect(
          p.confidenceExplanation.length,
          `${p.id}: 'ingen_dokumenterad' måste dokumentera var man sökt`,
        ).toBeGreaterThan(20);
      }
    }
  });
  it("endast publicerade poster saknar granskningsblockerande status", () => {
    for (const collection of [positions, proposals, actions]) {
      for (const x of collection) {
        expect(
          ["publicerad", "godkand", "verifierad", "behover_redaktionell_granskning", "behover_verifiering", "extraherad", "upptackt", "foraldrad", "arkiverad"],
        ).toContain(x.workflowStatus);
      }
    }
  });
  it("källutdrag är korta (≤ 60 ord — inga långa citat)", () => {
    for (const s of sources) {
      if (s.excerpt) {
        const words = s.excerpt.split(/\s+/).length;
        expect(words, `${s.id}: utdraget är ${words} ord`).toBeLessThanOrEqual(60);
      }
    }
  });
  it("inga dubblerade käll-URL:er", () => {
    const urls = sources.map((s: any) => s.url);
    expect(new Set(urls).size, "samma URL förekommer under flera käll-id").toBe(urls.length);
  });
  it("varje källa förklarar vad den stödjer", () => {
    for (const s of sources) {
      expect(s.supportExplanation.length, `${s.id}: supportExplanation saknas`).toBeGreaterThan(10);
    }
  });
});
