import '../global.css';
import { RootProvider } from 'fumadocs-ui/provider';
import { IBM_Plex_Mono, Tomorrow, Ubuntu } from 'next/font/google';
import type { ReactNode } from 'react';
import SearchDialog from '@/components/search';

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: '400'
});

const tomorrow = Tomorrow({
  subsets: ['latin'],
  weight: '400',
});

const ubuntu = Tomorrow({
  subsets: ['latin'],
  weight: '400',
});

export const metadata = {
  title: "Waterdocs",
  description: "Documentation for Waterbus SFU.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default async function Layout({
  params,
  children,
}: {
  params: Promise<{ lang: string }>;
  children: ReactNode;
}) {
  const { lang } = await params;
  return  (
    <html lang="en" className={`${ubuntu.className} ${tomorrow.className} ${ibmPlexMono.className}`} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider
          search={{
            SearchDialog,
          }}
          i18n={{
            locale: lang,
            locales: [
              {
                name: "English",
                locale: "en",
              },
              {
                name: "Tiếng Việt",
                locale: "vi",
              },
            ],
            translations: {
              vi: {
                toc: "Mục lục",
                search: "Tìm kiếm",
                lastUpdate: "Cập nhật lần cuối",
                searchNoResult: "Không tìm thấy kết quả",
                previousPage: "Trang trước",
                nextPage: "Trang sau",
                chooseLanguage: "Chọn ngôn ngữ",
                
              },
            }
            [lang],
          }}
          theme={{ themes: ["cappuccin"] }}
        >{children}</RootProvider>
      </body>
    </html>
  );
}
