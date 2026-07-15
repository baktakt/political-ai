import type { Issue } from "@/data/mockIssues";
import { formatDate } from "@/lib/formatters";
import type { Article } from "@/data/mockArticles";
import { rolesById, type RoleId } from "@/data/roles";
import { ArticleCard } from "./article";

export function IssueHero({
  issue,
  readHref = "/examples/article-detail",
  archiveHref = "/examples/article-archive",
}: {
  issue: Issue;
  readHref?: string;
  archiveHref?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 bi-grid opacity-60" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-6 pt-16 pb-20">
        <div className="bi-mono">Issue no. {issue.number} · {formatDate(issue.date)} · This week</div>
        <h1 className="mt-6 text-4xl md:text-6xl leading-[1.05] font-display max-w-4xl">
          {issue.title}
        </h1>
        <p className="mt-6 max-w-3xl text-base md:text-lg text-muted-foreground">{issue.editorsNote}</p>
        <div className="mt-8 flex flex-wrap gap-2">
          {issue.themes.map((t) => (
            <span key={t} className="border border-border px-3 py-1 text-xs bi-mono !text-[10px]">
              {t}
            </span>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href={readHref}
            className="inline-flex items-center gap-2 bg-foreground text-background px-5 py-3 text-sm tracking-wide uppercase hover:opacity-90"
          >
            Read latest issue →
          </a>
          <a
            href={archiveHref}
            className="inline-flex items-center gap-2 border border-foreground text-foreground px-5 py-3 text-sm tracking-wide uppercase hover:bg-foreground hover:text-background"
          >
            Search archive
          </a>
        </div>
      </div>
    </section>
  );
}

export function IssueCard({
  issue,
  articleCount,
  variant = "standard",
  href = "/examples/latest-issue",
}: {
  issue: Issue;
  articleCount: number;
  variant?: "standard" | "compact" | "featured";
  /** Link target for the issue (e.g. your site's issue detail route). */
  href?: string;
}) {
  if (variant === "featured") {
    return (
      <a
        href={href}
        className="block border border-foreground bg-card p-8 hover:opacity-95 transition-opacity"
      >
        <div className="bi-mono">Latest · Issue {issue.number}</div>
        <h3 className="mt-3 text-2xl md:text-3xl leading-tight font-display">{issue.title}</h3>
        <p className="mt-3 text-sm text-muted-foreground max-w-2xl">{issue.editorsNote}</p>
        <div className="mt-5 bi-mono">{articleCount} selected articles · {formatDate(issue.date)}</div>
      </a>
    );
  }
  if (variant === "compact") {
    return (
      <a href={href} className="block border-t border-border py-4 hover:bg-muted/50 px-2 -mx-2">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="bi-mono">No. {issue.number} · {formatDate(issue.date)}</div>
            <div className="mt-1 font-display">{issue.title}</div>
          </div>
          <div className="bi-mono">{articleCount} →</div>
        </div>
      </a>
    );
  }
  return (
    <a
      href={href}
      className="block border border-border bg-card p-6 hover:border-foreground transition-colors"
    >
      <div className="bi-mono">Issue {issue.number} · {formatDate(issue.date)}</div>
      <h3 className="mt-3 text-xl leading-snug font-display">{issue.title}</h3>
      <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{issue.editorsNote}</p>
      <div className="mt-4 flex flex-wrap gap-1">
        {issue.themes.slice(0, 4).map((t) => (
          <span key={t} className="bi-mono !text-[10px] border border-border px-2 py-0.5">{t}</span>
        ))}
      </div>
      <div className="mt-4 bi-mono">{articleCount} articles →</div>
    </a>
  );
}

export function IssueSection({
  roleId,
  articles,
  note,
}: {
  roleId: RoleId;
  articles: Article[];
  note?: string;
}) {
  const role = rolesById[roleId];
  if (!role || articles.length === 0) return null;
  return (
    <section className="py-12 border-t border-border">
      <div className="grid md:grid-cols-12 gap-8">
        <div className="md:col-span-4">
          <div className="bi-mono">Section · {role.short}</div>
          <h2 className="mt-3 text-2xl leading-snug font-display">{role.title}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{role.description}</p>
          {note && <p className="mt-4 text-sm italic text-muted-foreground">{note}</p>}
          <div className="mt-4 bi-mono">{articles.length} in this issue</div>
        </div>
        <div className="md:col-span-8 grid gap-4 md:grid-cols-2">
          {articles.map((a) => (
            <ArticleCard key={a.id} article={a} variant="standard" />
          ))}
        </div>
      </div>
    </section>
  );
}
