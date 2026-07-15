# Built Intelligence Components

Editorial component library for **Built Intelligence** — article cards, issue
layouts, role/topic tags, search & filtering, and page chrome (header/footer)
— built with React, Tailwind CSS v4 and Radix UI (via shadcn/ui).

The `src/` tree doubles as:

- a **TanStack Start demo app** (routes, examples, component gallery) for local
  preview and Lovable sync, and
- an **installable component package** that any React-capable site — including
  an [Astro](https://astro.build) site via `@astrojs/react` — can install and
  render as islands.

## Installing in an Astro site

This package is not published to npm; install it directly from GitHub:

```sh
npm install github:baktakt/built-intelligence-components#claude/astro-component-package-s3dkq3
```

(swap the branch/tag for whatever ref you want to pin to — omit `#ref` to
track the default branch). On install, npm/pnpm/yarn run this package's
`prepare` script, which builds `dist/` via `tsup`.

You'll also need React and Astro's React integration in the consuming project:

```sh
npx astro add react
```

### 1. Add the design tokens & styles

The components rely on Tailwind v4 utility classes and a set of CSS custom
properties (design tokens) defined in `styles.css`. In your Astro project's
global stylesheet (the one that does `@import "tailwindcss";`), import this
package's stylesheet too:

```css
/* src/styles/global.css */
@import "tailwindcss";
@import "built-intelligence-components/styles.css";
```

`styles.css` scopes its own `@source` scan to this package's `src/`, so it
picks up every Tailwind class used by these components regardless of your
app's own content globs.

Make sure `global.css` is imported once, e.g. in your base layout's frontmatter
or a `<link>`/`import` in `Layout.astro`.

### 2. Use components in `.astro` files

Static components (no `useState`/event handlers) can render at build time with
no client directive. Interactive components (`SearchBar`, `FilterPanel`,
`Tabs`, `ArchiveDemo`, etc.) need a [client
directive](https://docs.astro.build/en/reference/directives-reference/#client-directives)
so React hydrates them in the browser.

```astro
---
// src/pages/index.astro
import { Header, Footer, IssueHero, ArticleCard } from "built-intelligence-components";
import { mockArticles, latestIssue } from "built-intelligence-components";
---

<Header currentPath={Astro.url.pathname} client:load />

<IssueHero issue={latestIssue} readHref="/latest" archiveHref="/archive" />

<div class="grid gap-4 md:grid-cols-2">
  {mockArticles.slice(0, 4).map((article) => (
    <ArticleCard article={article} href={`/articles/${article.id}`} client:visible />
  ))}
</div>

<Footer client:load />
```

```astro
---
// Interactive search/filter UI
import { ArchiveDemo } from "built-intelligence-components";
---

<ArchiveDemo client:load />
```

> Astro requires a client directive on the outermost React component in a
> tree that needs interactivity — hydrate `Header`/`Footer`/`ArchiveDemo`
> themselves rather than a parent `.astro` wrapper.

### 3. Bring your own routes

`Header`, `Footer`, `ArticleCard`, `IssueCard`, `IssueHero`, `RoleCard` and
`Breadcrumbs` all accept `href`/`nav`/`*Href` props so you can point them at
your own Astro routes instead of the demo app's `/examples/*` paths. See each
component's props in `dist/index.d.ts` (or `src/components/bi/*.tsx`) for the
full list — every navigational prop has a sensible default matching the demo
site, and every one is overridable.

### Data & types

Sample content (`mockArticles`, `mockIssues`, `roles`, `topics`) and their
TypeScript types (`Article`, `Issue`, `Role`, `RoleId`, `Filters`, ...) are
exported from the package root too, so you can use them to prototype before
wiring up real content, or reuse the types for your own CMS data.

### Raw UI primitives

The underlying shadcn/ui primitives (`Button`, `Card`, `Dialog`, `Sidebar`,
...) that some `bi/*` components are styled alongside are available from the
`/ui` subpath:

```ts
import { Button, Card, CardContent } from "built-intelligence-components/ui";
```

## Package contents

| Export | What it is |
| --- | --- |
| `.` | `bi/*` editorial components, mock data, `cn`/formatter utils |
| `./ui` | shadcn/ui primitives (Radix-based) |
| `./styles.css` | Tailwind v4 theme tokens + utilities used by the components |

## Local development (this repo)

```sh
bun install
bun run dev        # TanStack Start demo app at /, /components, /examples/*
bun run build:lib  # build the dist/ package output (also runs on `prepare`)
```

`src/routes/components.tsx` is a living component gallery — the best place to
see every variant of every component rendered together.
