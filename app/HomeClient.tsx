'use client'

import Image from "next/image"
import Link from "next/link"
import BlogLatest from "./components/home/blogLatest"

const HomeClient = () => {
  return(
    <>
      <div className="pt-30">

        {/* FV */}
        <div className="md:mx-[75px] md:h-[500px] md:mb-20">
          <div className="flex justify-center mb-6 md:mb-10">
            <Image src="/img/HikaDev+Design.png" alt="Hika Design logo" width={79} height={62} />
          </div>
          <div className="md:relative">
            <div className="w-full md:max-w-[1051px] h-[350px] md:h-[511px] overflow-hidden md:absolute md:z-[-1] md:right-0">
              <Image
                src="/img/toppage.png"
                alt="Hika Design logo"
                width={768}
                height={350}
                className="w-full h-full object-cover md:object-center"
              />
            </div>
            <div className="md:absolute md:z-[1] md:left-0 md:bottom-[-400] flex items-center h-[280px] md:max-w-[680px] md:h-[300px] bg-[#FDFAEF] text-[#586869] items-center justify-center">
              <div>
                <h1 className="w-fit mx-auto text-[24px] font-bold md:text-[36px] mb-5 px-5">UI/UX未経験からフロントエンド・UIデザインで仕事を得るまで</h1>
                <p className="px-10 md:px-30 md:mx-auto md:text-[20px]">2024年9月から趣味でWebアプリ開発を続けてきた私が、UIデザインとフロントエンドの理解を深め、学びを実務に繋げていくまでの過程を記録しています</p>
              </div>
            </div>
          </div>
        </div>

        {/* Blog */}
        <div className="md:mx-[75px] md:flex my-20 md:mt-40 bg-[#F5F5F5] py-[40px]">
          <div className="w-full">
            <h2 className="w-fit mx-auto mb-3 text-[36px] md:text-[48px]">Blog</h2>

            <BlogLatest/>
            <div className="w-fit mx-auto mb-10">
              <Link href="/blog/show" className="">全ての記事を見る</Link>
              <div className="w-full h-[1px] bg-[#586869]"><span></span></div>
            </div>


          </div>
        </div>


        {/* Profile */}
        <div className="md:mx-[75px] md:flex md:mb-20 justify-center">
          <div className="w-full md:w-[635px] h-[475px]">
            <Image
              src="/img/profileIcon.png"
              alt="ProfileIcon"
              width={635}
              height={475}
              className="w-full h-full object-cover object-center md:object-center"
            />
          </div>
          <div className="flex items-center h-[357px] md:w-[680px] md:h-[475px] bg-[#FDFAEF] text-[#586869] items-center justify-center">
            <div>
              <h2 className="w-fit mx-auto mb-5 text-[36px] md:text-[48px]">Profile</h2>
              <div className="w-[364px] md:px-[20px] md:text-[20px]">
                <p className="mb-3">UI/UXデザインとフロントエンドを学びながら、React / Next.js / TypeScript / Supabase を使ってWebアプリを個人開発しています。</p>
                <p>茨城 / 26歳</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default HomeClient
