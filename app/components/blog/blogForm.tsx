"use client"

import { CategoryColors } from "@/src/stylecss/categoryColors";
import { BlockType } from "@/src/type/postTypeBlocks";
import { useEffect, useRef, useState } from "react";
import BlockEditor from "./blockEditor";
import { useAtom } from "jotai";
import { blogInputAtom } from "@/src/jotai/bloginputAtom";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/src/lib/supabase";
import Loading from "../common/loading";

type Props = {
  initialId?: string;
  initialTitle?: string;
  initialTopImage?: string;
  initialCategory?: "UI/UX" | "フロントエンド" | "SEO" | "雑記"
  initialBlocks?:BlockType[];
  mode: "create" | "edit";
}

type CategoryType = "UI/UX" | "フロントエンド" | "SEO" | "雑記";
type AddBlockType = "h1" | "h2" | "h3" | "text" | "image" | "code" | "list";

const BlogForm = ({initialId, initialTitle, initialTopImage, initialCategory, initialBlocks, mode}: Props) => {

  // useState
  const [title, setTitle] = useState(initialTitle || "");
  const [topImage, setTopImage] = useState(initialTopImage || "");
  const [category, setCategory] = useState(initialCategory || "UI/UX");
  const [blocks, setBlocks] = useState<BlockType[]>(initialBlocks || []);
  // テキストボックスがfocusされたかどうか
  const [seletedText, setSelectedText] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null!);

  // router
  const router = useRouter();

  // ログイン情報確認
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


  // jotai
  const [inputAtom, setInputAtom] = useAtom(blogInputAtom);

  // jotaiとuseEffectの同期処理
  useEffect(() => {
    const stateSetter = () => {
      if(!inputAtom?.id) return
      setTitle(inputAtom.title)
      setTopImage(inputAtom.topImage)
      setCategory(inputAtom.category)
      setBlocks(inputAtom.blocks)

    }
    stateSetter()
  },[inputAtom])


  // プレビューボタン押下時の処理
  const handleSubmit = async() => {

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


    if(mode === "create") {
      router.push("/blog/preview?mode=create");
    } else {
      router.push(`/blog/preview?mode=edit&id=${initialId}`)
    }
  }

  //破棄ボタン押下時の処理
  const handleDiscard = () => {
    if (!confirm(`作業内容を破棄してもよろしいですか?（変更内容は保存されません）`)) return
    setInputAtom(null) // 投稿 or 保存後にリセット
    router.push("/blog/show") // 一覧へ
  }


  // (追加) block要素追加
  const addBlock = (type:AddBlockType | null) => {
    let newBlock: BlockType | null = null

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
    } else if (type === "code") {
      newBlock = {
        id: crypto.randomUUID(),
        type: "code",
        code: "",
        showLineNumbers: false,
        order: blocks.length,
      }
    } else if (type === "list") {
      newBlock = {
        id: crypto.randomUUID(),
        type: "list",
        listStyle: "decimal",
        items: [
          {
            id: crypto.randomUUID(),
            text: "",
            order: 1,
          }
        ],
        order: blocks.length,
      }
    }
    if (newBlock) {
      setBlocks([...blocks, newBlock])
    }
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

    if(loading) {
      return<Loading/>
    }

  return(
    <div className="pt-30">
      <h1 className="w-fit my-10 text-[26px] font-bold text-[#586869] ml-[40px]">
        {mode === "create" ? "ブログ作成画面" : "ブログ編集画面"}
      </h1>
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
              <option value={"SEO"}>SEO</option>
              <option value={"雑記"}>雑記</option>
            </select>
          </div>

          {/* 区切り線 */}
          <div className="w-[180px] h-[1px] bg-[#C3C3C3] mb-5">
            <span></span>
          </div>

          {/* blocks追加ボタン */}
          <div>

            <div className="mb-5">
              <p className="text-[18px] font-bold mb-2 text-[#586869]">テキスト選択</p>
              <button className="block text-[22px] md:text-[30px] mb-3 font-bold" onClick={() => addBlock("h1")}>+ 見出し1</button>
              <button className="block text-[18px] md:text-[22px] mb-3 font-bold" onClick={() => addBlock("h2")}>+ 見出し2</button>
              <button className="block  text-[16px] md:text-[18px] mb-5 font-bold" onClick={() => addBlock("h3")}>+ 見出し3</button>

              <div className="w-full p-2 mb-6 bg-indigo-500/10">
                <button className="block  text-[16px] md:text-[18px] mb-3 border border-[#C3C3C3] w-[165px] py-1 px-3 text-left bg-[#ffffff]" onClick={() => addBlock("text")}>+ テキスト</button>

                {seletedText && (
                  <div
                  ref={containerRef}
                  tabIndex={-1}
                    className="bg-[#ffffff] p-3"
                  >
                    <p className="mb-1 text-[14px]">URL追加</p>
                    <input className="w-full border border-indigo-500/50 mb-3 p-1" placeholder="Enter URL..."/>
                    <input className="w-full border border-indigo-500/50 mb-3 p-1" placeholder="Enter 表示名..."/>
                    <div className="flex justify-center">
                      <button
                        className="bg-indigo-500 text-[#ffffff] w-fit px-3 mx-auto"
                      >
                        追加
                      </button>
                    </div>
                  </div>
                )}

              </div>

              <button className="block  text-[16px] md:text-[18px] mb-5 border border-[#C3C3C3] w-[180px] py-1 px-3 text-left bg-[#ffffff]" onClick={() => addBlock("list")}>+ リスト</button>
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
                setSelectedText={setSelectedText}
                containerRef={containerRef}
              />
            ))}
          </div>

        </div>


      </div>

      {/* 破棄ボタン */}

      {/* プレビューボタン */}


      <div className="flex justify-center gap-10 my-20">

        <button
          onClick={handleDiscard}
          className="w-fit my-10 py-2 px-8 bg-[#AA3060] text-[#ffffff] font-bold text-[20px]"
        >
          破棄する
        </button>

        <button
          onClick={handleSubmit}
          className="w-fit my-10 py-2 px-8 bg-[#586869] text-[#ffffff] font-bold text-[20px]"
        >
          プレビュー画面へ
        </button>
      </div>

    </div>

  )
}

export default BlogForm
