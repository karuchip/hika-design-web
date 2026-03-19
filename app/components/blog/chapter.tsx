"use client"

import { PostType } from "@/src/type/postsType"
import { useEffect, useState } from "react"

type Props = {
  onePost: PostType
}

const Chapter = ({onePost}:Props) => {

  const headings = [...onePost.blocks]
    .filter(block => block.type === "heading")
    .sort((a,b) => a.order - b.order)

    const [activeHeading, setActiveHeading] = useState<string | null>(null);

    // スクロール検知
    useEffect(() => {

    const handleScroll = () => {
      const headings = document.querySelectorAll("h2, h3");
      let currentId = "";

      headings.forEach((heading) => {
        // getBoundingClientRect() 要素の寸法と、そのビューポートに対する相対位置に関する情報を DOMRect オブジェクトで返す
        const rect = heading.getBoundingClientRect();

        // 画面上から120px以内に来た見出し
        if(rect.top <= 120) {
          currentId = heading.id;
          console.log(currentId)
        }
      });
      setActiveHeading(currentId);
    };
    window.addEventListener("scroll", handleScroll);
    return() => window.removeEventListener("scroll", handleScroll)
}, [])

  return(
    <div className="w-[300px] rounded-3xl lg:shadow-lg shadow-none text-[#586869] bg-[#ffffff] p-[10px]">
      <div className="w-[260px] mx-auto py-[5px] lg:py-[30px]">
        <p className="w-fit text-[24px] mx-auto font-bold">目次</p>

        {headings.map((item)=> {
          if(item.type === "heading"){
            if(item.level === 1 ) {
              return(
                <div key={item.id} className="w-full mt-6 mb-1">
                  <a href={`#${item.id}`}>
                    <p className={`text-[16px] md:text-[20px] hover:text-[#000000] mt-3
                        ${activeHeading === item.id
                          ? "text-black font-bold bg-[#F0ECEC]"
                          : "text-[#586869]"
                        }
                    `}>
                      {item.content}
                    </p>
                    <div className="w-full h-[1px] bg-[#586869]"><span></span></div>
                  </a>
                </div>
              )
            }else if(item.level === 2) {
              return (
                <div key={item.id} className="w-full my-2">
                  <a  href={`#${item.id}`}>
                    <p className={`text-[14px] md:text-[18px] font-normal hover:text-[#000000] hover:font-bold
                      ${activeHeading === item.id
                          ? "text-black font-bold bg-[#F0ECEC]"
                          : "text-[#586869]"
                      }
                    `}>
                      <div className="flex gap-3"><span>・</span><p>{item.content}</p></div>
                    </p>
                  </a>
                </div>
              )
            }
          }
        })}
      </div>

    </div>
  )
}

export default Chapter
