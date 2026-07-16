/**
 * Datamodell för Partierna om AI.
 *
 * Alla datafiler i src/data/ valideras mot dessa scheman både vid bygge
 * (via Astros content collections i src/content.config.ts) och i testerna
 * (tests/data.test.ts). Ändra schemat här — då följer validering med överallt.
 */
import { z } from "zod";

/* ------------------------------------------------------------------ */
/* Grundtyper                                                          */
/* ------------------------------------------------------------------ */

export const PARTY_IDS = ["c", "kd", "l", "m", "mp", "s", "sd", "v"] as const;
export const partyIdSchema = z.enum(PARTY_IDS);
export type PartyId = z.infer<typeof partyIdSchema>;

/** Datum: helår, år-månad eller fullständigt ISO-datum. */
export const flexDateSchema = z
  .string()
  .regex(/^\d{4}(-\d{2})?(-\d{2})?$/, "Datum måste vara YYYY, YYYY-MM eller YYYY-MM-DD");

/** Fullständigt ISO-datum (YYYY-MM-DD). */
export const isoDateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Datum måste vara YYYY-MM-DD");

/* ------------------------------------------------------------------ */
/* Evidensklassificering                                               */
/* ------------------------------------------------------------------ */

/** Evidensstatus: hur väl belagd en ståndpunkt är. Ingen rangordning avses. */
export const EVIDENCE_STATUSES = [
  "tydlig_detaljerad",
  "generell_dokumenterad",
  "konkret_forslag",
  "riksdagsaktivitet",
  "regeringsatgard",
  "uttalande_foretradare",
  "indirekt_berord",
  "motstridiga",
  "andrad_standpunkt",
  "ingen_dokumenterad",
] as const;
export const evidenceStatusSchema = z.enum(EVIDENCE_STATUSES);
export type EvidenceStatus = z.infer<typeof evidenceStatusSchema>;

/** Typ av belägg som ståndpunkten vilar på. */
export const EVIDENCE_TYPES = [
  "partiprogram",
  "valmanifest",
  "motion",
  "votering",
  "regeringspolitik",
  "koalitionsavtal",
  "enskilt_uttalande",
  "intervju",
  "tal",
  "budgetforslag",
  "regelgivning",
] as const;
export const evidenceTypeSchema = z.enum(EVIDENCE_TYPES);
export type EvidenceType = z.infer<typeof evidenceTypeSchema>;

/** Källtyp enligt källhierarkin i metodiken. */
export const SOURCE_TYPES = [
  "partiwebb",
  "partiprogram",
  "valmanifest",
  "motion",
  "riksdagsfraga",
  "riksdagsdebatt",
  "utskottsbetankande",
  "votering",
  "proposition",
  "regeringsbeslut",
  "koalitionsavtal",
  "sou",
  "myndighetsrapport",
  "myndighetswebb",
  "eu-dokument",
  "uttalande",
  "media",
  "expertanalys",
  "ovrigt",
] as const;
export const sourceTypeSchema = z.enum(SOURCE_TYPES);
export type SourceType = z.infer<typeof sourceTypeSchema>;

/** Redaktionellt arbetsflöde. Endast "publicerad" visas på webbplatsen. */
export const WORKFLOW_STATUSES = [
  "upptackt",
  "extraherad",
  "behover_verifiering",
  "verifierad",
  "behover_redaktionell_granskning",
  "godkand",
  "publicerad",
  "foraldrad",
  "arkiverad",
] as const;
export const workflowStatusSchema = z.enum(WORKFLOW_STATUSES);
export type WorkflowStatus = z.infer<typeof workflowStatusSchema>;

/* ------------------------------------------------------------------ */
/* Entiteter                                                           */
/* ------------------------------------------------------------------ */

export const partySchema = z.object({
  id: partyIdSchema,
  name: z.string().min(1),
  abbreviation: z.string().min(1).max(3),
  officialUrl: z.string().url(),
  /** Identifikationsfärg (hex). Används endast som visuell markör. */
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  colorNote: z.string(),
  /** Mandat i riksdagsvalet 2022 (Valmyndigheten). */
  seats2022: z.number().int().positive(),
  /** Nuvarande antal ledamöter med partibeteckning (riksdagen.se). */
  currentSeats: z.number().int().positive(),
  parliamentaryStatus: z.literal("riksdagsparti"),
  governmentStatus: z.enum(["regering", "samarbetsparti", "opposition"]),
  governmentNote: z.string().nullable(),
  /** Neutral faktabeskrivning av partiet (inte AI-ståndpunkter). */
  summary: z.string(),
  /** Sammanfattning av dokumenterad AI-hållning. null = ännu ej granskad. */
  aiSummary: z.string().nullable(),
  aiPriorities: z.array(z.string()),
  sustainabilityPriorities: z.array(z.string()),
  /** Datum då partiets research senast granskades. null = ej granskad. */
  lastReviewedAt: isoDateSchema.nullable(),
  verifiedAt: isoDateSchema,
  verificationSourceIds: z.array(z.string()).min(1),
});
export type Party = z.infer<typeof partySchema>;

export const topicSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string(),
  shortTitle: z.string(),
  description: z.string(),
  whyItMatters: z.string(),
  keyQuestions: z.array(z.string()).min(2),
  group: z.enum(["samhalle", "hallbarhet"]),
  parentTopic: z.string().nullable(),
  displayOrder: z.number().int(),
  /**
   * Redaktionell jämförande analys (var partierna är överens/oense).
   * null = analys ännu ej gjord. Skrivs först när ämnets research granskats.
   */
  analysis: z
    .object({
      agreements: z.array(z.string()),
      disagreements: z.array(z.string()),
      note: z.string().nullable(),
      updatedAt: isoDateSchema.nullable(),
    })
    .nullable()
    .default(null),
});
export type Topic = z.infer<typeof topicSchema>;

export const positionSchema = z
  .object({
    id: z.string().regex(/^[a-z0-9-]+$/),
    partyId: partyIdSchema,
    topicId: z.string(),
    summary: z.string().min(1),
    detailedPosition: z.string(),
    evidenceStatus: evidenceStatusSchema,
    evidenceTypes: z.array(evidenceTypeSchema),
    /** Klartextförklaring av klassningen — aldrig procentsiffror. */
    confidenceExplanation: z.string(),
    sourceIds: z.array(z.string()),
    workflowStatus: workflowStatusSchema,
    lastUpdatedAt: isoDateSchema,
  })
  .refine(
    (p) => p.evidenceStatus === "ingen_dokumenterad" || p.sourceIds.length >= 1,
    {
      message:
        "En ståndpunkt med annan status än 'ingen_dokumenterad' måste ha minst en källa.",
    },
  );
export type Position = z.infer<typeof positionSchema>;

export const PROPOSAL_STATUSES = [
  "framlagt",
  "behandlas",
  "bifallet",
  "avslaget",
  "genomfort",
  "delvis_genomfort",
  "okant",
] as const;

export const proposalSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  partyId: partyIdSchema,
  topicIds: z.array(z.string()).min(1),
  title: z.string(),
  description: z.string(),
  date: flexDateSchema,
  status: z.enum(PROPOSAL_STATUSES),
  implementationStatus: z.string().nullable(),
  sourceIds: z.array(z.string()).min(1),
  workflowStatus: workflowStatusSchema,
});
export type Proposal = z.infer<typeof proposalSchema>;

export const ACTION_TYPES = [
  "motion",
  "skriftlig_fraga",
  "interpellation",
  "debatt",
  "votering",
  "utskottsinitiativ",
] as const;

export const parliamentaryActionSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  partyId: partyIdSchema,
  actionType: z.enum(ACTION_TYPES),
  title: z.string(),
  date: flexDateSchema,
  documentNumber: z.string().nullable(),
  result: z.string().nullable(),
  /** true = partimotion/kommittémotion (partinivå); false = enskild ledamot. */
  partyLevel: z.boolean(),
  topicIds: z.array(z.string()).min(1),
  sourceIds: z.array(z.string()).min(1),
  workflowStatus: workflowStatusSchema,
});
export type ParliamentaryAction = z.infer<typeof parliamentaryActionSchema>;

export const sourceSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string(),
  publisher: z.string(),
  author: z.string().nullable(),
  publicationDate: flexDateSchema.nullable(),
  url: z.string().url(),
  accessedAt: isoDateSchema,
  sourceType: sourceTypeSchema,
  /** Kort ordagrant utdrag (max ~40 ord) — aldrig långa citat. */
  excerpt: z.string().nullable(),
  supportExplanation: z.string(),
  /** Om källan uttrycker officiell partipolitik. */
  officialPolicy: z.boolean(),
  archivedUrl: z.string().url().nullable(),
  isCurrent: z.boolean(),
});
export type Source = z.infer<typeof sourceSchema>;

export const timelineEventSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  partyId: partyIdSchema,
  date: flexDateSchema,
  title: z.string(),
  description: z.string(),
  eventType: z.enum([
    "dokument",
    "motion",
    "uttalande",
    "kongressbeslut",
    "regeringsbeslut",
    "votering",
    "ovrigt",
  ]),
  sourceIds: z.array(z.string()),
});
export type TimelineEvent = z.infer<typeof timelineEventSchema>;

export const researchReviewSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  /** null = granskning som gäller hela datamängden. */
  partyId: partyIdSchema.nullable(),
  reviewer: z.string(),
  reviewDate: isoDateSchema,
  topicsReviewed: z.array(z.string()),
  unresolvedQuestions: z.array(z.string()),
  notes: z.string(),
});
export type ResearchReview = z.infer<typeof researchReviewSchema>;

export const correctionSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  submittedAt: isoDateSchema,
  pageUrl: z.string(),
  description: z.string(),
  status: z.enum(["mottagen", "under_granskning", "atgardad", "avvisad"]),
  resolution: z.string().nullable(),
});
export type Correction = z.infer<typeof correctionSchema>;

export const voterQuestionSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  question: z.string(),
  intro: z.string(),
  topicIds: z.array(z.string()).min(1),
  displayOrder: z.number().int(),
});
export type VoterQuestion = z.infer<typeof voterQuestionSchema>;

export const glossaryEntrySchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  term: z.string(),
  definition: z.string(),
  example: z.string().nullable(),
});
export type GlossaryEntry = z.infer<typeof glossaryEntrySchema>;

/** Utgivartyper som godtas i omvärldsbevakningen — endast verifierade källor. */
export const WATCH_PUBLISHER_TYPES = [
  "forskningsinstitution",
  "internationell_organisation",
  "myndighet",
  "eu_institution",
  "regering",
  "tankesmedja",
] as const;

/**
 * Omvärldsbevakning: internationella rapporter om AI från verifierade
 * utgivare. keyTakeaways är rapportens egna huvudslutsatser i svensk
 * översättning — aldrig webbplatsens egna ställningstaganden.
 */
export const watchReportSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  /** Rapportens originaltitel. */
  title: z.string(),
  publisher: z.string(),
  publisherType: z.enum(WATCH_PUBLISHER_TYPES),
  publicationDate: flexDateSchema,
  url: z.string().url(),
  accessedAt: isoDateSchema,
  /** Rapportens originalspråk (ISO 639-1, t.ex. "en"). */
  language: z.string().min(2).max(5),
  /** Neutral svensk beskrivning av vad rapporten är och täcker. */
  summary: z.string(),
  /** Rapportens egna huvudslutsatser, troget översatta till svenska. */
  keyTakeaways: z.array(z.string()).min(1),
  /** Koppling till webbplatsens ämnestaxonomi. */
  relatedTopicIds: z.array(z.string()),
  workflowStatus: workflowStatusSchema,
  addedAt: isoDateSchema,
});
export type WatchReport = z.infer<typeof watchReportSchema>;

export const updateEntrySchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  date: isoDateSchema,
  title: z.string(),
  description: z.string(),
  type: z.enum(["lansering", "innehall", "metod", "korrigering", "teknik"]),
});
export type UpdateEntry = z.infer<typeof updateEntrySchema>;

export const datasetMetaSchema = z.object({
  id: z.literal("meta"),
  datasetVersion: z.string(),
  lastUpdated: isoDateSchema,
  researchLastUpdated: isoDateSchema,
  pilot: z.boolean(),
  notes: z.string(),
});
export type DatasetMeta = z.infer<typeof datasetMetaSchema>;
