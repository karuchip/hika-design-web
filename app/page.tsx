'use client'

import Image from "next/image"

const Home = () => {

  return(
    <>
      <div className="pt-30">

        {/* FV */}
        <div className="md:mx-[75px] md:h-[500px] md:mb-20">
          <div className="flex justify-center mb-6 md:mb-10">
            <Image src="/img/HikaDesign.png" alt="Hika Design logo" width={79} height={62} />
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
            <div className="md:absolute md:z-[1] md:reft-0 md:bottom-[-400] flex items-center h-[280px] md:max-w-[680px] md:h-[300px] bg-[#FDFAEF] text-[#586869] items-center justify-center">
              <div>
                <h1 className="w-fit mx-auto text-[24px] font-bold md:text-[36px] mb-5 px-5">UI/UX未経験から仕事を得るまで</h1>
                <p className="px-10 md:px-30 md:mx-auto md:text-[20px]">2024年9月から趣味でwebアプリ開発を続けてきた私が、UI/UXデザインとフロントエンドの理解を深め、学びを実務に繋げていくまでの過程を記録しています</p>
              </div>
            </div>
          </div>
        </div>


        {/* Profile */}
        <div className="md:mx-[75px] md:flex md:mb-20">
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
                <p className="mb-3">就職・転職を見据え、学習と制作のプロセスを記録中。一つひとつを丁寧に積み上げていくタイプです。</p>
                <p>茨城県在住 / 26歳</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default Home
