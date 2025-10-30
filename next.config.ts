import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // ✅ Allow LAN / local origins (replace IP if yours is different)
  allowedDevOrigins: [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://192.168.1.106:3000",
    "local-origin.dev",
    "*.local-origin.dev", // wildcard for local subdomains
  ],

  // ✅ Updated image configuration (replaces deprecated `images.domains`)
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
      },
      {
        protocol: "http",
        hostname: "192.168.1.106",
        port: "5000",
      },
    ],
  },
};

export default nextConfig;
