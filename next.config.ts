import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'covers.openlibrary.org'
      },
      { protocol: 'https', 
        hostname: "sz4daikm1c5kqy9p.public.blob.vercel-storage.com" 
      }
    ]
  }
};

export default nextConfig;
