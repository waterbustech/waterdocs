import { NextResponse } from 'next/server';
import { type DocumentRecord } from 'fumadocs-core/search/algolia';
import { source } from '@/lib/source';

// export const revalidate = false;

export async function GET() {
  const results: DocumentRecord[] = [];

  for (const page of source.getPages()) {
    const { structuredData } = await page.data;

    results.push({
      _id: page.url,
      structured: structuredData,
      url: page.url,
      title: page.data.title,
      description: page.data.description,
    });
  }

  return NextResponse.json(results);
}
