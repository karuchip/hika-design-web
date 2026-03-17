"use client"

import { BlockType } from "@/src/type/postTypeBlocks";
import { useState } from "react";
import BlockEditor from "@/app/components/blog/blockEditor"

const BlogCreateClient = () => {

  const [title, setTitle] = useState("");
  const [topImage, setTopImage] = useState("");
  const [blocks, setBlocks] = useState<Partial<BlockType>[]>([]);


  // (追加) block要素追加
  const addBlock = (type: BlockType["type"]) => {
    const newBlock: Partial<BlockType> = {
      id: crypto.randomUUID(),
      type,
      order: blocks.length,
      ...(type === "heading" && {level: 1, content: ""}),
      ...(type === "text" && {content: ""}),
      ...(type === "image" && {src: "", alt: ""}),
      ...(type === "code" && {code: "", showLineNumbers: false}),
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

  // (更新) タイトル・トップ画像更新処理
  const updateTitle = (title:string) => {
    setTitle(title);
  }
  const updateTopImage = (src:string) => {
    setTopImage(src);
  }

  // (更新) block更新処理
  const updateBlock = (index: number, newData:Partial<BlockType>) => {
    const newBlocks = [...blocks];
    newBlocks[index] = {...newBlocks[index], ...newData};
    setBlocks(newBlocks);
  }

  // 最終button処理
  const gotoPreview = () => {
    console.log(blocks);
  }


  return(
    <>
      <div className="pt-30 bg-[#FCFCFC]">
        {/* タイトル・トップイメージ追加 */}
        <div>
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
