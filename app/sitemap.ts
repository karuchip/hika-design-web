import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://hika-design.com",
      lastModified: new Date(),
    },
    {
      url: "https://hika-design.com/showblogs",
      lastModified: new Date(),
    },
  ];
}
