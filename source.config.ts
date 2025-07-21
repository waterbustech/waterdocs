import {
  defineConfig,
  defineDocs,
  frontmatterSchema,
  metaSchema,
} from "fumadocs-mdx/config";

import { z } from "zod";

// You can customise Zod schemas for frontmatter and `meta.json` here
// see https://fumadocs.vercel.app/docs/mdx/collections#define-docs
export const docs = defineDocs({
  dir: "content",
  docs: {
    async: false,
    schema: frontmatterSchema.extend({
      preview: z.string().optional(),
      index: z.boolean().default(false),
      /**
       * API routes only
       */
      method: z.string().optional(),
    }),
  },
  meta: {
    schema: metaSchema.extend({
      description: z.string().optional(),
    }),
  },
});

export default defineConfig({
  lastModifiedTime: "git",
  mdxOptions: {
    // rehypeCodeOptions: {
    //   lazy: true,
    //   experimentalJSEngine: true,
    //   // langs: ["rust", "dart", "java", "kotlin", "swift", "objective-c"],
    //   // inline: "tailing-curly-colon",
    //   themes: {
    //     light: "catppuccin-latte",
    //     dark: "catppuccin-mocha",
    //   },
    // },
  },
});
