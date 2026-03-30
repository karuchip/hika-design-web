'use client'

import Image from "next/image"
import Link from "next/link"
import BlogLatest from "./components/home/blogLatest"
import { FadeIn } from "./components/animation/fadein"

const HomeClient = () => {
  return(
    <>
      <div className="pt-30">

        {/* FV */}
        <section className="md:mx-[75px] md:h-[500px] md:mb-20">
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
            <FadeIn>
              <div className="md:absolute md:z-[1] md:left-0 md:bottom-[-400] flex items-center h-[300px] md:max-w-[680px] md:h-[330px] bg-[#ffffff] text-indigo-500 items-center justify-center shadow-xl">
                <div>
                  <h1 className="w-fit text-[22px] font-bold md:text-[32px] mb-5 px-15">UI/UX未経験から<br/>フロントエンド・UIデザインで<br/>仕事を得るまで</h1>
                  <p className="px-15 md:mx-auto text-[16px] md:text-[20px]">2024年9月から趣味でWebアプリ開発を続けてきた私が、UIデザインとフロントエンドの理解を深めていく過程を記録しています</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Blog */}
        <FadeIn>
          <section className="md:mx-[75px] md:flex my-20 md:mt-40 py-[40px]">
            <div className="w-full">
              <h2 className="w-fit mx-auto mb-3 text-[36px] md:text-[48px]">Blog</h2>

              <BlogLatest/>
              <div className="w-fit mx-auto mt-10">
                <Link href="/blog/show" className="border border-indigo-500 p-3 hover:bg-indigo-500 text-indigo-500 hover:text-[#ffffff] font-bold transition-colors duration-300">全ての記事を見る</Link>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* portfolio */}
        <FadeIn>
          <section id="portfolio" className="md:mx-[75px] mb-30 scroll-mt-10">
            <div className="mx-10 md:mx-20">
              <h2 className="w-fit mx-auto mb-3 text-[36px] md:text-[48px]">Portfolio</h2>

              <Link
                href="https://fire.hika-design.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex flex-col md:flex-row justify-center items-center border border-indigo-500/60 py-5 px-3 group overflow-hidden"
              >
                <div className="absolute z-10 inset-0 bg-indigo-500/0 group-hover:bg-indigo-500/70 transition-colors duration-300 pointer-events-none"></div>
                <div className="absolute z-20 hidden group-hover:block text-[#ffffff] text-[36px] md:text-[48px] font-bold">みてみる</div>
                <div>
                  {/* 画像コンテナ */}
                  <div className="flex justify-center w-full md:w-auto">
                    <div className="w-[110%] flex justify-center">
                      <Image
                        src="/img/coastFireTitle.png"
                        alt="Coast Fire portfolio project"
                        width={450}
                        height={300}
                        className="w-full h-auto object-contain"
                      />
                    </div>
                  </div>
                  <div className="flex justify-center w-full md:w-auto">
                    <div className="w-[60%] flex justify-center">
                      <Image
                        src="/img/coastFireImage.png"
                        alt="Coast Fire portfolio project"
                        width={200}
                        height={300}
                        className="w-full h-auto object-contain"
                      />
                    </div>
                  </div>
                </div>

                {/* テキストコンテナ */}
                <div className="w-full max-w-[280px] lg:max-w-[400px] mt-4 md:mt-0 text-center md:text-left md:mr-6">
                  <p className="text-indigo-500/80 text-[18px] md:text-[20px] mt-6 md:mt-0">
                    話題のコーストFIREに着目。毎月いくら積み立てれば何歳で達成できるのかを可視化したくて実装しました。
                  </p>
                </div>
              </Link>

            </div>
          </section>
        </FadeIn>


        {/* Profile */}
        <FadeIn>
          <section className="md:mx-[75px] md:flex mb-20 justify-center">
            <div className="w-full md:w-[635px] h-[300px] md:h-[475px]">
              <Image
                src="/img/profileIcon.png"
                alt="ProfileIcon"
                width={635}
                height={475}
                className="w-full h-full object-cover object-center md:object-center"
              />
            </div>
            <div className="flex items-center h-[357px] md:w-[680px] md:h-[475px] bg-indigo-500/60 text-[#ffffff] items-center justify-center">
              <div>
                <h2 className="w-fit mx-auto mb-5 text-[36px] md:text-[48px]">Profile</h2>
                <div className="w-[364px] md:px-[20px] md:text-[20px]">
                  <p className="mb-3">UI/UXデザインとフロントエンドを学びながら、React / Next.js / TypeScript / Supabase を使ってWebアプリを個人開発しています。</p>
                  <p>茨城 / 26歳</p>
                </div>
              </div>
            </div>
          </section>
        </FadeIn>

      </div>
    </>
  )
}

export default HomeClient
