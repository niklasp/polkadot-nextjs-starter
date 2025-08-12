import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "github.com",
        port: "",
        pathname: "/scio-labs/use-inkathon/raw/main/assets/wallet-logos/**",
        search: "",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        port: "",
        pathname: "/dedotdev/typink/refs/heads/main/assets/networks/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
