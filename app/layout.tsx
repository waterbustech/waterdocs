import './global.css';
import { RootProvider } from 'fumadocs-ui/provider';
import { IBM_Plex_Mono, Ubuntu } from 'next/font/google';
import type { ReactNode } from 'react';

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: '400'
});

const ubuntu = Ubuntu({
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

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${ubuntu.className} ${ibmPlexMono.className}`} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider theme={{themes: ["cappuccin"]}}>{children}</RootProvider>
      </body>
    </html>
  );
}
