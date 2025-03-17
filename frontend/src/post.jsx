function Post() {

    return <div className="w-[100%] h-[195px]  backdrop-blur-[10px]  flex">
        <div className="bg-white/10 w-[60px] rounded-l-[16px] flex flex-col gap-[30px] pt-[20px] items-center [&>*]:cursor-pointer [&>*]:hover:text-[#ffdd95] [&>*]:hover:bg-white/20">
            <a href={"/community"} className="text-white/50 text-16 rounded-full bg-white/10 w-[35px] h-[35px] flex justify-center items-center">
                <i class="far fa-thumbs-up"></i>
            </a>
            <a href={"/community"} className="text-white/50 text-16 rounded-full bg-white/10 w-[35px] h-[35px] flex justify-center items-center">
                <i class="far fa-thumbs-down"></i>
            </a>
        </div>
        <div className="bg-white/22 w-full rounded-r-[16px]" > </div>
    </div>
}
export default Post