import { RiMailFill, RiPhoneFill } from "react-icons/ri"
import Socials from "./Socials"

const Topbar = () => {
  return (
    <section id="home" className=" hidden py-4 xl:h-12 xl:py-0 bg-linear-to-br from-[#ffc221] to-[#ffd76e] md:flex items-center">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="hidden xl:flex items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary text-white flex items-center justify-center">
                <RiPhoneFill />
              </div>
              <a href='+2348033319391' className="font-medium text-lg text-primary tracking-wider">08033319391</a>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary text-white flex items-center justify-center">
                <RiMailFill />
              </div>
              <a href="mailto:containedsolar@gmail.com" className="font-medium text-lg text-primary tracking-wider">containedsolar@gmail.com</a>
            </div>
          </div>
          <Socials containerStyles="flex items-center gap-8 mx-auto xl:mx-0" iconsStyles="text-primary"/>
        </div>
      </div>
    </section>
  )
}

export default Topbar