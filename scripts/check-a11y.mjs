#!/usr/bin/env node
/**
 * Automatiserad tillgänglighetskontroll (axe-core via Playwright).
 *
 * Serverar dist/ lokalt, kör axe-core (WCAG 2.x A/AA-regler) på ett urval
 * representativa sidor och skriver en rapport till
 * docs/rapporter/tillganglighet.md. Kör `npm run build` först.
 *
 * Kräver en Chromium-binär: antingen via PLAYWRIGHT_BROWSERS_PATH,
 * CHROMIUM_PATH eller en vanlig playwright-installation.
 */
import { createServer } from "node:http";
import { readFileSync, writeFileSync, existsSync, readdirSync, mkdirSync } from "node:fs";
import { join, extname, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = join(ROOT, "dist");
const PAGES = [
  "/",
  "/partier/",
  "/partier/s/",
  "/partier/kd/",
  "/amnen/",
  "/amnen/arbetsmarknad/",
  "/amnen/miljoavtryck/",
  "/jamfor/",
  "/fragor/ai-och-jobben/",
  "/kallor/",
  "/metod/",
  "/korrigeringar/",
  "/ordlista/",
  "/sok/",
];

if (!existsSync(DIST)) {
  console.error("dist/ saknas — kör npm run build först.");
  process.exit(1);
}

function findChromium() {
  if (process.env.CHROMIUM_PATH && existsSync(process.env.CHROMIUM_PATH)) return process.env.CHROMIUM_PATH;
  const roots = [process.env.PLAYWRIGHT_BROWSERS_PATH, "/opt/pw-browsers"].filter(Boolean);
  for (const root of roots) {
    if (!existsSync(root)) continue;
    const direct = join(root, "chromium");
    if (existsSync(direct)) return direct;
    for (const dir of readdirSync(root)) {
      if (!dir.startsWith("chromium")) continue;
      for (const rel of ["chrome-linux/chrome", "chrome-linux/headless_shell", "chrome-headless-shell-linux/headless_shell"]) {
        const p = join(root, dir, rel);
        if (existsSync(p)) return p;
      }
    }
  }
  return null;
}

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".xml": "application/xml",
  ".txt": "text/plain",
  ".woff2": "font/woff2",
};

const server = createServer((req, res) => {
  let path = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
  let file = join(DIST, path);
  if (path.endsWith("/")) file = join(file, "index.html");
  else if (!extname(file) && existsSync(join(file, "index.html"))) file = join(file, "index.html");
  try {
    const body = readFileSync(file);
    res.writeHead(200, { "Content-Type": MIME[extname(file)] ?? "application/octet-stream" });
    res.end(body);
  } catch {
    res.writeHead(404);
    res.end("not found");
  }
});
await new Promise((resolve) => server.listen(0, resolve));
const port = server.address().port;

const executablePath = findChromium();
if (!executablePath) {
  console.error(
    "Ingen Chromium hittades. Sätt CHROMIUM_PATH eller kör 'npx playwright install chromium'.",
  );
  server.close();
  process.exit(1);
}

const axeSource = readFileSync(join(ROOT, "node_modules/axe-core/axe.min.js"), "utf-8");
const browser = await chromium.launch({ executablePath });
const page = await browser.newPage();

const results = [];
for (const path of PAGES) {
  await page.goto(`http://localhost:${port}${path}`, { waitUntil: "networkidle" });
  await page.evaluate(axeSource);
  const axe = await page.evaluate(async () => {
    return await window.axe.run(document, {
      runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"] },
    });
  });
  results.push({ path, violations: axe.violations });
  const serious = axe.violations.filter((v) => ["serious", "critical"].includes(v.impact));
  console.log(
    `${path.padEnd(28)} ${axe.violations.length} avvikelser (${serious.length} allvarliga)`,
  );
}

await browser.close();
server.close();

const today = new Date().toISOString().slice(0, 10);
const totalViolations = results.reduce((n, r) => n + r.violations.length, 0);
const lines = [
  `# Tillgänglighetskontroll (axe-core)`,
  ``,
  `Körd: ${today} · Regeluppsättning: WCAG 2.0/2.1 A+AA, WCAG 2.2 AA samt best practice`,
  ``,
  `Sidor kontrollerade: ${results.length} · Avvikelser totalt: ${totalViolations}`,
  ``,
];
for (const r of results) {
  lines.push(`## ${r.path}`, ``);
  if (!r.violations.length) {
    lines.push(`Inga avvikelser.`, ``);
    continue;
  }
  for (const v of r.violations) {
    lines.push(
      `- **${v.id}** (${v.impact ?? "okänd"}): ${v.description} — ${v.nodes.length} förekomst(er). [Regel](${v.helpUrl})`,
    );
  }
  lines.push(``);
}
mkdirSync(join(ROOT, "docs/rapporter"), { recursive: true });
writeFileSync(join(ROOT, "docs/rapporter/tillganglighet.md"), lines.join("\n"));
console.log(`\nRapport sparad: docs/rapporter/tillganglighet.md`);
const seriousTotal = results
  .flatMap((r) => r.violations)
  .filter((v) => ["serious", "critical"].includes(v.impact)).length;
if (seriousTotal > 0) {
  console.error(`${seriousTotal} allvarliga avvikelser — åtgärda dessa.`);
  process.exit(1);
}
