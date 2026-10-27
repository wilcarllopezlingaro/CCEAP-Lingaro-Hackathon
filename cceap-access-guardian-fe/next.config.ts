import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Disabled: this dashboard always fetches fresh secret data per request,
  // which is incompatible with the `cacheComponents` (PPR) opt-in.
  cacheComponents: false,
  turbopack: {
    // Pin the workspace root to this app since it lives inside a larger
    // monorepo that also has its own root package-lock.json.
    root: path.join(__dirname),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
