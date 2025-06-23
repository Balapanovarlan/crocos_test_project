import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 images: {
  remotePatterns: [new URL ('http://localhost:8022/**')]
 },
};

export default nextConfig;
