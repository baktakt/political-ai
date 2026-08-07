export type PartyInformationLevel =
  | "dokumenterad_inriktning"
  | "begransat_underlag";

type PartyLike = {
  id: string;
  aiSummary?: string | null;
  aiPriorities?: string[];
};

type PositionLike = {
  partyId: string;
  workflowStatus: string;
  evidenceStatus: string;
};

export type PartyPresentation = {
  informationLevel: PartyInformationLevel;
  basisLabel: string;
  basisExplanation: string;
  publishedTopicCount: number;
  noDocumentedPositionCount: number;
};

/**
 * A plain-language description of what the public material lets us say.
 * This is deliberately not a score and makes no claim about policy quality.
 */
export function getPartyInformationLevel(party: PartyLike): PartyInformationLevel {
  return party.aiSummary?.trim() && (party.aiPriorities?.length ?? 0) > 0
    ? "dokumenterad_inriktning"
    : "begransat_underlag";
}

export function getPartyPresentation(
  party: PartyLike,
  positions: PositionLike[],
): PartyPresentation {
  const informationLevel = getPartyInformationLevel(party);
  const publishedPositions = positions.filter(
    (position) =>
      position.partyId === party.id && position.workflowStatus === "publicerad",
  );

  if (informationLevel === "dokumenterad_inriktning") {
    return {
      informationLevel,
      basisLabel: "Vi kan beskriva partiets syn på AI",
      basisExplanation:
        "Vi har gått igenom tillräckligt med partimaterial för att ge en rättvis bild av hur partiet ser på AI. I vissa sakfrågor kan det fortfarande saknas svar.",
      publishedTopicCount: publishedPositions.length,
      noDocumentedPositionCount: publishedPositions.filter(
        (position) => position.evidenceStatus === "ingen_dokumenterad",
      ).length,
    };
  }

  return {
    informationLevel,
    basisLabel: "Partiets material",
    basisExplanation:
      "Vi har ännu för lite publicerat partimaterial för att beskriva partiets syn på AI på ett rättvist sätt. Enstaka uppgifter kan ändå finnas och redovisas separat.",
    publishedTopicCount: publishedPositions.length,
    noDocumentedPositionCount: publishedPositions.filter(
      (position) => position.evidenceStatus === "ingen_dokumenterad",
    ).length,
  };
}
