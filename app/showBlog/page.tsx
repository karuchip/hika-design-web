"use client"
import { supabase } from "@/src/lib/supabase"
import { useEffect, useState } from "react"
import {PostType} from "@/src/type/postsType"
import { BlockType } from "@/src/type/postTypeBlocks"

const ShowBlog = () => {

  const [posts, setPosts] = useState<PostType[]>([])

  useEffect(()=> {
    const getPosts = async() => {
      const {data, error} = await supabase
        .from('posts')
        .select(`*`)

        console.log({ data, error })

        if(error) {
          console.error(error)
        } else {
          setPosts(data)
          console.log(data)
          console.log(data.length)
        }
      }
    getPosts()
  }, [])


  if(posts){
    return(
      <>

        <div className="pt-30">
          {posts.map(post => (
            <div key={post.id}>
              <p>{post.id}</p>
              <p>{new Date(post.created_at).toLocaleString()}</p>
              {post.blocks.map((block:BlockType) => (
                <div key={block.id}>
                  <p>{JSON.stringify(block)}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </>
    )
  }
}

export default ShowBlog
