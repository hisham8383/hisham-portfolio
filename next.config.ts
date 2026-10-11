import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  async redirects() {
    return [{ source: "/work/compliance-reporting", destination: "/work/esra", permanent: true }];
  },
};

export default nextConfig;
