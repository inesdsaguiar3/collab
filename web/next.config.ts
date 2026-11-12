import path from "path";
import { fileURLToPath } from "url";
import type { NextConfig } from "next";

/** App root (`web/`) — portable (no hardcoded machine path); matches Vercel + local. */
const appRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  // Prevent Next from inferring a parent workspace root (which can break Tailwind resolution in dev).
  outputFileTracingRoot: appRoot,
  turbopack: {
    root: appRoot,
  },
  // Keep Stripe (and other heavy deps) external where possible — smaller serverless bundles.
  serverExternalPackages: ["stripe"],

  /**
   * `public/` is served as static assets and must not be zipped into every API route.
   * Without this, Vercel can exceed the 300MB serverless limit (e.g. api/stripe/checkout).
   */
  outputFileTracingExcludes: {
    "*": ["public/**/*"],
  },
  outputFileTracingIncludes: {
    "/api/one-to-one-intake": ["./public/ebook.pdf"],
  },

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/co-living",
        destination: "/coliving",
        permanent: true,
      },
      {
        source: "/stay-packages",
        destination: "/rates",
        permanent: true,
      },
      {
        source: "/retreats/embodied-vision-lab",
        destination: "/embodied-vision-lab",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
