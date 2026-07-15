import type { ReactNode } from "react";

export function Mono({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`bi-mono ${className}`}>{children}</span>;
}

export function Hairline({ className = "" }: { className?: string }) {
  return <hr className={`border-0 border-t border-border ${className}`} />;
}

export function SectionLabel({
  eyebrow,
  title,
  description,
  right,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  right?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 border-t border-border pt-6">
      <div className="max-w-2xl">
        {eyebrow && <div className="bi-mono mb-2">{eyebrow}</div>}
        <h2 className="text-2xl md:text-3xl leading-tight">{title}</h2>
        {description && <p className="mt-2 text-sm text-muted-foreground">{description}</p>}
      </div>
      {right}
    </div>
  );
}

export function PageShell({
  children,
  headerProps,
  footerProps,
}: {
  children: ReactNode;
  headerProps?: HeaderProps;
  footerProps?: FooterProps;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header {...headerProps} />
      <main className="flex-1">{children}</main>
      <Footer {...footerProps} />
    </div>
  );
}

export type NavItem = { href: string; label: string };

export const defaultNav: NavItem[] = [
  { href: "/", label: "Overview" },
  { href: "/components", label: "Components" },
  { href: "/examples/latest-issue", label: "Latest issue" },
  { href: "/examples/article-archive", label: "Archive" },
  { href: "/examples/article-detail", label: "Article" },
  { href: "/examples/role-page", label: "Role" },
  { href: "/examples/issue-archive", label: "Issues" },
];

export interface HeaderProps {
  nav?: NavItem[];
  brandHref?: string;
  brandTitle?: string;
  brandSubtitle?: string;
  ctaHref?: string;
  ctaLabel?: string;
  /** Current page path (e.g. Astro.url.pathname) used to highlight the active nav item. */
  currentPath?: string;
  /** Custom brand mark to render instead of the default LogoMark. */
  logo?: ReactNode;
}

export function Header({
  nav = defaultNav,
  brandHref = "/",
  brandTitle = "Built Intelligence",
  brandSubtitle = "AI · AEC · weekly",
  ctaHref = "/examples/latest-issue",
  ctaLabel = "Read latest issue",
  currentPath,
  logo,
}: HeaderProps = {}) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center gap-8">
        <a href={brandHref} className="flex items-center gap-3 group">
          {logo ?? <LogoMark />}
          <div className="leading-none">
            <div className="font-display text-lg tracking-tight">{brandTitle}</div>
            <div className="bi-mono mt-1">{brandSubtitle}</div>
          </div>
        </a>
        <nav className="hidden md:flex items-center gap-1 ml-auto text-sm">
          {nav.map((n) => {
            const active =
              currentPath != null &&
              (n.href === "/" ? currentPath === "/" : currentPath.startsWith(n.href));
            return (
              <a
                key={n.href}
                href={n.href}
                className={`px-3 py-1.5 rounded-sm transition-colors hover:text-foreground hover:bg-muted ${
                  active ? "text-foreground bg-muted" : "text-muted-foreground"
                }`}
              >
                {n.label}
              </a>
            );
          })}
        </nav>
        <div className="hidden sm:block ml-auto md:ml-0">
          <a
            href={ctaHref}
            className="inline-flex items-center gap-2 border border-foreground px-3 py-1.5 text-xs tracking-wide uppercase hover:bg-foreground hover:text-background transition-colors"
          >
            {ctaLabel}
          </a>
        </div>
        {/* Mobile menu — CSS-only <details> so the header needs no hydration */}
        <details className="relative ml-auto sm:ml-0 md:hidden">
          <summary
            aria-label="Open navigation menu"
            className="flex h-9 w-9 cursor-pointer list-none items-center justify-center border border-border hover:border-foreground transition-colors [&::-webkit-details-marker]:hidden"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
              <line x1="2" y1="4.5" x2="14" y2="4.5" stroke="currentColor" strokeWidth="1.2" />
              <line x1="2" y1="8" x2="14" y2="8" stroke="currentColor" strokeWidth="1.2" />
              <line x1="2" y1="11.5" x2="14" y2="11.5" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </summary>
          <div className="absolute right-0 top-11 z-50 w-60 border border-border bg-background shadow-sm">
            <nav className="flex flex-col py-2 text-sm" aria-label="Mobile">
              {nav.map((n) => {
                const active =
                  currentPath != null &&
                  (n.href === "/" ? currentPath === "/" : currentPath.startsWith(n.href));
                return (
                  <a
                    key={n.href}
                    href={n.href}
                    className={`px-4 py-2.5 transition-colors hover:bg-muted ${
                      active ? "text-foreground bg-muted" : "text-muted-foreground"
                    }`}
                  >
                    {n.label}
                  </a>
                );
              })}
            </nav>
            <div className="border-t border-border p-3">
              <a
                href={ctaHref}
                className="block border border-foreground px-3 py-2 text-center text-xs tracking-wide uppercase hover:bg-foreground hover:text-background transition-colors"
              >
                {ctaLabel}
              </a>
            </div>
          </div>
        </details>
      </div>
    </header>
  );
}

export interface FooterProps {
  brandTitle?: string;
  brandDescription?: string;
  browseLinks?: NavItem[];
  systemLinks?: NavItem[];
  issueLabel?: string;
  versionLabel?: string;
  /** Custom brand mark to render instead of the default LogoMark. */
  logo?: ReactNode;
}

export function Footer({
  brandTitle = "Built Intelligence",
  brandDescription = "AI in the built environment, without the noise. Selected signals across architecture, engineering, infrastructure, sustainability and climate adaptation.",
  browseLinks = [
    { href: "/examples/latest-issue", label: "Latest issue" },
    { href: "/examples/issue-archive", label: "Issue archive" },
    { href: "/examples/article-archive", label: "Article archive" },
    { href: "/examples/role-page", label: "Roles" },
  ],
  systemLinks = [
    { href: "/components", label: "Component library" },
    { href: "/", label: "Design overview" },
  ],
  issueLabel = "© Built Intelligence · Issue no. 42",
  versionLabel = "Component library v0.1",
  logo,
}: FooterProps = {}) {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-12 grid gap-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            {logo ?? <LogoMark />}
            <div className="font-display text-lg">{brandTitle}</div>
          </div>
          <p className="mt-3 text-sm text-muted-foreground max-w-md">{brandDescription}</p>
        </div>
        <div>
          <div className="bi-mono mb-3">Browse</div>
          <ul className="space-y-1.5 text-sm">
            {browseLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="hover:text-foreground text-muted-foreground">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="bi-mono mb-3">System</div>
          <ul className="space-y-1.5 text-sm">
            {systemLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="hover:text-foreground text-muted-foreground">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-4 flex flex-wrap items-center justify-between gap-2">
          <div className="bi-mono">{issueLabel}</div>
          <div className="bi-mono">{versionLabel}</div>
        </div>
      </div>
    </footer>
  );
}

export function LogoMark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden className="text-foreground">
      <rect x="1" y="1" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1" />
      <line x1="1" y1="11" x2="31" y2="11" stroke="currentColor" strokeWidth="0.5" />
      <line x1="1" y1="21" x2="31" y2="21" stroke="currentColor" strokeWidth="0.5" />
      <line x1="11" y1="1" x2="11" y2="31" stroke="currentColor" strokeWidth="0.5" />
      <line x1="21" y1="1" x2="21" y2="31" stroke="currentColor" strokeWidth="0.5" />
      <circle cx="21" cy="11" r="2.5" fill="currentColor" />
    </svg>
  );
}

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="bi-mono flex flex-wrap items-center gap-2">
      {items.map((it, i) => (
        <span key={i} className="flex items-center gap-2">
          {it.href ? (
            <a href={it.href} className="hover:text-foreground">{it.label}</a>
          ) : (
            <span className="text-foreground">{it.label}</span>
          )}
          {i < items.length - 1 && <span aria-hidden>/</span>}
        </span>
      ))}
    </nav>
  );
}

export function Tabs({
  tabs,
  value,
  onChange,
}: {
  tabs: { id: string; label: string; count?: number }[];
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-6 border-b border-border">
      {tabs.map((t) => {
        const active = t.id === value;
        return (
          <button
            key={t.id}
            onClick={() => onChange(t.id)}
            className={`relative pb-3 text-sm transition-colors ${
              active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.label}
            {typeof t.count === "number" && (
              <span className="ml-1.5 bi-mono">{t.count}</span>
            )}
            {active && (
              <span className="absolute left-0 right-0 -bottom-px h-px bg-foreground" />
            )}
          </button>
        );
      })}
    </div>
  );
}
