import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE } from "../lib/site.ts";

export async function GET(context) {
  const posts = (await getCollection("writing")).filter(
    (p) => p.data.status !== "draft",
  );
  const valid = (s) => typeof s === "string" && !/todo/i.test(s) && !Number.isNaN(Date.parse(s));
  return rss({
    title: `${SITE.name} — Writing`,
    description: "Articles and analysis by Denis Zhurba.",
    site: context.site,
    items: posts.map((p) => ({
      title: p.data.title,
      pubDate: valid(p.data.date) ? new Date(p.data.date) : new Date(),
      description: p.data.summary ?? "",
      link: /^https?:\/\//.test(p.data.external_url || "")
        ? p.data.external_url
        : `/writing/${p.id}`,
    })),
  });
}
