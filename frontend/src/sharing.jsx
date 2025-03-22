import sharei from "./assets/sharei.gif"

function Sharing() {
    return <div>
        <div className="flex gap-[20px] xl:gap-[60px]">
            <div className="flex gap-[20px]  mt-[24px] mb-[24px]">
                <img src={sharei} className="w-[60px] h-[60px] rounded-full" />
                <div className="flex flex-col justify-center">
                    <div className="text-[#ffdd95] font-semibold text-[14px]">share AniWatch</div>
                    <div className="text-white text-[16px] font-light">To your friends</div>
                </div>
            </div>
            <div className="flex my-auto gap-[10px] [&>*]:cursor-pointer">
                <a href="https://t.me" target="_blank" className=" hidden xl:flex relative bg-[#24A1DE] w-[120px] h-[32px] rounded-[20px]  justify-center items-center gap-[20px]">
                    <img draggable="false" src="https://platform-cdn.sharethis.com/img/telegram.svg" className="h-[16px] flex-1" />
                    <div className=" text-[12px] font-medium text-white flex-2 "> Share</div>
                </a>
                <a href="https://x.com/AniwatchTV" target="_blank" className="hidden xl:flex  relative bg-black border border-white/40 w-[120px] h-[32px] rounded-[20px] flex justify-center items-center gap-[20px]">
                    <img draggable="false" src="https://platform-cdn.sharethis.com/img/twitter.svg" className="h-[16px] flex-1" />
                    <div className=" text-[12px] font-medium text-white flex-2 "> Tweet</div>
                </a>
                <div className="hidden 2xl:flex  relative bg-[#4267B2] w-[120px] h-[32px] rounded-[20px] flex justify-center items-center gap-[20px]">
                    <img draggable="false" src="https://platform-cdn.sharethis.com/img/facebook.svg" className="h-[16px] flex-1" />
                    <div className=" text-[12px] font-medium text-white flex-2 "> Share</div>
                </div>
                <a href="https://www.reddit.com/r/AniWatchZone/" target="_blank" className="hidden 2xl:flex  relative bg-[#ff4500] w-[50px] h-[32px] rounded-[20px] flex justify-center items-center gap-[20px]">
                    <img draggable="false" src="https://platform-cdn.sharethis.com/img/reddit.svg" className="h-[16px] flex-1" />
                </a>
                <a  className=" relative bg-[#95D03A] w-[50px] h-[32px] rounded-[20px] flex justify-center items-center gap-[20px]">
                    <img draggable="false" src="https://platform-cdn.sharethis.com/img/sharethis.svg" className="h-[16px] flex-1" />
                </a>
            </div>
        </div>
    </div>
}

export default Sharing