"use client"

import BlogForm from "@/app/components/blog/blogForm";
import Loading from "@/app/components/common/loading";
import { usePostOne } from "@/src/hooks/usePostOne";

const EditClient = ({ params }: { params: { id: string } }) => {

  const id = params.id;
  const {onePost, loading, error} = usePostOne(id);

  if(loading)return <Loading/>
  if(error) return <h3>error: {error}</h3>

  if (!onePost) return <p>投稿を取得できませんでした。</p>

  if(onePost){
    return (
      <BlogForm
        initialId={onePost?.id}
        initialTitle={onePost?.title}
        initialTopImage={onePost?.topImage}
        initialCategory={onePost?.category}
        initialBlocks={onePost?.blocks}
        mode={"edit"}
      />
    )
  }
}

export default EditClient
