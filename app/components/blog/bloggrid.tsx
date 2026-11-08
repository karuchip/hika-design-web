import { PostListType } from "@/src/type/postListType"
import Link from "next/link"
import Image from "next/image"
import { CategoryColors } from "@/src/stylecss/categoryColors"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VisibilityIcon from '@mui/icons-material/Visibility';

const Bloggrid = ({posts}: {posts: PostListType[]}) => {


  const sortedItem = [...posts]
    .filter((item) => item.published)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

  return (
    <>
      {/* grid-cols-1 (スマホ) / md:grid-cols-2 (タブレット) / lg:grid-cols-3 (PC) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 justify-items-center px-10">
        {sortedItem
          .map(item => (
            <div key={item.id} className="w-[320px]">
              <Link href={`/blog/show/${item.id}`} className="w-[320px] group relative z-10">
              <div className="absolute top-0 left-0 w-full h-full group-hover:bg-indigo-500/10 z-1 transition-colors duration-100"></div>

                <div className="w-[320px] p-3">
                  <div className="flex items-center justify-between">
                    <p className={`w-fit text-[13px] md:text-[14px] px-[10px] py-[1px] text-[#ffffff] ${CategoryColors[item.category] || CategoryColors.default}`}>
                      {item.category}
                    </p>
                    <p className="w-fit text-[#586869] text-[13px]">{new Date(item.created_at).toLocaleDateString()}</p>
                  </div>

                  {/* タイトルとイメージ画像 */}
                  <div className="flex justify-between gap-3 mt-2">
                    <p className="w-[200px] h-[80px] text-[#586869] text-[16px] font-bold break-words">{item.title}</p>
                    <div className="w-[80px] h-[80px] aspect-square overflow-hidden flex-shrink-0 relative">
                      <Image
                        src={item.topImage}
                        alt="ブログトップ画像"
                        fill // 親要素の80x80に合わせるならfillが便利です
                        sizes="80px"
                        className="object-cover object-center"
                      />
                    </div>
                  </div>

                  {/* 閲覧数＆いいね */}
                  <div className="flex items-center justify-end gap-4 mt-2 text-indigo-500/80">
                    <div className="flex items-center">
                      <VisibilityIcon style={{ fontSize: '14px' }} />
                      <p className="w-fit text-indigo-500/80 text-[13px]">{item.view_count}</p>
                    </div>
                    <div className="flex items-center">
                      <FavoriteBorderIcon style={{ fontSize: '14px' }} />
                      <p className="text-[13px]">{item.likes}</p>
                    </div>
                  </div>

                </div>
              </Link>

              <div className="w-full h-[3px] bg-indigo-500/20 my-3">
                <span></span>
              </div>

            </div>

        ))}
      </div>
    </>
  )
}

export default Bloggrid
