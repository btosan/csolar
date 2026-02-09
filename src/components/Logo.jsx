import Image from "next/image"
import Link from "next/link"


const Logo = () => {
  return (
   <Link href="/">
    <Image width={100} height={100} src="/assets/cs-icon.png" alt="logo" className="h-6 md:h-7 lg:h-8 xl:h-9 w-auto "/>
   </Link>
  )
}

export default Logo