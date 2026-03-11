// パンくずリスト
import Link from "next/link";
import HomeIcon from '@mui/icons-material/Home';

type props = {
  label: string;
  href?: string;
}

const Breadcrumb = ({items}:{items:props[]}) => {

  return(
    <div className="flex gap-[5px] text-[13px] md:text-[14px] pl-[20px] lg:pl-[40px] text-[#A6A6A6] mb-5  sticky top-0 bg-[#FCFCFC]">
      {items.map((item, index) => (
        <span key={index}>
          {item.href ? (
            item.label === "Home" ? (
              <Link href={item.href} className="hover:text-[#586869]"><HomeIcon sx={{fontSize: "16px", mb:"3px"}}/>{item.label}</Link>
            ):(
              <Link href={item.href} className="hover:text-[#586869]">{item.label}</Link>
            )
          ):(
            <span className="w-fit text-[#586869]">{item.label}</span>
          )}
          {index < items.length - 1 && <span>{" >"}</span>}
        </span>
      ))}
    </div>
  )
}

export default Breadcrumb
