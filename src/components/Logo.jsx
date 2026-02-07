import Image from "next/image"
import Link from "next/link"


const Logo = () => {
  return (
   <Link href="">
    <Image width={100} height={100} src="/assets/cs-icon.png" alt="logo" className="h-7 md:h-8 lg:h-10 w-auto "/>
   </Link>
  )
}

export default Logo