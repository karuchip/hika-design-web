import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumb from "@/app/components/common/breadcrumb";
import BlogDetailFormat from "@/app/components/blog/blogDetailFormat";
import { fetchOnePost } from "@/src/fetchOnePost";
import ViewCount from "@/app/components/blog/viewCount";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const { data: post } = await fetchOnePost(id);

  const title = post?.title ?? "Hika Dev + Design";
  const description = "UI/UXやフロントエンド開発の学習記録をまとめています。";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://hika-design.com/blog/show/${id}`,
      images: ["https://hika-design.com/ogp.png"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://hika-design.com/ogp.png"],
    },
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { id } = await params;
  const { data: post, error, status } = await fetchOnePost(id);

  if (status === 404 || (!error && !post)) {
    notFound();
  }

  if (error) {
    throw new Error(error.message);
  }

  if (!post) {
    notFound();
  }

  // 閲覧数の加算は副作用なので、今までどおりクライアント側から実行する
  return (
    <>
      <ViewCount id={id} />

      <div className="pt-30 bg-[#FCFCFC]">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog/show" },
            { label: post.title },
          ]}
        />
        <BlogDetailFormat onePost={post} />
      </div>
    </>
  );
}
