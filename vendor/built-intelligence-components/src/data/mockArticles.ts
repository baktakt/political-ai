import type { RoleId } from "./roles";
import type { Topic } from "./topics";

export type ContentType =
  | "Standard / News"
  | "Policy"
  | "Case Study"
  | "Research"
  | "Research / Case Study"
  | "Product / Workflow";

export interface Article {
  id: string;
  title: string;
  source: string;
  url: string;
  publishedAt: string; // ISO date
  curatedAt: string;
  summary: string;
  whyItMatters: string;
  roles: RoleId[];
  topics: Topic[];
  contentType: ContentType;
  sector: string[];
  region: string[];
  issue: string; // issue date id
}

export const mockArticles: Article[] = [
  {
    id: "openbim-ai-model-checking",
    title: "New openBIM guidance explores AI-assisted model checking",
    source: "buildingSMART International",
    url: "https://example.com/openbim-guidance",
    publishedAt: "2026-07-10",
    curatedAt: "2026-07-14",
    summary:
      "A new guidance note explores where AI can support model checking, information quality and coordination workflows without replacing open standards.",
    whyItMatters:
      "AEC teams are experimenting with AI-assisted QA, but interoperability and IFC-based workflows remain essential for trust and long-term asset data.",
    roles: ["structural-openbim", "editorial"],
    topics: ["openBIM", "IFC", "coordination", "AI workflows"],
    contentType: "Standard / News",
    sector: ["Buildings", "Infrastructure"],
    region: ["Global"],
    issue: "2026-07-19",
  },
  {
    id: "eu-carbon-reporting-lca",
    title: "European carbon reporting rules increase pressure on project-level LCA data",
    source: "European Commission",
    url: "https://example.com/eu-carbon-reporting",
    publishedAt: "2026-07-08",
    curatedAt: "2026-07-13",
    summary:
      "Updated reporting requirements push design and construction teams to produce more granular embodied carbon data at project level.",
    whyItMatters:
      "Consultants and contractors will need defensible LCA workflows earlier in design; specification and material data pipelines become critical.",
    roles: ["sustainability-carbon"],
    topics: ["LCA", "embodied carbon", "regulation", "reporting"],
    contentType: "Policy",
    sector: ["Buildings", "Infrastructure"],
    region: ["EU"],
    issue: "2026-07-19",
  },
  {
    id: "bridge-digital-twin-pilot",
    title: "Transport agency pilots digital twin for predictive bridge maintenance",
    source: "National Transport Authority",
    url: "https://example.com/bridge-twin",
    publishedAt: "2026-07-05",
    curatedAt: "2026-07-12",
    summary:
      "A national transport agency reports early results from a digital twin used to prioritise inspection and maintenance on ageing bridge stock.",
    whyItMatters:
      "Digital twins for infrastructure only work when asset data, sensor feeds and inspection workflows are aligned. This pilot highlights the data prerequisites.",
    roles: ["infrastructure-twins"],
    topics: ["infrastructure", "bridges", "digital twins", "asset management"],
    contentType: "Case Study",
    sector: ["Infrastructure", "Transport"],
    region: ["Europe"],
    issue: "2026-07-19",
  },
  {
    id: "ai-flood-modelling-municipalities",
    title: "AI-assisted flood modelling helps municipalities test climate adaptation scenarios",
    source: "Water Research Institute",
    url: "https://example.com/flood-modelling",
    publishedAt: "2026-07-02",
    curatedAt: "2026-07-11",
    summary:
      "Researchers show how AI-accelerated hydraulic models let planners test more climate adaptation scenarios in the same time budget.",
    whyItMatters:
      "For water and resilience teams, speed unlocks scenario coverage. But calibration against physical models and local data remains essential.",
    roles: ["water-climate"],
    topics: ["flood risk", "water", "climate adaptation", "modelling"],
    contentType: "Research / Case Study",
    sector: ["Water", "Municipal"],
    region: ["Global"],
    issue: "2026-07-19",
  },
  {
    id: "vendor-ai-feature-unclear",
    title: "Construction software vendor announces AI feature, but practical AEC value remains unclear",
    source: "Industry Publication",
    url: "https://example.com/vendor-ai",
    publishedAt: "2026-07-01",
    curatedAt: "2026-07-10",
    summary:
      "A major construction software vendor unveiled an AI assistant. Demos are polished; independent evidence of workflow value is limited.",
    whyItMatters:
      "AEC teams should look past demo videos: check integration with existing coordination and information workflows before adopting.",
    roles: ["editorial"],
    topics: ["AI tools", "construction software", "editorial filter"],
    contentType: "Product / Workflow",
    sector: ["Construction"],
    region: ["Global"],
    issue: "2026-07-12",
  },
  {
    id: "specification-review-llm",
    title: "Engineering consultancy uses language models to accelerate specification review",
    source: "AEC Industry Report",
    url: "https://example.com/spec-review",
    publishedAt: "2026-06-28",
    curatedAt: "2026-07-10",
    summary:
      "An engineering consultancy reports faster specification review cycles by using language models to surface inconsistencies for human reviewers.",
    whyItMatters:
      "Document-heavy AEC workflows are a realistic target for LLMs when humans stay in the loop and audit trails are preserved.",
    roles: ["editorial"],
    topics: ["specifications", "document review", "AI workflows"],
    contentType: "Case Study",
    sector: ["Buildings"],
    region: ["UK"],
    issue: "2026-07-12",
  },
  {
    id: "gis-scenario-assistant",
    title: "GIS-based infrastructure planning platform adds scenario modelling assistant",
    source: "Geospatial World",
    url: "https://example.com/gis-scenarios",
    publishedAt: "2026-06-26",
    curatedAt: "2026-07-10",
    summary:
      "A geospatial planning platform now bundles a scenario modelling assistant aimed at infrastructure and land-use planners.",
    whyItMatters:
      "Scenario planning benefits from faster iteration, but underlying GIS data quality and assumptions still drive credibility.",
    roles: ["infrastructure-twins"],
    topics: ["GIS", "infrastructure planning", "scenario modelling"],
    contentType: "Product / Workflow",
    sector: ["Infrastructure"],
    region: ["Global"],
    issue: "2026-07-12",
  },
  {
    id: "nordic-stormwater-dashboards",
    title: "Nordic municipalities test climate adaptation dashboards for stormwater planning",
    source: "Public Sector Climate Lab",
    url: "https://example.com/stormwater",
    publishedAt: "2026-06-24",
    curatedAt: "2026-07-10",
    summary:
      "A group of Nordic municipalities piloted shared dashboards to coordinate stormwater and climate adaptation planning across departments.",
    whyItMatters:
      "Cross-department dashboards succeed or fail on data governance, not visuals. The pilot documents both wins and structural friction.",
    roles: ["water-climate"],
    topics: ["stormwater", "municipalities", "climate adaptation", "dashboards"],
    contentType: "Case Study",
    sector: ["Water", "Municipal"],
    region: ["Nordics"],
    issue: "2026-07-12",
  },
  {
    id: "embodied-carbon-ai-benchmark",
    title: "Researchers benchmark AI methods for embodied carbon estimation from early design data",
    source: "Journal of Cleaner Construction",
    url: "https://example.com/embodied-benchmark",
    publishedAt: "2026-06-20",
    curatedAt: "2026-07-10",
    summary:
      "A peer-reviewed benchmark compares AI methods for estimating embodied carbon from early design information across a shared dataset.",
    whyItMatters:
      "Reliable early-stage carbon estimates would change design decisions. The benchmark shows both progress and remaining uncertainty.",
    roles: ["sustainability-carbon"],
    topics: ["embodied carbon", "early design", "LCA", "AI estimation"],
    contentType: "Research",
    sector: ["Buildings"],
    region: ["Global"],
    issue: "2026-07-12",
  },
];

export const contentTypes: ContentType[] = [
  "Standard / News",
  "Policy",
  "Case Study",
  "Research",
  "Research / Case Study",
  "Product / Workflow",
];

export const sectors = ["Buildings", "Infrastructure", "Transport", "Water", "Municipal", "Construction"];
export const regions = ["Global", "EU", "Europe", "UK", "Nordics"];
export const sources = Array.from(new Set(mockArticles.map((a) => a.source))).sort();
