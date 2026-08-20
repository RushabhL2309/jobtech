import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 828, 1080, 1920],
    imageSizes: [256, 384],
  },
  async redirects() {
    return [
      { source: "/about", destination: "/about-us", permanent: true },
      { source: "/contact", destination: "/contact-us", permanent: true },
      { source: "/rooms", destination: "/careers", permanent: true },
      { source: "/amenities", destination: "/services", permanent: true },
      { source: "/gallery", destination: "/clients", permanent: true },
      { source: "/dining-events", destination: "/about-us", permanent: true },
      { source: "/why-jobtech", destination: "/about-us", permanent: true },
      { source: "/testimonials", destination: "/clients", permanent: true },
    ];
  },
};

export default nextConfig;
