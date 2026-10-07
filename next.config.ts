import type { NextConfig } from "next";

const isExport = process.env.STATIC_EXPORT === "true";

const nextConfig: NextConfig = {
  output: isExport ? "export" : undefined,
  images: {
    unoptimized: true,
  },
  cacheComponents: !isExport,
  partialPrefetching: !isExport,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
