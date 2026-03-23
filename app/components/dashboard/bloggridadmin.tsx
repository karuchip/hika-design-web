"use client"

import { PostListType } from "@/src/type/postListType"
import Link from "next/link"
import Image from "next/image"
import { CategoryColors } from "@/src/stylecss/categoryColors"
import { supabase } from "@/src/lib/supabase"
import { useState } from "react"
import { useRouter } from "next/navigation"


const PostGridAdmin = ({posts}: {posts: PostListType[]}) => {

  const router = useRouter();
  const [postList, setPostList] = useState(posts);

  const sortedItem = [...postList]
    .sort((a, b) =>new Date(b.created_at).getTime() - new Date(a.created_at).getTime());


  // 編集
  const handleEdit = async(postId: string) => {
    router.push(`/blog/edit/${postId}`);
  }


  //削除
  const handleDelete = async(postId: string, postTitle: string) => {

    if (!confirm(`タイトル「${postTitle}」を本当に削除しますか？`)) return

    const {error} = await supabase
      .from("posts")
      .delete()
      .eq("id", postId)

    if(error) {
      console.error(error);
      alert("削除に失敗しました");
      return
    }
    setPostList(prev => prev.filter(post => post.id !== postId))
    alert("削除しました")
  }

  return (
    <>
      {/* grid-cols-1 (スマホ) / md:grid-cols-2 (タブレット) / lg:grid-cols-3 (PC) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-items-center">
        {sortedItem
          .map(item => (

            <div key={item.id}>

              <Link href={`/blog/show/${item.id}`}>

                <div className="w-[300px]">
                  <p className="w-[300px] text-[#586869] text-right my-[5px]">{new Date(item.created_at).toLocaleDateString()}</p>
                  <div className="relative">
                    <p className={`w-fit px-[40px] py-[3px] absolute z-[1] text-[#ffffff] rounded-lg text-[18px] ${CategoryColors[item.category] || CategoryColors.default}`}>
                      {item.category}
                    </p>

                    <div className="relative w-[300px] z-[0] h-[180px] aspect-video overflow-hidden rounded-lg">
                      <Image
                        src={item.topImage}
                        alt="ブログトップ画像"
                        fill
                        className="object-cover object-center"
                        />
                    </div>
                  </div>

                  <p className="my-[10px] w-[300px] text-[#586869] text-[18px] font-bold break-words">{item.title}</p>
                </div>

              </Link>

              <div className="flex gap-10">
                <p className="text-[#AA3060]">{item.published ? "公開中" : "非公開"}</p>
                <button onClick={()=>handleEdit(item.id)}>編集</button>
                <button onClick={()=>handleDelete(item.id, item.title)}>削除</button>
              </div>
            </div>


        ))}
      </div>
    </>
  )
}

export default PostGridAdmin
