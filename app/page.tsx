import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "UI/UX未経験からフロントエンド・UIデザインで仕事を得るまで",
};

export default function Page() {
  return <HomeClient/>;
}
