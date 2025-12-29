import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', 
  basePath: process.env.NODE_ENV === 'production' ? "/HaloMotion-web" : "", 
  
  images: {
    unoptimized: true, 
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.pixabay.com',
      },
      {
        protocol: 'https',
        hostname: 'assets.mixkit.co',
      },
      
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'external-content.duckduckgo.com',
      }
    ],
  },

};

export default nextConfig;