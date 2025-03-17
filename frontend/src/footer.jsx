import Socials from "./socials"
import logoimg from "./assets/logo.png"

function Footer() {

    return <div className="flex flex-col gap-[20px] mt-[60px]">
        <div className="flex">
            <img onClick={() => {
                window.location.href = `/`
            }} src={logoimg} className='cursor-pointer w-[121] h-[40px] ml-[30px] mr-[25px] box-content ' />
            <div className="w-[1px] bg-white/30"></div>
            <Socials />
        </div>
        <div className="border-t border-white/30 mx-[20px] text-white  flex flex-col gap-[20px]">
            <div className="flex gap-[40px] mt-[20px] [&>*]:hover:cursor-pointer [&>*]:hover:text-[#ffdd95] ">
                <a>Terms of Service</a>
                <a>DMCA</a>
                <a>Contact</a>
                <a>Aniwatch App</a>
            </div>
            <div className="pb-[30px] opacity-50 text-[16px] font-light">

                <div className="text-[14px]">AniWatch does not store any files on our server, we only linked to the media which is hosted on 3rd party services.</div>
                <div >© AniWatch.to. All rights reserved.</div>
            </div>
        </div>
    </div>
}

export default Footer