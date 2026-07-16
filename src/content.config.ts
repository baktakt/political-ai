/**
 * Astro content collections — den strukturerade datamodellen.
 *
 * Varje samling läses från en JSON-fil i src/data/ och valideras mot
 * zod-schemana i src/lib/schema.ts vid varje bygge. Ett schemafel stoppar
 * bygget — ingen ovaliderad data når webbplatsen.
 */
import { defineCollection } from "astro:content";
import { file } from "astro/loaders";
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
} from "./lib/schema";

export const collections = {
  parties: defineCollection({
    loader: file("src/data/parties.json"),
    schema: partySchema,
  }),
  topics: defineCollection({
    loader: file("src/data/topics.json"),
    schema: topicSchema,
  }),
  positions: defineCollection({
    loader: file("src/data/positions.json"),
    schema: positionSchema,
  }),
  proposals: defineCollection({
    loader: file("src/data/proposals.json"),
    schema: proposalSchema,
  }),
  actions: defineCollection({
    loader: file("src/data/actions.json"),
    schema: parliamentaryActionSchema,
  }),
  sources: defineCollection({
    loader: file("src/data/sources.json"),
    schema: sourceSchema,
  }),
  timeline: defineCollection({
    loader: file("src/data/timeline.json"),
    schema: timelineEventSchema,
  }),
  reviews: defineCollection({
    loader: file("src/data/reviews.json"),
    schema: researchReviewSchema,
  }),
  corrections: defineCollection({
    loader: file("src/data/corrections.json"),
    schema: correctionSchema,
  }),
  questions: defineCollection({
    loader: file("src/data/questions.json"),
    schema: voterQuestionSchema,
  }),
  glossary: defineCollection({
    loader: file("src/data/glossary.json"),
    schema: glossaryEntrySchema,
  }),
  updates: defineCollection({
    loader: file("src/data/updates.json"),
    schema: updateEntrySchema,
  }),
  meta: defineCollection({
    loader: file("src/data/meta.json"),
    schema: datasetMetaSchema,
  }),
  omvarldsbevakning: defineCollection({
    loader: file("src/data/omvarldsbevakning.json"),
    schema: watchReportSchema,
  }),
};
