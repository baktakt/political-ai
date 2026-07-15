import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getCollection } from "astro:content";
import { SITE } from "@/data/site";

export async function GET(context: APIContext) {
  const updates = (await getCollection("updates")).sort((a, b) =>
    b.data.date.localeCompare(a.data.date),
  );
  return rss({
    title: `${SITE.name} — uppdateringar`,
    description:
      "Uppdateringslogg: ändringar i research, metod och innehåll på Partierna om AI.",
    site: context.site!,
    items: updates.map((u) => ({
      title: u.data.title,
      description: u.data.description,
      pubDate: new Date(u.data.date),
      link: `/uppdateringar/#${u.id}`,
    })),
    customData: "<language>sv-SE</language>",
  });
}
