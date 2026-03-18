"use client"

import BlogDetailFormat from "@/app/components/blog/blogDetailFormat";
import { blogInputAtom } from "@/src/jotai/bloginputAtom";
import { supabase } from "@/src/lib/supabase";
import { useAtom } from "jotai";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js"
import Loading from "@/app/components/common/loading";

const BlogPreviewClient = () => {

  const router = useRouter();

  // jotai
  const [inputAtom, setInputAtom] = useAtom(blogInputAtom);

  // ログイン情報取得
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


  // プレビュー表示用コンポーネントに渡すデータを作成
  if (!inputAtom?.id) {
    return null;
  }
  const data = {
    id: inputAtom.id,
    category: inputAtom.category,
    title: inputAtom.title || "",
    topImage: inputAtom.topImage,
    blocks: inputAtom.blocks || [],
    published: inputAtom.published || false,
    created_at: new Date(),
    updated_at: new Date(),
    userId: crypto.randomUUID() as `${string}-${string}-${string}-${string}-${string}`,
  }

  // 投稿ボタン押下時の処理
  const onSubmit = async(type: "post" | "save") => {
    if (!inputAtom) return

    if (!user) {
      alert("ログインしてください")
      return
    }

    const insertData = {
      category: inputAtom.category,
      title: inputAtom.title || "",
      topImage: inputAtom.topImage,
      blocks: inputAtom.blocks || [],
      published: type === "post",
      user_id: user.id
    }

    const { error } = await supabase
      .from("posts")
      .insert([insertData])

    if ( error ) {
      console.error("insert error:", error);
      return;
    }

    if (!error) {
      alert(type === "post" ? "投稿完了" : "下書き保存完了!")
      setInputAtom(null) // 投稿 or 保存後にリセット
      router.push("/blog/show") // 一覧へ
    }

  }

  if(loading) return<Loading/>

  return(
    <>
      <div className="pt-30 bg-[#ECECEC]">
        <h1 className="bg-[#586869] px-[20px] py-[10px] text-[#ffffff] text-[28px] fixed top-[140px] font-bold">プレビュー画面</h1>
        <BlogDetailFormat
          onePost={data}/>

        <button type="submit" onClick={()=>onSubmit("post")}>投稿する</button>
        <button type="button" onClick={()=>onSubmit("save")}>保存する</button>
        <Link href="/blog/create">戻る</Link>
      </div>
    </>
  )
}

export default BlogPreviewClient
