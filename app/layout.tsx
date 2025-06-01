import "./global.css";
import { RootProvider } from "fumadocs-ui/provider";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "Waterdocs",
  description: "Documentation for Waterbus SFU.",
  icons: {
    icon: "/[lang]/favicon.ico",
    shortcut: "/[lang]/favicon.ico",
    apple: "/[lang]/apple-touch-icon.png",
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
  return (
    <html lang={lang} className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider
          i18n={{
            locale: lang,
            locales: [
              {
                name: "English",
                locale: "en",
              },
              {
                name: "Vietnamese",
                locale: "vi",
              },
            ],
            translations: {
              vi: {
                toc: "目錄",
                search: "搜尋文檔",
                lastUpdate: "最後更新於",
                searchNoResult: "沒有結果",
                previousPage: "上一頁",
                nextPage: "下一頁",
                chooseLanguage: "Chọn ngôn ngữ",
              },
            }
            [lang],
          }}
          theme={{ themes: ["cappuccin"] }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
