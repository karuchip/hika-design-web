"use client"

import Image from "next/image"
import Link from "next/link";
import {CategoryColors} from "@/src/stylecss/categoryColors"
import Loading from "../components/common/loading";
import { UsePost } from "@/src/hooks/usePost";
import Breadcrumb from "../components/common/breadcrumb";



const BlogClient = () => {

  // カスタムフックの呼び出し
  const {posts, loading, error} = UsePost();

  if (loading) {
    return<Loading/>
  }

  if (error) {
    return(
      <h3>Error: {error}</h3>
    )
  }

  if(!posts) {
    return(
      <h3>Posts not found</h3>
    )
  }

  return(
    <>
      <div className="pt-30 bg-[#FCFCFC] pb-30">

        {/* パンくずリスト */}
        <Breadcrumb
        items={[
          {label: "Home", href: "/"},
          {label: "Blog"},
        ]}
        />

        <h1 className="w-fit mx-auto mb-5 text-[36px] md:text-[48px]">Blog</h1>

        {/* grid-cols-1 (スマホ) / md:grid-cols-2 (タブレット) / lg:grid-cols-3 (PC) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
          {posts
            .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
            .map(post => (

              <Link key={post.id} href={`/blog/${post.id}`}>

                <div className="w-[300px]">
                  <p className="w-[300px] text-[#586869] text-right my-[5px]">{new Date(post.created_at).toLocaleDateString()}</p>
                  <div className="relative">
                    <p className={`w-fit px-[40px] py-[3px] absolute z-[1] text-[#ffffff] rounded-lg text-[18px] ${CategoryColors[post.category] || CategoryColors.default}`}>
                      {post.category}
                    </p>

                    <div className="relative w-[300px] z-[0] h-[180px] aspect-video overflow-hidden rounded-lg">
                      <Image
                        src={post.topImage}
                        alt="ブログトップ画像"
                        width={300}
                        height={180}
                        className="object-cover object-center"
                        />
                    </div>
                  </div>

                  <p className="my-[10px] w-[300px] text-[#586869] text-[18px] font-bold">{post.title}</p>
                </div>

              </Link>

          ))}
        </div>
      </div>
    </>
  )
}

export default BlogClient
