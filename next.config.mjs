import { withContentCollections } from "@content-collections/next";

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  images: {
    domains: ["media.waterbus.tech", "github.com"],
  },
  async rewrites() {
    return [
      {
        source: '/en/:path*.mdx',
        destination: '/llms.mdx/:path*',
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

export default withContentCollections(config);
