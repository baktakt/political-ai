/**
 * Etiketter och beskrivningar för evidensklassificeringen.
 * Klassningen beskriver hur väl belagd en ståndpunkt är — den är ingen
 * kvalitetsbedömning av politiken och ingen rangordning av partierna.
 */
import type { EvidenceStatus, EvidenceType, SourceType } from "./schema";

export const EVIDENCE_STATUS_LABELS: Record<EvidenceStatus, string> = {
  tydlig_detaljerad: "Partiet är tydligt i frågan",
  generell_dokumenterad: "Partiet har en hållning i frågan",
  konkret_forslag: "Partiet har lagt ett förslag",
  riksdagsaktivitet: "Partiet har agerat i riksdagen",
  regeringsatgard: "Det här har regeringen gjort",
  uttalande_foretradare: "Uttalande från en företrädare",
  indirekt_berord: "Frågan berörs, men utan tydligt besked",
  motstridiga: "Partiet säger olika saker",
  andrad_standpunkt: "Partiet verkar ha bytt linje",
  ingen_dokumenterad: "Vi hittade inget tydligt besked",
};

export const EVIDENCE_STATUS_DESCRIPTIONS: Record<EvidenceStatus, string> = {
  tydlig_detaljerad:
    "Partiet har beskrivit sin syn tydligt i officiellt material.",
  generell_dokumenterad:
    "Partiet har sagt något om frågan i officiellt material, men utan närmare detaljer.",
  konkret_forslag:
    "Partiet har lagt ett förslag, till exempel i en motion, budget eller ett program.",
  riksdagsaktivitet:
    "Det här syns i partiets arbete i riksdagen: motioner, frågor, debatter eller voteringar.",
  regeringsatgard:
    "Det här bygger på regeringsbeslut eller initiativ från regeringen, inte på ett enskilt partis egen politik.",
  uttalande_foretradare:
    "En behörig företrädare har sagt detta, men det finns ännu inte i partiets officiella dokument.",
  indirekt_berord:
    "Partiets material rör frågan, men ger inget tydligt besked i sak.",
  motstridiga:
    "Olika källor från partiet pekar åt olika håll. Båda visas med datum.",
  andrad_standpunkt:
    "Partiet verkar ha ändrat sig över tid. Vi visar både det äldre och det nyare läget.",
  ingen_dokumenterad:
    "Vi hittade inget tydligt besked i de källor vi gick igenom. Det betyder inte att partiet är emot.",
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
