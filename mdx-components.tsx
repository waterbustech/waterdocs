import { ImageZoom } from 'fumadocs-ui/components/image-zoom';
import defaultComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { APIPage } from 'fumadocs-openapi/ui';
import { openapi } from '@/lib/source';

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultComponents,
    APIPage: (props) => <APIPage {...openapi.getAPIPageProps(props)} />,
    img: (props) => <ImageZoom {...(props as any)} />,
    ...components,
  };
}