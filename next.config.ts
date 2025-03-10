import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config, { isServer }) => {
    // Ne pas appliquer cette configuration côté serveur
    if (!isServer) {
      config.module.rules.push({
        test: /\.worker\.js$/,
        loader: "worker-loader",
        options: {
          filename: "static/chunks/[id].worker.js",
          publicPath: "/_next/",
        },
      });
    }
    return config;
  },
};

export default nextConfig;
