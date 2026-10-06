import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Locale root layouts live under app/[lang], so unmatched URLs need a global 404 page (app/global-not-found.tsx).
  experimental: {
    globalNotFound: true,
  },
};

export default nextConfig;
