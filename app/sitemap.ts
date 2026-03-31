import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://hika-design.com",
      lastModified: new Date(),
    },
    {
      url: "https://hika-design.com/blog/show",
      lastModified: new Date(),
    },
    {
      url: "https://hika-design.com/contact",
      lastModified: new Date(),
    },
    {
      url: "https://hika-design.com/privacy",
      lastModified: new Date(),
    },
  ];
}
