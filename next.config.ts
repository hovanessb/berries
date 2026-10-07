import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Toast CDN photos render with a plain <img>; designer art in /public uses next/image.
  poweredByHeader: false,
  images: {
    // AVIF first (smallest), WebP fallback; local art never changes without a new deploy.
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  // Pin the workspace root (a lockfile in a parent folder otherwise confuses Turbopack).
  turbopack: { root: __dirname },
};

export default nextConfig;
