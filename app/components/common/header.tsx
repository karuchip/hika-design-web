"use client"

import Image from "next/image"
import Link from "next/link"

const Header = () => {
  return(
    <div className="fixed z-[100] w-screen bg-[#FFFFFF]">
      <div className="flex justify-between p-10">
        <div>
          <Image src="/img/HikaDesign.png" alt="Hika Design logo" width={53} height={42} />
        </div>
        <div className="flex text-[18px]">
          <p className="mr-10"><Link href="/">Blog</Link></p>
          <p><Link href="/">Portfolio</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Header
