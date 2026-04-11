import { UUID } from "crypto";
import { BlockType } from "./postTypeBlocks";

export type PostType = {
  id: string;
  blocks: BlockType[];
  published: boolean;
  created_at: Date;
  updated_at: Date;
  userId: UUID;
  title: string;
  topImage: string;
  category: "UI/UX" | "フロントエンド" | "SEO" | "雑記";
}
