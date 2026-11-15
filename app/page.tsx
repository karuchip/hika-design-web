import type { Metadata } from "next";
import HomeClient from "./HomeClient";
import { fetchPostLatest } from "@/src/fetchPostsLatest";

export const metadata: Metadata = {
  title: "未経験からフロントエンド・UIデザインで仕事を得るまで",
};

export default async function Page() {

  const { data: postLatest, error, status } = await fetchPostLatest();

    if (status === 404) {
      return <h3>Posts not found</h3>;
    }

    if (error) {
      return <h3>Error: {error.message}</h3>;
    }

    if (!postLatest) {
      return <h3>Posts not found</h3>;
    }

  return <HomeClient posts={postLatest}/>;
}
