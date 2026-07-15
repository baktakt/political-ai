export const topics = [
  "AI workflows",
  "openBIM",
  "IFC",
  "coordination",
  "digital twins",
  "GIS",
  "LCA",
  "embodied carbon",
  "infrastructure",
  "transport",
  "bridges",
  "asset management",
  "water",
  "flood risk",
  "stormwater",
  "climate adaptation",
  "regulation",
  "reporting",
  "standards",
  "AI tools",
  "construction software",
  "editorial filter",
  "specifications",
  "document review",
  "infrastructure planning",
  "scenario modelling",
  "municipalities",
  "dashboards",
  "early design",
  "AI estimation",
  "modelling",
] as const;

export type Topic = (typeof topics)[number];

export const topicClusters: { title: string; topics: Topic[] }[] = [
  {
    title: "Model & standards",
    topics: ["openBIM", "IFC", "coordination", "standards", "specifications"],
  },
  {
    title: "Carbon & regulation",
    topics: ["LCA", "embodied carbon", "regulation", "reporting", "early design"],
  },
  {
    title: "Infrastructure & twins",
    topics: ["digital twins", "GIS", "infrastructure", "transport", "bridges", "asset management"],
  },
  {
    title: "Water & climate",
    topics: ["water", "flood risk", "stormwater", "climate adaptation", "modelling"],
  },
  {
    title: "AI in practice",
    topics: ["AI workflows", "AI tools", "AI estimation", "document review", "editorial filter"],
  },
];
