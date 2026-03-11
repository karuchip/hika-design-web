"use client"

import Loading from "@/app/components/common/loading";
import {usePostOne} from "@/src/hooks/usePostOne"
import {use} from "react"
import Image from "next/image"
import {CategoryColors} from "@/src/stylecss/categoryColors"
import Chapter from "@/app/components/blog/chapter";
import Breadcrumb from "@/app/components/common/breadcrumb";

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
    <div className="pt-30 bg-[#FCFCFC]">

      {/* パンくずリスト */}
      <Breadcrumb
      items={[
        {label: "Home", href: "/"},
        {label: "Blog", href: "/blog"},
        {label: onePost.title}
      ]}
      />

      <div className="lg:flex lg:gap-[40px] lg:justify-center">

        {/* 左サイド */}
        <div className="w-max-[360px] lg:max-w-[864px] md:min-w-[664px] mx-[20px] lg:mx-0 mb-[20px] lg:mb-[60px] h-auto bg-[#ffffff] rounded-3xl shadow-lg">
          {/* ラベル画像 */}
          <div className="w-full h-[60px] md:h-[120px] overflow-hidden rounded-t-3xl mb-[16px] md:mb-[32px]">
            <Image
              height={400}
              width={400}
              src={onePost.topImage}
              alt="ブログトップ画像"
              className="w-full h-full object-cover md:object-center"
            />
          </div>

          <div className="w-max-[330px] md:max-w-[800px] md:max-w-[600px] bg-[#ffffff] mx-[16px] md:mx-[32px] py-[16px] md:py-[32px]">


            {/* ラベル */}
            <div className="flex justify-between mb-[16px] items-end">
              {/* カテゴリー */}
              <p className={`w-fit px-[40px] py-[3px] text-[#ffffff] text-[18px] ${CategoryColors[onePost.category] || CategoryColors.default}`}>
                {onePost.category}
              </p>
              {/* 日付 */}
              <p className="w-fit text-[16px] md:text-[18px]">{new Date(onePost.created_at).toLocaleDateString()}</p>
            </div>

            {/* タイトル */}
            <h1 className="text-[32px] md:text-[40px] font-bold mb-[15px]">{onePost.title}</h1>

            {/* 区切り棒 */}
            <div className="w-full h-[7px] bg-[#FCFCFC]">
              <span></span>
            </div>

            {/* (mbのみ表示) 目次 */}
            <div className="lg:hidden my-[20px] flex justify-center">
              <Chapter onePost={onePost}/>
            </div>

            {/* (mbのみ表示) 区切り棒 */}
            <div className="lg:hidden w-full h-[7px] bg-[#FCFCFC]">
              <span></span>
            </div>



            {/* 本文 */}
            <div>

              {onePost?.blocks
                .sort((a,b) => (a.order - b.order))
                .map(one => {

                  // 見出し1~3
                  if (one.type === "heading") {
                    if(one.level === 1) {
                      return (
                        <div key={one.id} id={one.id}>
                          <h1 className="font-bold text-[22px] md:text-[30px] mt-[40px] md:mt-[73px]">{one.content}</h1>
                          <div className="w-full h-[1px] mb-[27px] bg-[#AFAFAF]">
                            <span></span>
                          </div>
                        </div>
                      )
                    }else if (one.level === 2) {
                      return (
                        <div key={one.id} id={one.id}>
                          <h1 className="font-bold text-[18px] md:text-[22px] mb-[10px] md:mb-[20px]">{one.content}</h1>
                        </div>
                      )
                    }else if (one.level === 3) {
                      <div key={one.id}>
                          <h1 className="font-bold">{one.content}</h1>
                        </div>
                    }

                  // テキスト
                  } else if (one.type === "text") {
                    return (
                      <div key={one.id}>
                        <p className="text-[16px] md:text-[18px] my-[10px]">{one.content}</p>
                      </div>
                    )

                  // 画像
                  } else if (one.type === "image") {
                    return (
                      <div key={one.id} className="w-full overflow-hidden my-[20px] md:my-[30px]">
                        <Image
                          height={300}
                          width={300}
                          src={one.src}
                          alt="ブログトップ画像"
                          className="w-full h-full object-cover md:object-center"
                        />

                      </div>
                    )

                  // コード
                  } else if (one.type === "code") {
                    return (
                      <div key={one.id}>
                        <div
                          className="p-[30px] bg-[#F3F3F3] my-[20px] md:my-[30px] rounded-xl"
                          style={{ whiteSpace: "pre-wrap"}}
                        >
                          <code>{one.code}</code>
                        </div>
                      </div>
                    )
                  }
              })}
            </div>
          </div>
        </div>


        {/* (PCのみ表示) 右サイド */}
        <div>
          {/* プロフィール */}
          <div className="flex justify-center lg:block my-[80px] lg:my-0">
            <div className="w-[300px] text-[#586869] bg-[#FDFAEF] p-[20px] rounded-3xl shadow-lg">
              <div className="w-[100px] h-[100px] overflow-hidden mx-auto">
                <Image
                  height={100}
                  width={100}
                  src="/img/profileIconSmall.png"
                  alt="プロフィールアイコン小"
                  className="w-full h-full object-cover md:object-center"
                />
              </div>
              <p className="text-[24px] w-fit mx-auto my-[10px]">Hika</p>
              <p className="text-[16px]">UI/UXデザインとフロントエンドを学びながら、React / Next.js / TypeScript / Supabase を使ってWebアプリを個人開発しています。</p>
            </div>
          </div>


          {/* 目次 */}
          <div className="hidden lg:inline-block my-[20px] justify-center sticky top-[70px]">
              <Chapter onePost={onePost}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogDetailPage;
