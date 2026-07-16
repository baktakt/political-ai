/**
 * Etiketter och beskrivningar för evidensklassificeringen.
 * Klassningen beskriver hur väl belagd en ståndpunkt är — den är ingen
 * kvalitetsbedömning av politiken och ingen rangordning av partierna.
 */
import type { EvidenceStatus, EvidenceType, SourceType } from "./schema";

export const EVIDENCE_STATUS_LABELS: Record<EvidenceStatus, string> = {
  tydlig_detaljerad: "Tydlig och detaljerad ståndpunkt",
  generell_dokumenterad: "Generell dokumenterad ståndpunkt",
  konkret_forslag: "Konkret förslag",
  riksdagsaktivitet: "Riksdagsaktivitet",
  regeringsatgard: "Regeringsåtgärd",
  uttalande_foretradare: "Uttalande av företrädare",
  indirekt_berord: "Indirekt berörd",
  motstridiga: "Motstridiga ståndpunkter",
  andrad_standpunkt: "Ståndpunkten förefaller ha ändrats",
  ingen_dokumenterad: "Ingen dokumenterad ståndpunkt hittades",
};

export const EVIDENCE_STATUS_DESCRIPTIONS: Record<EvidenceStatus, string> = {
  tydlig_detaljerad:
    "Partiet har en utförlig, dokumenterad ståndpunkt i officiellt material.",
  generell_dokumenterad:
    "Partiet har uttryckt en övergripande hållning i officiellt material, men utan detaljer.",
  konkret_forslag:
    "Partiet har lagt ett konkret förslag, till exempel i motion, budget eller program.",
  riksdagsaktivitet:
    "Belagt genom partiets agerande i riksdagen: motioner, frågor, debatter eller voteringar.",
  regeringsatgard:
    "Belagt genom regeringsbeslut eller regeringsinitiativ. Skiljs från partiets egen politik.",
  uttalande_foretradare:
    "Belagt genom uttalande av behörig företrädare, men inte (ännu) i partiets officiella dokument.",
  indirekt_berord:
    "Frågan berörs indirekt i partiets material, utan uttalad ståndpunkt i sakfrågan.",
  motstridiga:
    "Olika källor från partiet pekar åt olika håll. Båda redovisas med datum.",
  andrad_standpunkt:
    "Partiets ståndpunkt förefaller ha ändrats över tid. Både äldre och nyare läge redovisas.",
  ingen_dokumenterad:
    "Ingen dokumenterad ståndpunkt hittades i de granskade källorna. Detta ska inte tolkas som att partiet är emot.",
};

export const EVIDENCE_TYPE_LABELS: Record<EvidenceType, string> = {
  partiprogram: "Partiprogram/partipolicy",
  valmanifest: "Valmanifest",
  motion: "Motion",
  votering: "Votering",
  regeringspolitik: "Regeringspolitik",
  koalitionsavtal: "Koalitionsavtal",
  enskilt_uttalande: "Enskilt uttalande",
  intervju: "Intervju",
  tal: "Tal",
  budgetforslag: "Budgetförslag",
  regelgivning: "Regelgivning",
};

export const SOURCE_TYPE_LABELS: Record<SourceType, string> = {
  partiwebb: "Partiets webbplats",
  partiprogram: "Partiprogram",
  valmanifest: "Valmanifest",
  motion: "Riksdagsmotion",
  riksdagsfraga: "Riksdagsfråga",
  riksdagsdebatt: "Riksdagsdebatt",
  utskottsbetankande: "Utskottsbetänkande",
  votering: "Votering",
  proposition: "Proposition",
  regeringsbeslut: "Regeringsbeslut/-dokument",
  koalitionsavtal: "Koalitionsavtal",
  sou: "Statlig utredning (SOU)",
  myndighetsrapport: "Myndighetsrapport",
  myndighetswebb: "Myndighetswebbplats",
  "eu-dokument": "EU-dokument",
  uttalande: "Uttalande",
  media: "Etablerad media",
  expertanalys: "Expertanalys",
  ovrigt: "Övrigt",
};

export const PROPOSAL_STATUS_LABELS: Record<string, string> = {
  framlagt: "Framlagt",
  behandlas: "Behandlas",
  bifallet: "Bifallet",
  avslaget: "Avslaget",
  genomfort: "Genomfört",
  delvis_genomfort: "Delvis genomfört",
  okant: "Status okänd",
};

export const ACTION_TYPE_LABELS: Record<string, string> = {
  motion: "Motion",
  skriftlig_fraga: "Skriftlig fråga",
  interpellation: "Interpellation",
  debatt: "Debatt",
  votering: "Votering",
  utskottsinitiativ: "Utskottsinitiativ",
};

export const GOVERNMENT_STATUS_LABELS: Record<string, string> = {
  regering: "Regeringsparti",
  samarbetsparti: "Samarbetsparti",
  opposition: "Opposition",
};

export const WATCH_PUBLISHER_TYPE_LABELS: Record<string, string> = {
  forskningsinstitution: "Forskningsinstitution",
  internationell_organisation: "Internationell organisation",
  myndighet: "Myndighet",
  eu_institution: "EU-institution",
  regering: "Regering",
  tankesmedja: "Tankesmedja",
};

export const TIMELINE_EVENT_LABELS: Record<string, string> = {
  dokument: "Dokument",
  motion: "Motion",
  uttalande: "Uttalande",
  kongressbeslut: "Kongressbeslut",
  regeringsbeslut: "Regeringsbeslut",
  votering: "Votering",
  ovrigt: "Övrigt",
};

/**
 * Ton (färgtoken) per evidensstatus. Färgen används aldrig ensam som
 * betydelsebärare — varje status har också egen ikonform och textetikett.
 */
export const EVIDENCE_STATUS_TONE: Record<EvidenceStatus, string> = {
  tydlig_detaljerad: "var(--steel)",
  generell_dokumenterad: "var(--steel)",
  konkret_forslag: "var(--moss)",
  riksdagsaktivitet: "var(--ink)",
  regeringsatgard: "var(--ink)",
  uttalande_foretradare: "var(--graphite)",
  indirekt_berord: "var(--graphite)",
  motstridiga: "var(--terracotta)",
  andrad_standpunkt: "var(--terracotta)",
  ingen_dokumenterad: "var(--graphite)",
};
