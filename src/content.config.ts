import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const seoSchema = z
  .object({
    page_description: z.string().nullable(),
    canonical_url: z.string().nullable(),
    featured_image: z.string().nullable(),
    featured_image_alt: z.string().nullable(),
    author_twitter_handle: z.string().nullable(),
    open_graph_type: z.string().nullable(),
    no_index: z.boolean(),
  })
  .optional();

const blogCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    date: z.date(),
    title: z.string(),
    tags: z.array(z.string()),
    author: z.string(),
    thumb_image: z.object({
      image: z.string(),
      image_alt: z.string(),
    }),
    featured_image: z.object({
      image: z.string(),
      image_alt: z.string(),
    }),
    seo: seoSchema,
    draft: z.boolean(),
  }),
});

const pageSchema = z.object({
  _schema: z.any().optional(),
  hidden: z.boolean().optional().default(false),
  title: z.string(),
  description: z.undefined().optional(),
  seo: seoSchema,
  content_blocks: z.array(z.any()),
});

const exampleSchema = z.object({
  _schema: z.any(),
  title: z.any(),
  unkeyed: z.any(),
  keyed: z.any(),
  empty_unkeyed: z.any(),
  empty_keyed: z.any(),
  multi_element_unkeyed: z.any(),
  multi_element_keyed: z.any(),
  empty_multi_element_unkeyed: z.any(),
  empty_multi_element_keyed: z.any(),
  _inputs: z.any(),
  _structures: z.any(),
});

const paginatedCollectionSchema = z.object({
  _schema: z.literal("paginated_collection"),
  hidden: z.literal(true).optional().default(true),
  title: z.string(),
  description: z.string().optional(),
  page_size: z.number().positive(),
  seo: seoSchema,
  content_blocks: z.undefined().optional(),
});

// The blog index entry always uses this schema; pages import it to narrow the
// pages union so page_size/seo/description are visible.
export type PaginatedPage = z.infer<typeof paginatedCollectionSchema>;

const pagesCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/pages" }),
  schema: z.union([paginatedCollectionSchema, pageSchema, exampleSchema]),
});

export const collections = {
  blog: blogCollection,
  pages: pagesCollection,
};
