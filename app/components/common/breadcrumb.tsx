// パンくずリスト
import Link from "next/link";
import HomeIcon from '@mui/icons-material/Home';
import ReadingProgress from "../blog/readingProgress";

type props = {
  label: string;
  href?: string;
}

const Breadcrumb = ({items}:{items:props[]}) => {

  return(
    <div className="relative flex gap-[5px] text-[14px] md:text-[18px] pl-[20px] py-[15px] lg:pl-[40px] text-[#A6A6A6] mb-10 sticky top-0 bg-[#FCFCFC] shadow-md z-[10]">
      {items.map((item, index) => (
        <span key={index}>
          {item.href ? (
            item.label === "Home" ? (
              <Link href={item.href} className="hover:text-[#586869]"><HomeIcon sx={{fontSize: "16px", mb:"3px"}}/>{item.label}</Link>
            ):(
              <Link href={item.href} className="hover:text-[#586869]">{item.label}</Link>
            )
          ):(
            <span className="w-fit text-[#586869]">
              {/* モバイル用 */}
              <span className="lg:hidden">
                {item.label.length > 20 ? `${item.label.slice(0, 20)}...` : item.label}
              </span>
              {/* デスクトップ用(lg以上で表示) */}
              <span className="hidden lg:inline">
                {item.label.length > 40 ? `${item.label.slice(0, 60)}...` : item.label}
              </span>
            </span>
          )}
          {index < items.length - 1 && <span>{" >"}</span>}
        </span>
      ))}

      {/* 読了率バー */}
      <ReadingProgress/>

    </div>
  )
}

export default Breadcrumb
