"use client"

import { BlockType } from "@/src/type/postTypeBlocks"
import { usePost } from "@/src/hooks/usePost"
import Loading from "../components/common/loading";
import Image from "next/image"

const ShowBlog = () => {

  const result = usePost();
  console.log(result);
  const {posts, loading} = result;

  if(loading) {
    return<Loading/>
  }

  if(posts){
    return(
      <>
        <div className="py-30 px-[20px]">

          <h1 className="w-fit mx-auto mb-5 text-[36px] md:text-[48px]">Blog</h1>

          {/* grid-cols-1 (スマホ) / md:grid-cols-2 (タブレット) / lg:grid-cols-3 (PC) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
            {posts.map(post => (

              <div key={post.id} className="w-[300px]">

                <p className="w-[300px] text-[#586869] text-right my-[5px]">{new Date(post.created_at).toLocaleDateString()}</p>
                <div className="relative">
                  <p className="w-fit px-[40px] py-[3px] absolute z-[1] text-[#ffffff] bg-[#B47F90] rounded-lg text-[18px]">{post.category}</p>

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

                {/* {post.blocks.map((block:BlockType) => (
                  <div key={block.id}>
                    <p>{JSON.stringify(block)}</p>
                  </div>
                ))} */}
              </div>


            ))}
          </div>
        </div>
      </>
    )
  }
}

export default ShowBlog
