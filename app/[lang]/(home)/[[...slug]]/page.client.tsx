'use client';
import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { useCopyButton } from 'fumadocs-ui/utils/use-copy-button';
import Link from 'fumadocs-core/link';
import { Button } from '@/components/ui/button';

const cache = new Map<string, string>();

export function LLMCopyButton({ slug }: { slug: string[] | undefined }) {
  const [isLoading, setLoading] = useState(false);
  const [checked, onClick] = useCopyButton(async () => {
    setLoading(true);

    const url = `/llms.mdx/${slug?.join('/')}`;
    try {
      const content: string =
        cache.get(url) ?? (await fetch(url).then((res) => res.text()));

      cache.set(url, content);
      await navigator.clipboard.writeText(content);
    } finally {
      setLoading(false);
    }
  });

  return (
    <Button
      disabled={isLoading}
      onClick={onClick}
      variant="outline"
      size="sm"
      className="gap-1 text-[0.65rem] rounded-md border border-gray-400 mb-2 mr-1"
    >
      {checked ? <Check className="size-3" /> : <Copy className="size-3" />}
      Copy Markdown
    </Button>
  );
}

export function EditOnGitHub({ url }: { url: string }) {
  return (
    <Button
      asChild
      variant="outline"
      size="sm"
      className="gap-1 text-[0.65rem] rounded-md border border-gray-400 mb-2 mr-1"
    >
      <Link
        href={url}
        rel="noreferrer noopener"
        target="_blank"
        className="no-underline"
      >
        <svg
          fill="currentColor"
          role="img"
          viewBox="0 0 24 24"
          className="size-3"
        >
          <title>GitHub</title>
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
        Edit on GitHub
      </Link>
    </Button>
  );
}