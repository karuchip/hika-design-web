import type { Metadata } from "next";
import BlogDetailClient from "./BlogDetailClient";

export const metadata: Metadata = {
  title: "Blog詳細",
  description: "UI/UXやフロントエンド開発の学習記録をまとめています。",
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
