import type { NextConfig } from "next";
import nextra from 'nextra'

const withNextra = nextra({
  contentDirBasePath: '/docs',
})

const nextConfig: NextConfig = {
  reactStrictMode: false,
  pageExtensions: ['ts', 'tsx'],
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

export default withNextra(nextConfig);
