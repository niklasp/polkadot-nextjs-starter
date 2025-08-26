import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
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
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        port: "",
        pathname: "/Koniverse/SubWallet-ChainList/**",
        search: "",
      },
      {
        protocol: "https",
        hostname: "assethub-paseo.subscan.io",
        port: "",
        search: "",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        port: "",
        pathname: "/dedotdev/typink/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
