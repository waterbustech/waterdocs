import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { cloneElement, type ReactElement, type ReactNode } from "react";
import { baseOptions } from "@/app/layout.config";
import { source } from "@/lib/source";

export default async function Layout({
  params,
  children,
}: {
  params: Promise<{ lang: string }>;
  children: ReactNode;
}) {
  const { lang } = await params;
  return (
    <DocsLayout
      tree={source.pageTree[lang]}
      {...baseOptions(lang)}
      sidebar={{
        tabs: {
          transform: (option, node) => ({
            ...option,
            icon: node.icon ? <MyIcon icon={node.icon} /> : undefined,
          }),
        },
      }}
    >
      {children}
    </DocsLayout>
  );
}

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
      className="rounded-md p-1 shadow-lg ring-2 inline-flex items-center justify-center [&_svg]:size-6.5 md:[&_svg]:size-5"
      style={{
        color: iconProps.color ?? "#ccc",
        border: `1px solid color-mix(in oklab, ${iconProps.color ?? "#ccc"} 50%, transparent)`,
        //@ts-ignore
        "--tw-ring-color": `color-mix(in oklab, ${iconProps.color ?? "#ccc"} 20%, transparent)`,
      }}
    >
      {styledIcon}
    </div>
  );
}
