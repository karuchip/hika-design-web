"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react";

const Header = () => {

  // スクロールするとヘッダー非表示
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(()=> {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if(currentScrollY > lastScrollY.current && currentScrollY > 40) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return(
    <div className={`fixed z-[100] w-screen bg-[#FFFFFF] transition-transform duration-300 ${
      showHeader ? "translate-y-0" : "-translate-y-full"
    }`}>
      <div className="flex justify-between p-10">
        <Link href="/">
          <Image src="/img/HikaDev+Design.png" alt="Hika Design logo" width={53} height={42} className="h-auto"/>
        </Link>
        <div className="flex text-[18px]">
          <p className="mr-10"><Link href="/blog">Blog</Link></p>
          <p><Link href="/">Portfolio</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Header
