import type { MetadataRoute } from "next";
import { industries, insights, locations, services } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://jobtech.in";
  const now = new Date();
  const paths = [
    "",
    "/about-us",
    "/services",
    "/industries",
    "/clients",
    "/locations",
    "/insights",
    "/careers",
    "/contact-us",
    ...services.map((s) => s.href),
    ...industries.map((s) => s.href),
    ...locations.map((s) => s.href),
    ...insights.map((s) => `/insights/${s.slug}`),
  ];
  return paths.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
