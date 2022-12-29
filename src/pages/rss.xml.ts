import rss from "@astrojs/rss";
import { blog } from "../lib/markdoc/frontmatter.schema";
import { readAll } from "../lib/markdoc/read";
import { SITE_TITLE, SITE_DESCRIPTION, SITE_URL } from "../config";

export const get = async () => {
  const posts = await readAll({
    directory: "blog",
    frontmatterSchema: blog,
  });

  const sortedPosts = posts.filter((p) => !p.frontmatter.draft).sort((a, b) => b.frontmatter.date.valueOf() - a.frontmatter.date.valueOf());

  // removing trailing slash if found: https://example.com/ => https://example.com
  const baseUrl = SITE_URL.replace(/\/+$/g, "");

  const rssItems = sortedPosts.map(({ frontmatter, slug }) => {
    const title = frontmatter.title;
    const pubDate = frontmatter.date;
    const description = frontmatter.description;
    const link = `${baseUrl}/blog/${slug}`;

    return {
      title,
      pubDate,
      description,
      link,
    };
  });

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: baseUrl,
    items: rssItems,
  });
};
