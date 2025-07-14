import type { NextConfig } from "next";
import nextra from 'nextra'

const withNextra = nextra({
  // ... Add Nextra-specific options here
})


const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

export default nextConfig
