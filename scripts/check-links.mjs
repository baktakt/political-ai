#!/usr/bin/env node
/**
 * Länkkontroll.
 *
 * 1. Externa källänkar: kontrollerar HTTP-status för varje URL i
 *    src/data/sources.json (HEAD med GET-fallback, webbläsar-User-Agent).
 * 2. Interna länkar: skannar dist/ efter interna href och verifierar att
 *    målsidan finns i byggresultatet (kör `npm run build` först).
 *
 * Skriver en markdownrapport till docs/rapporter/lankkontroll.md.
 * Avslutar med kod 1 endast vid interna brutna länkar (externa kan vara
 * tillfälligt nere och rapporteras i stället).
 */
import { readFileSync, writeFileSync, existsSync, readdirSync, statSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36 (lankkontroll; partierna-om-ai)";
const TIMEOUT_MS = 25_000;
const CONCURRENCY = 5;

async function checkUrl(url) {
  for (const method of ["HEAD", "GET"]) {
    try {
      const res = await fetch(url, {
        method,
        redirect: "follow",
        headers: { "User-Agent": UA, "Accept-Language": "sv,en" },
        signal: AbortSignal.timeout(TIMEOUT_MS),
      });
      if (res.ok) return { ok: true, status: res.status, method };
      if (method === "GET") return { ok: false, status: res.status, method };
      // vissa servrar svarar fel på HEAD — prova GET
    } catch (error) {
      if (method === "GET")
        return { ok: false, status: null, method, error: String(error?.cause ?? error).slice(0, 120) };
    }
  }
  return { ok: false, status: null };
}

async function pool(items, worker, size) {
  const results = new Array(items.length);
  let next = 0;
  await Promise.all(
    Array.from({ length: Math.min(size, items.length) }, async () => {
      while (next < items.length) {
        const i = next++;
        results[i] = await worker(items[i]);
      }
    }),
  );
  return results;
}

function* htmlFiles(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) yield* htmlFiles(full);
    else if (entry.endsWith(".html")) yield full;
  }
}

// --- 1. Externa källänkar ---
const sources = JSON.parse(readFileSync(join(ROOT, "src/data/sources.json"), "utf-8"));
console.log(`Kontrollerar ${sources.length} externa källänkar …`);
const external = await pool(
  sources,
  async (s) => ({ id: s.id, url: s.url, ...(await checkUrl(s.url)) }),
  CONCURRENCY,
);

// --- 2. Interna länkar i dist/ ---
const DIST = join(ROOT, "dist");
const internalBroken = [];
let internalChecked = 0;
if (existsSync(DIST)) {
  const pages = [...htmlFiles(DIST)];
  const hrefRe = /href="(\/[^"#?]*)/g;
  const seen = new Set();
  for (const page of pages) {
    const html = readFileSync(page, "utf-8");
    for (const match of html.matchAll(hrefRe)) {
      const href = match[1];
      if (seen.has(href)) continue;
      seen.add(href);
      internalChecked++;
      if (href.startsWith("/pagefind/")) continue; // genereras efter astro build
      const clean = href.replace(/\/$/, "");
      const candidates = [
        join(DIST, clean, "index.html"),
        join(DIST, clean),
        join(DIST, `${clean}.html`),
      ];
      if (href === "/") continue;
      if (!candidates.some((c) => existsSync(c))) {
        internalBroken.push({ href, exempel: page.replace(DIST, "") });
      }
    }
  }
} else {
  console.warn("dist/ saknas — kör npm run build för intern länkkontroll.");
}

// --- Rapport ---
const failedExternal = external.filter((r) => !r.ok);
const today = new Date().toISOString().slice(0, 10);
const report = [
  `# Länkkontroll`,
  ``,
  `Körd: ${today}`,
  ``,
  `## Externa källänkar`,
  ``,
  `Kontrollerade: ${external.length} · Fungerande: ${external.length - failedExternal.length} · Trasiga/oåtkomliga: ${failedExternal.length}`,
  ``,
  ...(failedExternal.length
    ? [
        `| Käll-id | URL | Status |`,
        `|---|---|---|`,
        ...failedExternal.map((r) => `| ${r.id} | ${r.url} | ${r.status ?? r.error ?? "fel"} |`),
      ]
    : [`Alla externa källänkar svarade OK.`]),
  ``,
  `## Interna länkar (dist/)`,
  ``,
  existsSync(DIST)
    ? `Kontrollerade unika interna länkar: ${internalChecked} · Brutna: ${internalBroken.length}`
    : `Ej körd (dist/ saknas).`,
  ...(internalBroken.length
    ? [``, `| Länk | Förekommer bl.a. i |`, `|---|---|`, ...internalBroken.map((b) => `| ${b.href} | ${b.exempel} |`)]
    : [``, existsSync(DIST) ? `Inga brutna interna länkar.` : ``]),
  ``,
].join("\n");

mkdirSync(join(ROOT, "docs/rapporter"), { recursive: true });
writeFileSync(join(ROOT, "docs/rapporter/lankkontroll.md"), report);
console.log(report);
console.log("Rapport sparad: docs/rapporter/lankkontroll.md");
if (internalBroken.length) process.exit(1);
