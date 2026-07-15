import type { Article } from "@/data/mockArticles";
import { formatDate, hostFromUrl } from "@/lib/formatters";
import { RoleTag, TopicTag, SourceMeta, ExternalSourceLink } from "./tags";

type Variant = "standard" | "compact" | "featured" | "row";

const DEFAULT_DETAIL_HREF = "/examples/article-detail";

export function ArticleCard({
  article,
  variant = "standard",
  href = DEFAULT_DETAIL_HREF,
}: {
  article: Article;
  variant?: Variant;
  /** Link target for the article title (e.g. your site's article detail route). */
  href?: string;
}) {
  if (variant === "row") return <ArticleRow article={article} href={href} />;
  if (variant === "compact") return <ArticleCompact article={article} href={href} />;
  if (variant === "featured") return <ArticleFeatured article={article} href={href} />;
  return <ArticleStandard article={article} href={href} />;
}

function CardShell({ children, featured = false }: { children: React.ReactNode; featured?: boolean }) {
  return (
    <article
      className={`group relative flex flex-col border border-border bg-card p-6 transition-colors hover:border-foreground ${
        featured ? "md:p-8" : ""
      }`}
    >
      {children}
    </article>
  );
}

function ArticleStandard({ article, href }: { article: Article; href: string }) {
  return (
    <CardShell>
      <SourceMeta source={article.source} publishedAt={article.publishedAt} contentType={article.contentType} />
      <h3 className="mt-3 text-lg leading-snug font-display">
        <a href={href} className="hover:underline underline-offset-4">
          {article.title}
        </a>
      </h3>
      <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{article.summary}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {article.roles.map((r) => (
          <RoleTag key={r} id={r} />
        ))}
      </div>
      <div className="mt-2 flex flex-wrap gap-1">
        {article.topics.slice(0, 4).map((t) => (
          <TopicTag key={t}>{t}</TopicTag>
        ))}
      </div>
    </CardShell>
  );
}

function ArticleCompact({ article, href }: { article: Article; href: string }) {
  return (
    <CardShell>
      <SourceMeta source={article.source} publishedAt={article.publishedAt} />
      <h3 className="mt-2 text-base leading-snug font-display">
        <a href={href} className="hover:underline underline-offset-4">
          {article.title}
        </a>
      </h3>
      <div className="mt-3 flex flex-wrap gap-1">
        {article.roles.map((r) => (
          <RoleTag key={r} id={r} size="xs" />
        ))}
      </div>
    </CardShell>
  );
}

function ArticleFeatured({ article, href }: { article: Article; href: string }) {
  return (
    <CardShell featured>
      <div className="bi-mono">Selected story · {formatDate(article.publishedAt)}</div>
      <h3 className="mt-4 text-2xl md:text-3xl leading-tight font-display">
        <a href={href} className="hover:underline underline-offset-4">
          {article.title}
        </a>
      </h3>
      <p className="mt-3 text-base text-muted-foreground max-w-2xl">{article.summary}</p>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-1.5">
          {article.roles.map((r) => (
            <RoleTag key={r} id={r} />
          ))}
          {article.topics.slice(0, 3).map((t) => (
            <TopicTag key={t}>{t}</TopicTag>
          ))}
        </div>
        <SourceMeta source={article.source} publishedAt={article.publishedAt} contentType={article.contentType} />
      </div>
    </CardShell>
  );
}

function ArticleRow({ article, href }: { article: Article; href: string }) {
  return (
    <article className="py-4 border-t border-border hover:bg-muted/40 transition-colors sm:grid sm:grid-cols-12 sm:gap-4">
      <div className="bi-mono sm:col-span-2 sm:pt-1">{formatDate(article.publishedAt)}</div>
      <div className="mt-1 sm:mt-0 sm:col-span-7 min-w-0">
        <a href={href} className="block font-display text-base leading-snug hover:underline">
          {article.title}
        </a>
        <div className="mt-1 text-xs text-muted-foreground">{article.source} · {hostFromUrl(article.url)}</div>
      </div>
      <div className="mt-2 sm:mt-0 sm:col-span-3 flex flex-wrap items-start content-start gap-1 sm:justify-end">
        {article.roles.map((r) => (
          <RoleTag key={r} id={r} size="xs" />
        ))}
      </div>
    </article>
  );
}

export function ArticleDetailHeader({ article }: { article: Article }) {
  return (
    <header className="border-b border-border pb-8">
      <div className="bi-mono">{article.contentType} · Curated {formatDate(article.curatedAt)}</div>
      <h1 className="mt-4 text-3xl md:text-5xl leading-[1.1] font-display max-w-3xl">
        {article.title}
      </h1>
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <SourceMeta source={article.source} publishedAt={article.publishedAt} />
      </div>
      <div className="mt-6 flex flex-wrap gap-1.5">
        {article.roles.map((r) => (
          <RoleTag key={r} id={r} />
        ))}
        {article.topics.map((t) => (
          <TopicTag key={t}>{t}</TopicTag>
        ))}
      </div>
      <div className="mt-8">
        <ExternalSourceLink url={article.url} />
      </div>
    </header>
  );
}
