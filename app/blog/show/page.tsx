import type { Metadata } from "next";
import BlogClient from "./BlogClient";
import { fetchPosts } from "@/src/fetchPosts";

export const metadata: Metadata = {
  title: "Blog",
  description: "UI/UXやフロントエンド開発の学習記録をまとめています。",
};

export default async function Page() {

  const { data, error, status } = await fetchPosts();

  if (error) {
    if (status === 404) {
      return <h3>Posts not found</h3>;
    }

    return <h3>Error: {error.message}</h3>;
  }

  if (!data) {
    return <h3>Posts not found</h3>;
  }

  return <BlogClient posts={data}/>;
}
