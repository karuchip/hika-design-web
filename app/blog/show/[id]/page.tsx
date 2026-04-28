import type { Metadata } from "next";
import BlogDetailClient from "./BlogDetailClient";
import { fetchOnePost } from "@/src/fetchOnePost";


// 画面表示時にすぐにmetaデーターを取得
export async function generateMetadata({params}:{params: Promise<{ id: string }>}) : Promise<Metadata> {
  const resolvedParams = await params;
  const {data: post} = await fetchOnePost(resolvedParams.id);

  const title = post?.title ?? "Hika Dev + Design";
  const description = "UI/UXやフロントエンド開発の学習記録をまとめています。"

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://hika-design.com/blog/show/${resolvedParams.id}`,
      images: [
        {
          url: "https://hika-design.com/ogp.png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://hika-design.com/opg.png"]
    }
  }
}

// ページ表示用
const BlogDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {

  const resolvedParams = await params;

  return <BlogDetailClient params={resolvedParams} />;
};

export default BlogDetailPage;
