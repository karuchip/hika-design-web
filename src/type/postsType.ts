import { UUID } from "crypto";
import { BlockType } from "./postTypeBlocks";

export type PostType = {
  id: number;
  blocks: BlockType[];
  published: boolean;
  created_at: Date;
  updated_at: Date;
  userId: UUID;
  title: string;
  topImage: string;
  category: "UI/UX" | "フロントエンド";
}
