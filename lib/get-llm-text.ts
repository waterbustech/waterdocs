import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkMdx from 'remark-mdx';
import { remarkAutoTypeTable } from 'fumadocs-typescript';
import { remarkInclude } from 'fumadocs-mdx/config';
import { type Page } from '@/lib/source';
import { remarkNpm } from 'fumadocs-core/mdx-plugins';

const processor = remark()
  .use(remarkMdx)
  .use(remarkInclude)
  .use(remarkGfm)
  .use(remarkAutoTypeTable)
  .use(remarkNpm);
  
export async function getLLMText(page: Page) {
  const category =
    {
      core: "The docs Waterbus",
      flutter_sdk: "Integrate into Flutter",
      server_sdk: "Integrate into your backend",
      openapi: "OpenAPI spec for Waterbus",
    }[page.slugs[0]] ?? page.slugs[0];

  const processed = await processor.process({
    path: page.data._file.absolutePath,
    value: page.data.content,
  });

  const sourcePath = page.data._file.path;

  return `# ${category}: ${page.data.title}
URL: ${page.url}
Source: https://raw.githubusercontent.com/waterbustech/waterdocs/refs/heads/main/content/${sourcePath}

${page.data.description}
        
${processed.value}`;
}
