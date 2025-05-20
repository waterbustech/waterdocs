import { source } from "@/lib/source";
import {
  DocsPage,
  DocsBody,
  DocsDescription,
  DocsTitle,
} from "fumadocs-ui/page";
import { notFound } from "next/navigation";
import { createRelativeLink } from "fumadocs-ui/mdx";
import { RateWrapper } from "@/components/rate_wrapper";
import { EditOnGitHub, LLMCopyButton } from "./page.client";
import { MDXContent } from '@content-collections/mdx/react';
import { getMDXComponents } from '@/mdx-components';

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();
  // const MDXContent = page.data.body;
  const optionDivStyle = {
    display: "inline-flex",
  };
  return (
    <DocsPage
      tableOfContent={{
        style: "clerk",
      }}
      toc={page.data.toc}
      full={page.data.full}
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <div style={optionDivStyle}>
          <LLMCopyButton slug={params.slug} />
          <EditOnGitHub
            url={`https://github.com/lambiengcode/waterdocs/tree/main/content/${page.file.path}`}
          ></EditOnGitHub>
        </div>
        <MDXContent code={page.data.body} components={getMDXComponents()} />
      </DocsBody>
      <RateWrapper />
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
