"use client"

import Loading from "@/app/components/common/loading";
import {usePostOne} from "@/src/hooks/usePostOne"
import Breadcrumb from "@/app/components/common/breadcrumb";
import BlogDetailFormat from "@/app/components/blog/blogDetailFormat";
import { useEffect } from "react";
import { incrementViewCount } from "@/src/incrementViewCount";

const BlogDetailPage = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const {onePost, loading, error} = usePostOne(id);

  useEffect(() => {

    const updateViewCount = async () => {
      try {
        await incrementViewCount(id);
      }catch(e) {
        console.error(e);
      }
    };

    updateViewCount();

  },[id])

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
    <div className="pt-30 bg-[#FCFCFC]">

      {/* パンくずリスト + 読了率バー */}
      <Breadcrumb
      items={[
        {label: "Home", href: "/"},
        {label: "Blog", href: "/blog/show"},
        {label: onePost.title}
      ]}
      />


        <BlogDetailFormat onePost={onePost}/>

    </div>
  );
}

export default BlogDetailPage;
