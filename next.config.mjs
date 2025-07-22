import createBundleAnalyzer from "@next/bundle-analyzer";
import { createMDX } from "fumadocs-mdx/next";

const withAnalyzer = createBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  eslint: {
    // Replaced by root workspace command
    ignoreDuringBuilds: true,
  },
  serverExternalPackages: ["ts-morph", "typescript", "oxc-transform", "shiki"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.waterbus.tech",
        port: "",
      },
      {
        protocol: "https",
        hostname: "github.com",
        port: "",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/en/:path*.mdx",
        destination: "/llms.mdx/:path*",
      },
      {
        source: "/vi/:path*.mdx",
        destination: "/llms.mdx/:path*",
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/en/core",
        permanent: true,
      },
    ];
  },
};

import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();

const withMDX = createMDX();

export default withAnalyzer(withMDX(config));
