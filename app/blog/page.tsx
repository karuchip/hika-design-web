import type { Metadata } from "next";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  title: "Blog",
  description: "UI/UXやフロントエンド開発の学習記録をまとめています。",
};

export default function Page() {
  return <BlogClient/>;
}
