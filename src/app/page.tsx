import NavbarPage from "@/components/layouts/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full">
      <NavbarPage/>
      <div className="flex w-11/12 mx-auto justify-between">
      <Image
        src="/lamp.png"
        alt="hero"
        width={180}
        height={180}
      />
       <Image
        src="/lamp.png"
        alt="hero"
        width={180}
        height={180}
      />
      </div>
      <div className="w-full justify-center flex items-center">
        <h1 className="text-7xl font-bold text-[#4F4CEE]">Exclusive events, priceless moments</h1>
      </div>
      <div className="relative">
   <div className="w-full justify-center flex items-center">
        <Image
        src="/banner.jpeg"
        alt="hero"
        width={2000}
        height={2000}
      />      
      </div>
            <div className="absolute flex items-center justify-center left-[20%] bg-white -bottom-16 border-black border-3 w-[60%] h-24 rounded-sm"> halo</div>

      </div>
   
    </div>
    )
}
