import { withContentCollections } from "@content-collections/next";

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/backend',
        permanent: true,
      },
    ];
  },
};

export default withContentCollections(config);
