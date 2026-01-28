import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import { z } from "zod";
import remarkGfm from "remark-gfm";

// for more information on configuration, visit:
// https://www.content-collections.dev/docs/configuration
import rehypePrettyCode from "rehype-pretty-code";

const posts = defineCollection({
  name: "posts",
  directory: "content/posts",
  include: "*.mdx",
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    author: z.string(),
  }),
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document, {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        [
          rehypePrettyCode,
          {
            theme: "github-dark-dimmed",
            keepBackground: true,
          },
        ],
      ],
    });
    return {
      ...document,
      mdx,
    };
  },
});

const profile = defineCollection({
  name: "profile",
  directory: "content",
  include: "profile.yaml",
  parser: "yaml",
  schema: z.object({
    name: z.string(),
    description: z.string(),
    links: z.record(z.string(), z.tuple([z.string(), z.string()])),
  }),
});

const links = defineCollection({
  name: "links",
  directory: "content",
  include: "links.yaml",
  parser: "yaml",
  schema: z.object({
    links: z.record(
      z.string(),
      z.object({
        url: z.url(),
        gif: z.string(),
      }),
    ),
  }),
});

export default defineConfig({
  collections: [profile, posts, links],
});
