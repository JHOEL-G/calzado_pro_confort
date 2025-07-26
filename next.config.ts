import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        pathname: "/f/**",
      },
      {
        protocol: "https",
        hostname: "u0e2l38gdo.ufs.sh",
        pathname: "/f/**",
      },
      {
        protocol: "https",
        hostname: "ejemplo.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
