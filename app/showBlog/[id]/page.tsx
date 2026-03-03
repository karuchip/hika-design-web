"use client"

import Loading from "@/app/components/common/loading";
import {usePostOne} from "@/src/hooks/usePostOne"
import {use} from "react"

const BlogDetailPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  const {onePost, loading, error} = usePostOne(id);

  if(loading) {
    return<Loading/>
  }

  if (error) {
    return (
      <h3>Error: {error}</h3>
      /* optionally a retry button */
    )
  }

  if (!onePost){
    return (
      <h3>Post not found</h3>
    )
  }

  return (
    <div>
      <div className="pt-32"></div>
      <p>Blog id: {id}</p>
      <p>{onePost?.title}</p>
    </div>
  );
}

export default BlogDetailPage;
