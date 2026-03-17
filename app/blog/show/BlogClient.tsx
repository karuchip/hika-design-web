"use client"

import Loading from "@/app/components/common/loading";
import Breadcrumb from  "@/app/components/common/breadcrumb"
import Bloggrid from "@/app/components/blog/bloggrid"
import { UsePost } from "@/src/hooks/usePost";




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

        <Bloggrid posts={posts}/>

      </div>
    </>
  )
}

export default BlogClient
