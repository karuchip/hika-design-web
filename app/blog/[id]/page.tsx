"use client"

import Loading from "@/app/components/common/loading";
import {usePostOne} from "@/src/hooks/usePostOne"
import {use} from "react"
import Image from "next/image"
import React from "react";

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

      <Image
        height={400}
        width={400}
        src={onePost.topImage}
        alt="ブログトップ画像"
        />
      <h2>{onePost?.title}</h2>
      <p>{onePost.category}</p>
      <p>{new Date(onePost.created_at).toLocaleDateString()}</p>


      {onePost?.blocks.map(one => {
        if (one.type === "heading") {
          return (
            <React.Fragment key={one.id}>
              <p>見出し</p>
              <p>one.level</p>
              <p>one.content</p>
            </React.Fragment>
          )
        } else if (one.type === "text") {
          return (
            <React.Fragment key={one.id}>
              <p>テキスト</p>
            </React.Fragment>
          )
        } else if (one.type === "image") {
          return (
            <React.Fragment key={one.id}>
              <p>画像</p>
            </React.Fragment>
          )
        } else if (one.type === "code") {
          return (
            <React.Fragment key={one.id}>
              <p>コード</p>
              <div style={{ whiteSpace: "pre-wrap" }}>
                <code>{one.code}</code>
              </div>
            </React.Fragment>
          )
        }
      })}
    </div>
  );
}

export default BlogDetailPage;
