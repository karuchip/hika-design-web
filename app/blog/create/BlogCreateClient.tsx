"use client"

import { BlockType } from "@/src/type/postTypeBlocks";
import { useState } from "react";
import BlockEditor from "@/app/components/blog/blockEditor"
import { useSetAtom } from "jotai";
import { blogInputAtom } from "@/src/jotai/bloginputAtom";
import { useRouter } from "next/navigation";

type CategoryType = "UI/UX" | "フロントエンド";

const BlogCreateClient = () => {

  // router
  const router = useRouter();

  // useState
  const [title, setTitle] = useState("");
  const [topImage, setTopImage] = useState("");
  const [category, setCategory] = useState<CategoryType>("UI/UX");
  const [blocks, setBlocks] = useState<BlockType[]>([]);

  // jotai
  const setInputAtom = useSetAtom(blogInputAtom);

  // (追加) block要素追加
  const addBlock = (type: BlockType["type"]) => {
    let newBlock: BlockType

    if (type === "heading") {
      newBlock = {
        id: crypto.randomUUID(),
        type: "heading",
        level: 1,
        content: "",
        order: blocks.length,
      }
    } else if (type === "text") {
      newBlock = {
        id: crypto.randomUUID(),
        type: "text",
        content: "",
        order: blocks.length,
      }
    } else if (type === "image") {
      newBlock = {
        id: crypto.randomUUID(),
        type: "image",
        src: "",
        alt: "",
        order: blocks.length,
      }
    } else {
      newBlock = {
        id: crypto.randomUUID(),
        type: "code",
        code: "",
        showLineNumbers: false,
        order: blocks.length,
      }
    }
    setBlocks([...blocks, newBlock])
  }

  // (追加) block要素削除
  const deleteBlock = (index:number) => {

    const newBlocks = blocks
      .filter((_, i) => i !== index)
      .map((block, i) => ({
        ...block,
        order: i
      }))
    setBlocks(newBlocks);
  }

  // (更新) カテゴリー・タイトル・トップ画像更新処理
  const updateCategory = (category: CategoryType) => {
    setCategory(category);
  }
  const updateTitle = (title:string) => {
    setTitle(title);
  }
  const updateTopImage = (src:string) => {
    setTopImage(src);
  }

  // (更新) block更新処理
  const updateBlock = (index: number, newData:Partial<BlockType>) => {
    const newBlocks = [...blocks];
    newBlocks[index] = {
      ...newBlocks[index],
      ...newData
    } as BlockType;
    setBlocks(newBlocks);
  }

  // 最終button処理
  const gotoPreview = () => {

    const id = crypto.randomUUID();
    // jotaiに追加
    setInputAtom({
      id,
      title,
      topImage,
      blocks,
      published: false,
      category
    });

    router.push(`/blog/preview`)
  }


  return(
    <>
      <div className="pt-30 bg-[#FCFCFC]">
        {/* タイトル・トップイメージ追加 */}
        <div>
          <label>
            <h3>カテゴリー</h3>
            <select
            value={category}
            onChange={(e)=>updateCategory(e.target.value as CategoryType)}
          >
            <option value={"UI/UX"}>UI/UX</option>
            <option value={"フロントエンド"}>フロントエンド</option>
          </select>
          </label>
          <label>
            <h3>タイトル</h3>
            <input
              value={title}
              onChange={(e)=>updateTitle(e.target.value)}
            />
          </label>
          <label>
            <h3>トップ画像のURL直入力(一時的)</h3>
            <input
              value={topImage}
              onChange={(e)=>updateTopImage(e.target.value)}
            />
          </label>
        </div>

        {/* blocks追加ボタン */}
        <div>
          <button onClick={() => addBlock("heading")}>+見出し</button>
          <button onClick={() => addBlock("text")}>+テキスト</button>
          <button onClick={() => addBlock("image")}>+画像</button>
          <button onClick={() => addBlock("code")}>+コード</button>
        </div>


        {/* blocksのUI表示 */}
        <div>
          {blocks.map((block, index) => (
            <BlockEditor
              key={block.id}
              block={block as BlockType}
              index={index}
              updateBlock={updateBlock}
              deleteBlock={deleteBlock}
            />
          ))}

        </div>

        <button onClick={() => gotoPreview()}>プレビューへ</button>
      </div>
    </>

  )
}

export default BlogCreateClient;
