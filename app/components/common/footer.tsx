import Image from "next/image"

const Footer = () => {
  return(
    <div className="flex justify-center p-10 bg-[#F0ECEC] w-screen">
      <Image src="/img/HikaDesign.png" alt="Hika Design logo" width={53} height={42} />
    </div>
  )
}

export default Footer
