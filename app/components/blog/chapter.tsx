import { PostType } from "@/src/type/postsType"

type Props = {
  onePost: PostType
}

const Chapter = ({onePost}:Props) => {
  return(
    <div className="w-[300px] rounded-3xl lg:shadow-lg shadow-none text-[#586869] bg-[#ffffff]">
      <div className="w-[260px] mx-auto py-[5px] lg:py-[15px]">
        <p className="w-fit text-[24px] mx-auto font-bold">目次</p>

        {onePost.blocks
        .sort((a,b) => a.order-b.order)
        .map((item)=> {
          if(item.type === "heading"){
            if(item.level === 1 ) {
              return(
                <div key={item.id} className="w-fit mt-2 mb-1">
                  <a href={`#${item.id}`}>
                    <p className="text-[16px] md:text-[18px] hover:text-[#000000] hover:font-bold">{item.content}</p>
                    <div className="w-full h-[1px] bg-[#586869]"><span></span></div>
                  </a>
                </div>
              )
            }else if(item.level === 2) {
              return (
                <div key={item.id} className="w-fit mb-1">
                  <a  href={`#${item.id}`}>
                    <p className="text-[14px] md:text-[16px] font-normal hover:text-[#000000] hover:font-bold"><span>・</span>{item.content}</p>
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
