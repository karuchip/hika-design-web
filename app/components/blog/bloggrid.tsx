import { PostListType } from "@/src/type/postListType"
import Link from "next/link"
import Image from "next/image"
import { CategoryColors } from "@/src/stylecss/categoryColors"

const Bloggrid = ({posts}: {posts: PostListType[]}) => {

  console.log(posts);

  const sortedItem = [...posts]
    .filter((item) => item.published)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

  return (
    <>
      {/* grid-cols-1 (スマホ) / md:grid-cols-2 (タブレット) / lg:grid-cols-3 (PC) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-items-center">
        {sortedItem
          .map(item => (

            <Link key={item.id} href={`/blog/show/${item.id}`}>

              <div className="w-[300px]">
                <p className="w-[300px] text-[#586869] text-right my-[5px]">{new Date(item.created_at).toLocaleDateString()}</p>
                <div className="relative">
                  <p className={`w-fit px-[40px] py-[3px] absolute z-[1] text-[#ffffff] rounded-lg text-[18px] ${CategoryColors[item.category] || CategoryColors.default}`}>
                    {item.category}
                  </p>

                  <div className="relative w-[300px] z-[0] h-[180px] aspect-video overflow-hidden rounded-lg">
                    <Image
                      src={item.topImage}
                      alt="ブログトップ画像"
                      fill
                      className="object-cover object-center"
                      />
                  </div>
                </div>

                <p className="my-[10px] w-[300px] text-[#586869] text-[18px] font-bold break-words">{item.title}</p>
              </div>

            </Link>

        ))}
      </div>
    </>
  )
}

export default Bloggrid
