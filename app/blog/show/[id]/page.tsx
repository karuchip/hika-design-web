import type { Metadata } from "next";
import BlogDetailClient from "./BlogDetailClient";

export const metadata: Metadata = {
  title: "Blog詳細",
  description: "UI/UXやフロントエンド開発の学習記録をまとめています。",
  openGraph: {
    title: "Blog",
    description: "UI/UXやフロントエンド開発の学習記録をまとめています。",
    images: [
      {
        url: "https://hika-design.com/ogp.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://hika-design.com/ogp.png"],
  },
};

const BlogDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {

  const resolvedParams = await params;

  return <BlogDetailClient params={resolvedParams} />;
};

export default BlogDetailPage;
