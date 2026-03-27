import { PostType } from "@/src/type/postsType"
import {CategoryColors} from "@/src/stylecss/categoryColors"
import CodeBlock from "@/app/components/common/codeblock";
import Image from "next/image"
import Chapter from "@/app/components/blog/chapter";

type Props = {
  onePost: PostType
}

const BlogDetailFormat = ({onePost}:Props) => {

  return(
    <>

      <div className="lg:flex lg:gap-[40px] lg:justify-center">
        {/* 左サイド */}
        <div className="w-max-[360px] lg:max-w-[864px] md:min-w-[664px] mx-[20px] lg:mx-0 mb-[20px] lg:mb-[200px] h-auto bg-[#ffffff] rounded-3xl shadow-lg">
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
            <h1 className="w-full text-[32px] md:text-[40px] font-bold mb-[15px] break-words">{onePost.title}</h1>

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
                        <div key={one.id}>
                          <h2 id={one.id} className="font-bold text-[22px] md:text-[30px] mt-[50px] md:mt-[90px]">{one.content}</h2>
                          <div className="w-full h-[1px] mb-[27px] bg-[#AFAFAF]">
                            <span></span>
                          </div>
                        </div>
                      )
                    }else if (one.level === 2) {
                      return (
                        <div key={one.id}>
                          <h3  id={one.id} className="font-bold text-[18px] md:text-[24px] mt-[40px] md:mt-[30px] ">{one.content}</h3>
                        </div>
                      )
                    }else if (one.level === 3) {
                      return(
                        <div key={one.id}>
                          <p className="font-bold">{one.content}</p>
                        </div>
                      )
                    }

                  // テキスト
                  } else if (one.type === "text") {
                    return (
                      <div key={one.id}>
                        <p className="text-[16px] md:text-[20px] mt-[5px] mb-[30px]">{one.content}</p>
                      </div>
                    )

                  // 画像
                  } else if (one.type === "image") {
                    return (
                      <div key={one.id} className="w-full overflow-hidden my-[10px] md:my-[20px]">
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
                        <CodeBlock code={one.code}/>
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
    </>
  )
}

export default BlogDetailFormat
