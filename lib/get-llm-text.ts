import { remark } from "remark";
import remarkGfm from "remark-gfm";
import { source } from "@/lib/source";
import remarkMdx from "remark-mdx";
import { remarkInclude } from "fumadocs-mdx/config";
import { InferPageType } from "fumadocs-core/source";

const processor = remark()
  .use(remarkMdx)
  // needed for Fumadocs MDX
  .use(remarkInclude)
  .use(remarkGfm);
export async function getLLMText(page: InferPageType<typeof source>) {
  const processed = await processor.process({
    path: page.data._meta.filePath,
    value: page.data.content,
  });
  return `# ${page.data.title}
      URL: ${page.url}
      ${page.data.description}
      ${processed.value}`;
}
