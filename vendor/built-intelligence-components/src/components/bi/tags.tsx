import { rolesById, type RoleId, type Role, roles } from "@/data/roles";
import type { ReactNode } from "react";

const ROLE_COLOR: Record<RoleId, string> = {
  editorial: "var(--color-ink)",
  "structural-openbim": "var(--color-steel)",
  "sustainability-carbon": "var(--color-moss)",
  "infrastructure-twins": "var(--color-graphite)",
  "water-climate": "var(--color-steel)",
};

export function RoleTag({ id, size = "sm" }: { id: RoleId; size?: "xs" | "sm" }) {
  const role = rolesById[id];
  if (!role) return null;
  const px = size === "xs" ? "px-1.5 py-0.5 text-[10px]" : "px-2 py-0.5 text-[11px]";
  return (
    <span
      className={`inline-flex items-center gap-1.5 ${px} tracking-wide uppercase font-mono border whitespace-nowrap`}
      style={{ borderColor: ROLE_COLOR[id], color: ROLE_COLOR[id] }}
    >
      <RoleMotif id={id} size={8} /> {role.short}
    </span>
  );
}

export function TopicTag({ children, active, onClick }: { children: ReactNode; active?: boolean; onClick?: () => void }) {
  const Comp: any = onClick ? "button" : "span";
  return (
    <Comp
      onClick={onClick}
      className={`inline-flex items-center px-2 py-0.5 text-[11px] tracking-wide border-b transition-colors ${
        active
          ? "border-foreground text-foreground"
          : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
      }`}
    >
      #{children}
    </Comp>
  );
}

export function FilterChip({
  label,
  value,
  onRemove,
}: {
  label: string;
  value: string;
  onRemove: () => void;
}) {
  return (
    <button
      onClick={onRemove}
      className="group inline-flex items-center gap-2 border border-border pl-2 pr-1 py-1 text-xs hover:border-foreground transition-colors"
    >
      <span className="bi-mono !text-[10px]">{label}</span>
      <span className="text-foreground">{value}</span>
      <span className="ml-1 inline-flex h-4 w-4 items-center justify-center text-muted-foreground group-hover:text-foreground">×</span>
    </button>
  );
}

export function SourceBadge({ source }: { source: string }) {
  const initials = source
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
  return (
    <span className="inline-flex items-center gap-2 text-xs text-graphite">
      <span className="inline-flex h-5 w-5 items-center justify-center border border-border bi-mono !text-[9px] !tracking-normal">
        {initials}
      </span>
      <span className="font-medium text-foreground">{source}</span>
    </span>
  );
}

export function SourceMeta({
  source,
  publishedAt,
  contentType,
}: {
  source: string;
  publishedAt: string;
  contentType?: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
      <SourceBadge source={source} />
      <span aria-hidden>·</span>
      <span>{formatMeta(publishedAt)}</span>
      {contentType && (
        <>
          <span aria-hidden>·</span>
          <span className="bi-mono !text-[10px]">{contentType}</span>
        </>
      )}
    </div>
  );
}

function formatMeta(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

export function ExternalSourceLink({ url, label = "Read original source" }: { url: string; label?: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-2 border-b border-foreground pb-0.5 text-sm text-foreground hover:opacity-70"
    >
      {label}
      <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
        <path d="M3 3h6v6M9 3L3 9" fill="none" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    </a>
  );
}

export function WhyItMattersBlock({ children }: { children: ReactNode }) {
  return (
    <aside className="relative border-l-2 border-foreground pl-5 py-1">
      <div className="bi-mono mb-2">Why this matters for AEC</div>
      <p className="text-base leading-relaxed text-foreground">{children}</p>
    </aside>
  );
}

/* Role motif — tiny svg per role */
export function RoleMotif({ id, size = 14 }: { id: RoleId; size?: number }) {
  const stroke = "currentColor";
  const s = size;
  // Explicit style sizing + shrink-0 so the svg keeps its size inside any
  // flex/grid context (attribute-only sizing can stretch on some engines).
  const svgProps = {
    width: s,
    height: s,
    viewBox: "0 0 14 14",
    "aria-hidden": true,
    className: "shrink-0",
    style: { width: s, height: s },
  } as const;
  switch (id) {
    case "editorial":
      return (
        <svg {...svgProps}>
          <line x1="1" y1="4" x2="13" y2="4" stroke={stroke} strokeWidth="1" />
          <line x1="1" y1="7" x2="10" y2="7" stroke={stroke} strokeWidth="1" />
          <line x1="1" y1="10" x2="13" y2="10" stroke={stroke} strokeWidth="1" />
        </svg>
      );
    case "structural-openbim":
      return (
        <svg {...svgProps}>
          <rect x="1" y="1" width="12" height="12" fill="none" stroke={stroke} strokeWidth="1" />
          <line x1="7" y1="1" x2="7" y2="13" stroke={stroke} strokeWidth="0.6" />
          <line x1="1" y1="7" x2="13" y2="7" stroke={stroke} strokeWidth="0.6" />
        </svg>
      );
    case "sustainability-carbon":
      return (
        <svg {...svgProps}>
          <path d="M2 12 C 2 6, 8 2, 12 2 C 12 8, 8 12, 2 12 Z" fill="none" stroke={stroke} strokeWidth="1" />
        </svg>
      );
    case "infrastructure-twins":
      return (
        <svg {...svgProps}>
          <path d="M1 10 C 4 6, 6 12, 9 8 S 13 4, 13 4" fill="none" stroke={stroke} strokeWidth="1" />
          <path d="M1 6 C 4 2, 6 8, 9 4" fill="none" stroke={stroke} strokeWidth="0.6" opacity="0.6" />
        </svg>
      );
    case "water-climate":
      return (
        <svg {...svgProps}>
          <path d="M1 5 Q 3.5 3, 7 5 T 13 5" fill="none" stroke={stroke} strokeWidth="1" />
          <path d="M1 9 Q 3.5 7, 7 9 T 13 9" fill="none" stroke={stroke} strokeWidth="1" />
        </svg>
      );
  }
}

export function RoleCard({
  role,
  articleCount,
  topTopics,
  href = "/examples/role-page",
}: {
  role: Role;
  articleCount: number;
  topTopics: string[];
  /** Link target for the role (e.g. your site's role detail route). */
  href?: string;
}) {
  return (
    <a
      href={href}
      className="group block border border-border p-6 hover:border-foreground transition-colors bg-card"
    >
      <div className="flex items-start justify-between gap-4">
        <div style={{ color: ROLE_COLOR[role.id] }}><RoleMotif id={role.id} size={28} /></div>
        <span className="bi-mono">{articleCount} articles</span>
      </div>
      <h3 className="mt-4 text-xl leading-snug">{role.title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{role.description}</p>
      <div className="mt-4 flex flex-wrap gap-1">
        {topTopics.slice(0, 4).map((t) => (
          <TopicTag key={t}>{t}</TopicTag>
        ))}
      </div>
    </a>
  );
}

export function RoleHeader({ role, count }: { role: Role; count: number }) {
  return (
    <div className="border-t border-b border-border py-10">
      <div className="bi-mono">Professional role</div>
      <div className="mt-3 flex items-start justify-between gap-6 flex-wrap">
        <div className="max-w-2xl">
          <h1 className="text-3xl md:text-4xl leading-tight">{role.title}</h1>
          <p className="mt-3 text-base text-muted-foreground">{role.description}</p>
        </div>
        <div style={{ color: ROLE_COLOR[role.id] }}><RoleMotif id={role.id} size={64} /></div>
      </div>
      <div className="mt-6 bi-mono">{count} selected articles</div>
    </div>
  );
}

export { roles, ROLE_COLOR };
