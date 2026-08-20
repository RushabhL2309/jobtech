import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
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
