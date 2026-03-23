export type PostListType = {
  id: string;
  created_at: Date;
  title: string;
  topImage: string;
  category: "UI/UX" | "フロントエンド";
  published: boolean;
}
