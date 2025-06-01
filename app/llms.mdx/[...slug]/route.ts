import { type NextRequest, NextResponse } from 'next/server';

import { source } from '@/lib/source';
import { notFound } from 'next/navigation';
import { getLLMText } from '@/lib/get-llm-text';

export const revalidate = false;

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ lang:string;slug: string[] }> },
) {
   const slug = (await params).slug;
   const lang = (await params).lang;

  const page = source.getPage(slug, lang);
  //const page = source.getPage(slug);
  if (!page) notFound();

  return new NextResponse(await getLLMText(page));
}

export function generateStaticParams() {
  return source.generateParams();
}


