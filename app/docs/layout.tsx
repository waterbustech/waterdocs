import { DocsLayout, type DocsLayoutProps } from 'fumadocs-ui/layouts/notebook';
import { cloneElement, ReactElement, type ReactNode } from 'react';
import { baseOptions } from '@/app/layout.config';
import { source } from '@/lib/source';
import { GithubInfo } from 'fumadocs-ui/components/github-info';

interface MyIconProps {
  icon: ReactElement;
}

function MyIcon({ icon }: MyIconProps) {
  const styledIcon = cloneElement(icon);

  const iconProps = icon.props as {
    stroke?: string;
    color?: string;
  };

  return (
    <div
      className="rounded-md p-1 shadow-lg inline-flex items-center justify-center"
      style={{ border: `1px solid ${iconProps.color ?? '#ccc'}` }}
    >
      {styledIcon}
    </div>
  );
}

const docsOptions: DocsLayoutProps = {
  ...baseOptions,
  tree: source.pageTree,
  sidebar: {
    tabs: {
      transform: (option, node) => ({
        ...option,
        icon: node.icon ? <MyIcon icon={node.icon} /> : undefined,
      }),
    },
  },
  links: [
    {
      type: 'custom',
      children: (
        <GithubInfo owner="waterbustech" repo="waterbus" className="lg:-mx-2" />
      ),
    },
  ],
};

export default function Layout({ children }: { children: ReactNode }) {
  return <DocsLayout {...docsOptions}>{children}</DocsLayout>;
}
