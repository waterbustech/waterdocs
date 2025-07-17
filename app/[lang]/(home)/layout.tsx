import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { cloneElement, type ReactElement, type ReactNode } from "react";
import { baseOptions } from "@/app/layout.config";
import { source } from "@/lib/source";
import { AISearchTrigger } from "@/components/ai";
import { LargeSearchToggle } from 'fumadocs-ui/components/layout/search-toggle';
import { Sparkles } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/cn";

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
      searchToggle={{
        components: {
          lg: (
            <div className="flex gap-1.5 max-md:hidden">
              <LargeSearchToggle className="flex-1" />
              <AISearchTrigger
                aria-label="Ask AI"
                className={cn(
                  buttonVariants({
                    variant: 'outline',
                    size: 'icon',
                    className: 'text-fd-muted-foreground',
                  }),
                )}
              >
                <Sparkles className="size-4" />
              </AISearchTrigger>
            </div>
          ),
        },
      }}
      sidebar={{
        tabs: {
          transform(option, node) {
            const meta = source.getNodeMeta(node);
            if (!meta || !node.icon) return option;

            const color = `var(--${meta.file.path.split('/')[0]}-color, var(--color-fd-foreground))`;

            return {
              ...option,
              icon: (
                <div
                  className="[&_svg]:size-full rounded-lg text-(--tab-color) max-md:bg-(--tab-color)/10 max-md:border max-md:p-1.5"
                  style={
                    {
                      '--tab-color': color,
                    } as object
                  }
                >
                  {node.icon}
                </div>
              ),
            };
          },
        },
      }}
    >
      {children}
    </DocsLayout>
  );
}

