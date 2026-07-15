export type RoleId =
  | "editorial"
  | "structural-openbim"
  | "sustainability-carbon"
  | "infrastructure-twins"
  | "water-climate";

export interface Role {
  id: RoleId;
  title: string;
  short: string;
  description: string;
  motif: string; // small svg motif id
}

export const roles: Role[] = [
  {
    id: "editorial",
    title: "Editorial Quality & AEC Relevance",
    short: "Editorial filter",
    description:
      "Filters for professional AEC relevance, avoids PR hype and protects editorial quality.",
    motif: "rule",
  },
  {
    id: "structural-openbim",
    title: "Structural Engineering & openBIM",
    short: "Structural / openBIM",
    description:
      "Structural engineering, IFC, openBIM, coordination, interoperability and model-based delivery.",
    motif: "grid",
  },
  {
    id: "sustainability-carbon",
    title: "Sustainability, Carbon & Regulation",
    short: "Sustainability & carbon",
    description:
      "LCA, embodied carbon, climate regulation, EU policy, ESG and environmental reporting.",
    motif: "leaf",
  },
  {
    id: "infrastructure-twins",
    title: "Infrastructure, Transport & Digital Twins",
    short: "Infrastructure & twins",
    description:
      "Infrastructure, transport, GIS, digital twins, asset data and geospatial workflows.",
    motif: "contour",
  },
  {
    id: "water-climate",
    title: "Water, Environment & Climate Adaptation",
    short: "Water & climate",
    description:
      "Water systems, flood risk, environmental modelling, resilience and climate adaptation.",
    motif: "wave",
  },
];

export const rolesById = Object.fromEntries(roles.map((r) => [r.id, r])) as Record<RoleId, Role>;
export const roleByTitle = Object.fromEntries(roles.map((r) => [r.title, r])) as Record<string, Role>;
