import { useMemo, useState } from "react";
import {
  mockArticles,
  contentTypes,
  sectors,
  regions,
  sources,
  type Article,
} from "@/data/mockArticles";
import { roles, type RoleId } from "@/data/roles";
import { topics } from "@/data/topics";
import { mockIssues } from "@/data/mockIssues";
import { ArticleCard } from "./article";
import { FilterChip } from "./tags";

export function SearchBar({
  value,
  onChange,
  placeholder = "Search AI in AEC, openBIM, LCA, digital twins…",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="relative block">
      <span className="sr-only">Search</span>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        aria-hidden
        className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
      >
        <circle cx="7" cy="7" r="5" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <line x1="11" y1="11" x2="15" y2="15" stroke="currentColor" strokeWidth="1.2" />
      </svg>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-border bg-background pl-11 pr-4 py-3 text-base focus:outline-none focus:border-foreground transition-colors"
      />
    </label>
  );
}

export interface Filters {
  roles: RoleId[];
  topics: string[];
  contentType: string[];
  source: string[];
  sector: string[];
  region: string[];
  issue: string[];
}

export const emptyFilters: Filters = {
  roles: [],
  topics: [],
  contentType: [],
  source: [],
  sector: [],
  region: [],
  issue: [],
};

function toggle<T>(arr: T[], v: T): T[] {
  return arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];
}

export function FilterPanel({
  filters,
  onChange,
}: {
  filters: Filters;
  onChange: (f: Filters) => void;
}) {
  return (
    <aside className="space-y-6">
      <FilterGroup title="Role">
        <div className="space-y-1.5">
          {roles.map((r) => (
            <CheckRow
              key={r.id}
              label={r.short}
              checked={filters.roles.includes(r.id)}
              onChange={() => onChange({ ...filters, roles: toggle(filters.roles, r.id) })}
            />
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Topic">
        <div className="max-h-48 overflow-y-auto pr-1 space-y-1.5">
          {topics.map((t) => (
            <CheckRow
              key={t}
              label={t}
              checked={filters.topics.includes(t)}
              onChange={() => onChange({ ...filters, topics: toggle(filters.topics, t) })}
            />
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Content type">
        <div className="space-y-1.5">
          {contentTypes.map((c) => (
            <CheckRow
              key={c}
              label={c}
              checked={filters.contentType.includes(c)}
              onChange={() => onChange({ ...filters, contentType: toggle(filters.contentType, c) })}
            />
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Source">
        <div className="space-y-1.5">
          {sources.map((s) => (
            <CheckRow
              key={s}
              label={s}
              checked={filters.source.includes(s)}
              onChange={() => onChange({ ...filters, source: toggle(filters.source, s) })}
            />
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Sector">
        <div className="space-y-1.5">
          {sectors.map((s) => (
            <CheckRow
              key={s}
              label={s}
              checked={filters.sector.includes(s)}
              onChange={() => onChange({ ...filters, sector: toggle(filters.sector, s) })}
            />
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Region">
        <div className="space-y-1.5">
          {regions.map((s) => (
            <CheckRow
              key={s}
              label={s}
              checked={filters.region.includes(s)}
              onChange={() => onChange({ ...filters, region: toggle(filters.region, s) })}
            />
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Issue">
        <div className="space-y-1.5">
          {mockIssues.map((i) => (
            <CheckRow
              key={i.id}
              label={`No. ${i.number} · ${i.date}`}
              checked={filters.issue.includes(i.id)}
              onChange={() => onChange({ ...filters, issue: toggle(filters.issue, i.id) })}
            />
          ))}
        </div>
      </FilterGroup>
    </aside>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-border pt-4">
      <div className="bi-mono mb-3">{title}</div>
      {children}
    </div>
  );
}

function CheckRow({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex items-center gap-2.5 text-sm cursor-pointer group">
      <span
        className={`inline-flex h-3.5 w-3.5 items-center justify-center border transition-colors ${
          checked ? "bg-foreground border-foreground" : "border-border group-hover:border-foreground"
        }`}
      >
        {checked && (
          <svg width="8" height="8" viewBox="0 0 8 8">
            <path d="M1 4l2 2 4-4" fill="none" stroke="var(--background)" strokeWidth="1.5" />
          </svg>
        )}
      </span>
      <input type="checkbox" className="sr-only" checked={checked} onChange={onChange} />
      <span className={checked ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"}>
        {label}
      </span>
    </label>
  );
}

export function ActiveFilterChips({
  filters,
  onChange,
}: {
  filters: Filters;
  onChange: (f: Filters) => void;
}) {
  const items: { label: string; value: string; onRemove: () => void }[] = [];
  filters.roles.forEach((r) => {
    const role = roles.find((x) => x.id === r);
    items.push({ label: "Role", value: role?.short ?? r, onRemove: () => onChange({ ...filters, roles: filters.roles.filter((x) => x !== r) }) });
  });
  filters.topics.forEach((t) =>
    items.push({ label: "Topic", value: t, onRemove: () => onChange({ ...filters, topics: filters.topics.filter((x) => x !== t) }) })
  );
  filters.contentType.forEach((t) =>
    items.push({ label: "Type", value: t, onRemove: () => onChange({ ...filters, contentType: filters.contentType.filter((x) => x !== t) }) })
  );
  filters.source.forEach((t) =>
    items.push({ label: "Source", value: t, onRemove: () => onChange({ ...filters, source: filters.source.filter((x) => x !== t) }) })
  );
  filters.sector.forEach((t) =>
    items.push({ label: "Sector", value: t, onRemove: () => onChange({ ...filters, sector: filters.sector.filter((x) => x !== t) }) })
  );
  filters.region.forEach((t) =>
    items.push({ label: "Region", value: t, onRemove: () => onChange({ ...filters, region: filters.region.filter((x) => x !== t) }) })
  );
  filters.issue.forEach((t) =>
    items.push({ label: "Issue", value: t, onRemove: () => onChange({ ...filters, issue: filters.issue.filter((x) => x !== t) }) })
  );
  if (items.length === 0) return null;
  return (
    <div className="flex flex-wrap items-center gap-2">
      {items.map((it, i) => (
        <FilterChip key={i} label={it.label} value={it.value} onRemove={it.onRemove} />
      ))}
      <button
        onClick={() => onChange(emptyFilters)}
        className="bi-mono ml-2 hover:text-foreground"
      >
        Clear all
      </button>
    </div>
  );
}

export function ResultCount({ count }: { count: number }) {
  return <div className="bi-mono">{count} selected {count === 1 ? "article" : "articles"}</div>;
}

export function EmptyState({ title = "No articles match", hint = "Try clearing filters or broadening your search." }: { title?: string; hint?: string }) {
  return (
    <div className="border border-dashed border-border py-16 px-6 text-center">
      <div className="bi-mono mb-3">Empty state</div>
      <h3 className="font-display text-xl">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{hint}</p>
    </div>
  );
}

export function filterArticles(all: Article[], q: string, f: Filters): Article[] {
  const qq = q.trim().toLowerCase();
  return all.filter((a) => {
    if (qq) {
      const hay = `${a.title} ${a.summary} ${a.whyItMatters} ${a.source} ${a.topics.join(" ")}`.toLowerCase();
      if (!hay.includes(qq)) return false;
    }
    if (f.roles.length && !a.roles.some((r) => f.roles.includes(r))) return false;
    if (f.topics.length && !a.topics.some((t) => f.topics.includes(t))) return false;
    if (f.contentType.length && !f.contentType.includes(a.contentType)) return false;
    if (f.source.length && !f.source.includes(a.source)) return false;
    if (f.sector.length && !a.sector.some((s) => f.sector.includes(s))) return false;
    if (f.region.length && !a.region.some((s) => f.region.includes(s))) return false;
    if (f.issue.length && !f.issue.includes(a.issue)) return false;
    return true;
  });
}

export function ArticleResultsList({
  articles,
  view = "cards",
}: {
  articles: Article[];
  view?: "cards" | "rows";
}) {
  if (articles.length === 0) return <EmptyState />;
  if (view === "rows") {
    return (
      <div>
        {articles.map((a) => (
          <ArticleCard key={a.id} article={a} variant="row" />
        ))}
      </div>
    );
  }
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {articles.map((a) => (
        <ArticleCard key={a.id} article={a} variant="standard" />
      ))}
    </div>
  );
}

/* Full self-contained demo — used on the components page */
export function ArchiveDemo() {
  const [q, setQ] = useState("");
  const [f, setF] = useState<Filters>(emptyFilters);
  const [view, setView] = useState<"cards" | "rows">("cards");
  const results = useMemo(() => filterArticles(mockArticles, q, f), [q, f]);
  return (
    <div className="grid gap-8 md:grid-cols-12">
      <div className="md:col-span-4 md:sticky md:top-24 md:self-start">
        <FilterPanel filters={f} onChange={setF} />
      </div>
      <div className="md:col-span-8 space-y-6">
        <SearchBar value={q} onChange={setQ} />
        <div className="flex items-center justify-between">
          <ResultCount count={results.length} />
          <div className="flex items-center gap-1 border border-border">
            {(["cards", "rows"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-3 py-1.5 text-xs uppercase tracking-wider ${
                  view === v ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
        <ActiveFilterChips filters={f} onChange={setF} />
        <ArticleResultsList articles={results} view={view} />
      </div>
    </div>
  );
}
