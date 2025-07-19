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
  images: {
    domains: ["media.waterbus.tech", "github.com"],
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

const withMDX = createMDX();

export default withAnalyzer(withMDX(config));
