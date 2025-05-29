import { withContentCollections } from "@content-collections/next";

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  images: {
    domains: ["media.waterbus.tech", "i.ibb.co", "github.com"],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/core",
        permanent: true,
      },
    ];
  },
};

export default withContentCollections(config);
