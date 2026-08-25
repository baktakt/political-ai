import { describe, expect, it } from "vitest";
import parties from "../src/data/parties.json";
import proposals from "../src/data/proposals.json";
import actions from "../src/data/actions.json";
import sources from "../src/data/sources.json";
import { getSiteOverviewMetrics } from "../src/lib/site-overview";

describe("enkla nyckeltal för startsidan", () => {
  it("sammanfattar bara publikt och neutralt underlag", () => {
    const metrics = getSiteOverviewMetrics({ parties, proposals, actions, sources });

    expect(metrics).toMatchObject({
      partyCount: 8,
      documentedOverviewCount: 8,
      limitedOverviewCount: 0,
      publishedProposalCount: 23,
      publishedActionCount: 27,
    });
    expect(metrics.sourceCount).toBe(sources.length);
  });

  it("räknar källor från den aktuella datamängden", () => {
    const metrics = getSiteOverviewMetrics({
      parties,
      proposals,
      actions,
      sources: [...sources, { id: "ny-kalla" }],
    });

    expect(metrics.sourceCount).toBe(sources.length + 1);
  });

  it("räknar inte arbetsmaterial som publicerade förslag eller aktiviteter", () => {
    const metrics = getSiteOverviewMetrics({ parties, proposals, actions, sources });
    expect(metrics.publishedProposalCount).toBeLessThan(proposals.length);
    expect(metrics.publishedActionCount).toBeLessThan(actions.length);
  });
});
