import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure Turbopack uses this project folder as the root (silences warning about
  // multiple lockfiles on the machine selecting a higher-level package-lock.json).
  turbopack: {
    root: '.'
  }
};

export default nextConfig;
