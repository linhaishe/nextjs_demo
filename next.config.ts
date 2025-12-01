import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* allows for significantly faster compile times across restarts 能在每次重启后显著加快编译速度 */
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
  reactCompiler: true,
};

export default nextConfig;
