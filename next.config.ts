import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // <--- EZ KRITIKUS A GITHUB PAGES-HEZ!
  
  images: {
    unoptimized: true, // <--- EZ IS KÖTELEZŐ (Szerver hiányában)
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
      // Ezeket is hozzáadtam, mert szerepeltek a korábbi kódokban:
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
  // Ha a weboldalad címe NEM "username.github.io", hanem "username.github.io/repo-nev",
  // akkor vedd ki a kommentet az alábbi sor elől és írd át a repo nevedre:
  // basePath: "/repo-nev",
};

export default nextConfig;