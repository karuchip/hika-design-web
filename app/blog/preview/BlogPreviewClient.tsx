"use client"

import BlogDetailFormat from "@/app/components/blog/blogDetailFormat";
import { blogInputAtom } from "@/src/jotai/bloginputAtom";
import { useAtomValue } from "jotai";

const BlogPreviewClient = () => {

  const inputAtom = useAtomValue(blogInputAtom);

  if (!inputAtom?.id) {
    return null;
  }

  // プレビュー画面に渡すデータ作成
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

  const onSubmit = () => {
    console.log("投稿する");
  }

  return(
    <>
      <div className="pt-30 bg-[#ECECEC]">
        <h1 className="bg-[#586869] px-[20px] py-[10px] text-[#ffffff] text-[28px] fixed top-[140px] font-bold">プレビュー画面</h1>
        <BlogDetailFormat
          onePost={data}/>

        <button type="submit" onClick={()=>onSubmit()}>投稿する</button>
      </div>
    </>
  )
}

export default BlogPreviewClient
