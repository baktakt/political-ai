// Package entry point — components and data for the Built Intelligence design system.
// See README.md for Astro setup instructions.

export * from "./components/bi/layout";
export * from "./components/bi/article";
export * from "./components/bi/issue";
export * from "./components/bi/search";
export {
  RoleTag,
  TopicTag,
  FilterChip,
  SourceBadge,
  SourceMeta,
  ExternalSourceLink,
  WhyItMattersBlock,
  RoleMotif,
  RoleCard,
  RoleHeader,
  ROLE_COLOR,
} from "./components/bi/tags";

export * from "./data/mockArticles";
export * from "./data/mockIssues";
export * from "./data/roles";
export * from "./data/topics";

export { cn } from "./lib/utils";
export { formatDate, formatDateShort, hostFromUrl } from "./lib/formatters";
