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
      basisLabel: "Övergripande inriktning dokumenterad",
      basisExplanation:
        "Det finns tillräckligt med granskat partimaterial för att beskriva partiets övergripande syn på AI. Alla sakfrågor behöver däremot inte vara besvarade.",
      publishedTopicCount: publishedPositions.length,
      noDocumentedPositionCount: publishedPositions.filter(
        (position) => position.evidenceStatus === "ingen_dokumenterad",
      ).length,
    };
  }

  return {
    informationLevel,
    basisLabel: "Begränsat underlag",
    basisExplanation:
      "Vi har ännu inte tillräckligt med publicerat partimaterial för en rättvisande helhetsbild. Enstaka uppgifter kan finnas och redovisas separat.",
    publishedTopicCount: publishedPositions.length,
    noDocumentedPositionCount: publishedPositions.filter(
      (position) => position.evidenceStatus === "ingen_dokumenterad",
    ).length,
  };
}
