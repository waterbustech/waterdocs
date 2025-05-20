import { ImageZoom } from 'fumadocs-ui/components/image-zoom';
import defaultComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { APIPage } from 'fumadocs-openapi/ui';
import { openapi } from '@/lib/source';
import { CodeBlock, Pre } from 'fumadocs-ui/components/codeblock';

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultComponents,
    APIPage: (props) => <APIPage {...openapi.getAPIPageProps(props)} />,
    img: (props) => <ImageZoom {...(props as any)} />,
    pre: ({ ref: _ref, ...props }) => (
      <CodeBlock {...props}>
        <Pre>{props.children}</Pre>
      </CodeBlock>
    ),
    ...components,
  };
}
