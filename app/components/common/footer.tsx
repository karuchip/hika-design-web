import Image from "next/image"
import Link from "next/link"

const Footer = () => {
  return(
    <div className="p-10 bg-[#F0ECEC] w-screen">

        <div className="w-fit mx-auto">
          <div className="mb-3">
            <Image src="/img/HikaDev+Design.png" alt="Hika Design logo" width={53} height={42} className="mx-auto"/>
          </div>
          <Link href="/privacy" className="text-[14px] mt-4 text-[#586869] hover:text-[#ffffff]">プライバシーポリシー</Link>
        </div>
    </div>
  )
}

export default Footer
