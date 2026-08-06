import { describe, expect, it } from "vitest";
import parties from "../src/data/parties.json";
import positions from "../src/data/positions.json";
import {
  getPartyInformationLevel,
  getPartyPresentation,
} from "../src/lib/party-presentation";

describe("väljarnära presentation av partiernas AI-underlag", () => {
  it("skiljer dokumenterad övergripande inriktning från begränsat underlag", () => {
    const levels = Object.fromEntries(
      parties.map((party) => [party.id, getPartyInformationLevel(party)]),
    );

    expect(levels).toEqual({
      c: "dokumenterad_inriktning",
      kd: "begransat_underlag",
      l: "begransat_underlag",
      mp: "dokumenterad_inriktning",
      m: "dokumenterad_inriktning",
      s: "dokumenterad_inriktning",
      sd: "begransat_underlag",
      v: "dokumenterad_inriktning",
    });
  });

  it("beskriver underlaget utan poäng, procentsats eller kvalitetsomdöme", () => {
    for (const party of parties) {
      const presentation = getPartyPresentation(party, positions);
      expect(presentation.basisLabel.length).toBeGreaterThan(0);
      expect(presentation.basisExplanation.length).toBeGreaterThan(0);
      expect(presentation.basisExplanation).not.toMatch(/\d+\s*%|poäng|bäst|sämst/i);
    }
  });

  it("räknar bara publicerade ämnesgranskningar i den publika fördjupningen", () => {
    const socialdemokraterna = parties.find((party) => party.id === "s")!;
    const centerpartiet = parties.find((party) => party.id === "c")!;

    expect(getPartyPresentation(socialdemokraterna, positions).publishedTopicCount).toBe(19);
    expect(getPartyPresentation(centerpartiet, positions).publishedTopicCount).toBe(19);
  });
});
