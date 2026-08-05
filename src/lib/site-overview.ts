import { getPartyInformationLevel } from "./party-presentation";

type PartyLike = {
  id: string;
  aiSummary?: string | null;
  aiPriorities?: string[];
};

type WorkflowItem = { workflowStatus?: string };

type SiteOverviewInput = {
  parties: PartyLike[];
  proposals: WorkflowItem[];
  actions: WorkflowItem[];
  sources: unknown[];
};

export type SiteOverviewMetrics = {
  partyCount: number;
  documentedOverviewCount: number;
  limitedOverviewCount: number;
  publishedProposalCount: number;
  publishedActionCount: number;
  sourceCount: number;
};

/**
 * Neutral totals for the public dataset. These counts describe the material
 * available on the site, never the quality or ambition of a party's policy.
 */
export function getSiteOverviewMetrics({
  parties,
  proposals,
  actions,
  sources,
}: SiteOverviewInput): SiteOverviewMetrics {
  const documentedOverviewCount = parties.filter(
    (party) => getPartyInformationLevel(party) === "dokumenterad_inriktning",
  ).length;

  return {
    partyCount: parties.length,
    documentedOverviewCount,
    limitedOverviewCount: parties.length - documentedOverviewCount,
    publishedProposalCount: proposals.filter(
      (proposal) => proposal.workflowStatus === "publicerad",
    ).length,
    publishedActionCount: actions.filter(
      (action) => action.workflowStatus === "publicerad",
    ).length,
    sourceCount: sources.length,
  };
}
