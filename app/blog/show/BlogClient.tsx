"use client"

import Breadcrumb from  "@/app/components/common/breadcrumb"
import Bloggrid from "@/app/components/blog/bloggrid"
import { PostListType } from "@/src/type/postListType";


const BlogClient = ({posts}: {posts: PostListType[]}) => {

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
