import { atom } from "jotai";
import { BlockType } from "../type/postTypeBlocks";

type blogInputAtomType = {
  id: string;
  title: string;
  topImage: string;
  blocks: BlockType[];
  published: boolean;
  category: "UI/UX" | "フロントエンド";
}
export const blogInputAtom = atom<blogInputAtomType | null>(null);
