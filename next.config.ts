import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["avatars.githubusercontent.com"], // ✅ 허용할 도메인 등록
  },
};

export default nextConfig;
