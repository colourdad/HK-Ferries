import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // TODO: Add PWA plugin configuration in Phase 5
  // TODO: Add image domains for operator logos when sourced

  experimental: {
    // typedRoutes provides compile-time safety for Link href values
    typedRoutes: true,
  },
};

export default nextConfig;
