import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure Turbopack uses this project folder as the root (silences warning about
  // multiple lockfiles on the machine selecting a higher-level package-lock.json).
  turbopack: {
    root: '.'
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
