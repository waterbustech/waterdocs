// app/components/ClientAPIPage.tsx
'use client';

import { APIPage } from 'fumadocs-openapi/ui';
import { openapi } from '@/lib/source';

export default function ClientAPIPage(props: any) {
  return <APIPage {...openapi.getAPIPageProps(props)} />;
}
