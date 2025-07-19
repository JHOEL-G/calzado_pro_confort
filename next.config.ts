import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
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
  ],
}
};

export default nextConfig;
