"use client"

import { BlockType } from "@/src/type/postTypeBlocks";
import { useEffect, useState } from "react";
import BlockEditor from "@/app/components/blog/blockEditor"
import { useAtom } from "jotai";
import { blogInputAtom } from "@/src/jotai/bloginputAtom";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js"
import { supabase } from "@/src/lib/supabase";
import { CategoryColors } from "@/src/stylecss/categoryColors";

type CategoryType = "UI/UX" | "フロントエンド";

type AddBlockType = "h1" | "h2" | "h3" | "text" | "image" | "code";

const BlogCreateClient = () => {

  // router
  const router = useRouter();

  // ログイン情報
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        console.log("ユーザーがいません")
        router.push("/user/login")
        return
      }
      setUser(user)
      setLoading(false)
    }
    getUser()
  }, [router])


  // useState
  const [title, setTitle] = useState("");
  const [topImage, setTopImage] = useState("");
  const [category, setCategory] = useState<CategoryType>("UI/UX");
  const [blocks, setBlocks] = useState<BlockType[]>([]);

  // jotai
  const [inputAtom, setInputAtom] = useAtom(blogInputAtom);

  // jotaiとuseEffectの同期処理
  useEffect(() => {
    const stateSetter = () => {
      if(!inputAtom?.id) return
      setTitle(prev => prev || inputAtom.title)
      setTopImage(prev => prev || inputAtom.topImage)
      setCategory(prev => prev || inputAtom.category)
      setBlocks(prev => prev || inputAtom.blocks)
    }
    stateSetter()

  },[inputAtom])

  // (追加) block要素追加
  const addBlock = (type:AddBlockType | null) => {
    let newBlock: BlockType

    if (type === "h1") {
      newBlock = {
        id: crypto.randomUUID(),
        type: "heading",
        level: 1,
        content: "",
        order: blocks.length,
      }
    } else if (type === "h2") {
      newBlock = {
        id: crypto.randomUUID(),
        type: "heading",
        level: 2,
        content: "",
        order: blocks.length,
      }
    } else if (type === "h3") {
      newBlock = {
        id: crypto.randomUUID(),
        type: "heading",
        level: 3,
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

  if (loading) return <p>Loading...</p>


  return(
    <div className="pt-30">
      <h1 className="w-fit my-10 text-[26px] font-bold text-[#586869] ml-[40px]">ブログ作成画面</h1>
      <div className="bg-[#ffffff] flex justify-center gap-30">


        {/* メニュータブ */}
        <div className="w-[220px] sticky top-[100px] h-fit flex-none w-64 bg-[#EBF0F1] p-5">
          <div className="mb-5">
            <p className="text-[18px] font-bold mb-2 text-[#586869]">カテゴリ選択</p>
            <select
            value={category}
            onChange={(e)=>updateCategory(e.target.value as CategoryType)}
            className="p-3 bg-[#F7F7F7] w-[180px] text-[20px]"
            >
              <option value={"UI/UX"}>UI/UX</option>
              <option value={"フロントエンド"}>フロントエンド</option>
            </select>
          </div>

          {/* 区切り線 */}
          <div className="w-[180px] h-[1px] bg-[#C3C3C3] mb-5">
            <span></span>
          </div>

          {/* blocks追加ボタン */}
          <div>

            <div className="mb-5">
              <p className="text-[18px] font-bold mb-2 text-[#586869]">フォント選択</p>
              <button className="block text-[22px] md:text-[30px] mb-3 font-bold" onClick={() => addBlock("h1")}>+ 見出し1</button>
              <button className="block text-[18px] md:text-[22px] mb-3 font-bold" onClick={() => addBlock("h2")}>+ 見出し2</button>
              <button className="block  text-[16px] md:text-[18px] mb-5 font-bold" onClick={() => addBlock("h3")}>+ 見出し3</button>
              <button className="block  text-[16px] md:text-[18px] mb-5 border border-[#C3C3C3] w-[180px] py-1 px-3 text-left bg-[#ffffff]" onClick={() => addBlock("text")}>+ テキスト</button>
            </div>

            {/* 区切り線 */}
            <div className="w-[180px] h-[1px] bg-[#C3C3C3] mb-5">
              <span></span>
            </div>

            <div>
              <button  className="block text-[20px] mb-3" onClick={() => addBlock("image")}>+ 画像</button>
              <button  className="block text-[20px] mb-5" onClick={() => addBlock("code")}>+ コード</button>
            </div>

            {/* 区切り線 */}
            <div className="w-[180px] h-[1px] bg-[#C3C3C3] mb-5">
              <span></span>
            </div>

          </div>
        </div>


        {/* blocksのUI表示 */}
        <div className="w-max-[330px] md:max-w-[1000px] md:min-w-[700px] bg-[#ffffff] pb-[16px] mb:py-[32px]">

          <label>
            <h3>トップ画像のURL直入力(一時的)</h3>
            <input
              value={topImage}
              onChange={(e)=>updateTopImage(e.target.value)}
              placeholder="画像アップロード先URL"
              className="bg-[#F7F7F7] p-3 mb-[30px] w-full"
            />
          </label>

          {/* ラベル */}
          <div className="flex justify-between mb-[16px] items-end">
            {/* カテゴリー */}
            <p className={`w-fit px-[40px] py-[3px] text-[#ffffff] text-[18px] ${CategoryColors[category] || CategoryColors.default}`}>
              {category}
            </p>
            {/* 日付 */}
            <p className="w-fit text-[16px] md:text-[18px]">{new Date().toLocaleDateString()}</p>
          </div>

          {/* タイトル */}
          <label>
            <input
              value={title}
              onChange={(e)=>updateTitle(e.target.value)}
              className="bg-[#F7F7F7] p-3 w-full text-[32px] md:text-[40px] font-bold mb-[40px] break-words"
              placeholder="タイトル入力"
            />
          </label>

          {/* 区切り棒 */}
          <div className="w-full h-[7px] bg-[#FCFCFC]">
            <span></span>
          </div>


          <div>
            {blocks.length === 0 && (
              <>
                <p>左のタブから項目を追加してください。</p>
              </>
            )}
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

        </div>


      </div>

      <div className="flex justify-center">
        <button
          onClick={() => gotoPreview()}
          className="w-fit my-10 py-2 px-8 bg-[#586869] text-[#ffffff] font-bold text-[20px]"
        >
          プレビューへ
        </button>
      </div>
    </div>

  )
}

export default BlogCreateClient;
