import { fileURLToPath } from "node:url";

import withBundleAnalyzer from "@next/bundle-analyzer";
import { createJiti } from "jiti";
import type { NextConfig } from "next";

const jiti = createJiti(fileURLToPath(import.meta.url));

// validate env on build
jiti.esmResolve("./src/env.ts");

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,

  experimental: {
    optimizePackageImports: [],
  },

  turbopack: {
    rules: { ".svg": ["@svgr/webpack"] },
  },
};

export default bundleAnalyzer(nextConfig);
