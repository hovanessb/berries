import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Toast CDN photos render with a plain <img>; designer art in /public uses next/image.
  poweredByHeader: false,
  // Pin the workspace root (a lockfile in a parent folder otherwise confuses Turbopack).
  turbopack: { root: __dirname },
};

export default nextConfig;
