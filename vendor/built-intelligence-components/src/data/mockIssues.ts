import { mockArticles } from "./mockArticles";

export interface Issue {
  id: string; // date
  number: number;
  title: string;
  date: string;
  editorsNote: string;
  themes: string[];
  articleIds: string[];
}

export const mockIssues: Issue[] = [
  {
    id: "2026-07-19",
    number: 42,
    title: "openBIM, carbon rules and a bridge that watches itself",
    date: "2026-07-19",
    editorsNote:
      "This week: guidance on AI-assisted model checking without breaking open standards, tighter EU carbon reporting pressure on LCA data, and early results from a predictive bridge maintenance twin. Plus AI-accelerated flood modelling for municipal climate adaptation.",
    themes: ["openBIM", "Embodied carbon", "Digital twins", "Climate adaptation"],
    articleIds: mockArticles.filter((a) => a.issue === "2026-07-19").map((a) => a.id),
  },
  {
    id: "2026-07-12",
    number: 41,
    title: "Vendor demos, spec review and scenario planning",
    date: "2026-07-12",
    editorsNote:
      "This week: a widely-hyped vendor AI feature that deserves editorial scrutiny, a consultancy accelerating specification review with humans in the loop, GIS scenario planning updates, Nordic stormwater dashboards and a peer-reviewed benchmark on AI for embodied carbon.",
    themes: ["Editorial filter", "AI workflows", "GIS", "Stormwater", "LCA"],
    articleIds: mockArticles.filter((a) => a.issue === "2026-07-12").map((a) => a.id),
  },
];

export const latestIssue = mockIssues[0];
