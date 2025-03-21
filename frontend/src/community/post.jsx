const Post = (postData) => {
    const data = (postData.postData)
    const category = data.category
    const colors = {
        "Updates":"[#ff718c]",
        "General":"[#4da6ff]",
        "Suggestion":"[#7df796]",
        "Question":"[#ffce71]",
        "Discussion":"[#d4a2f7]",
        "Feedback":"[#ff7e3f]"
    }
    return <div className="w-[100%] h-[195px]  backdrop-blur-[10px]  flex">
        <div className="bg-white/10 w-[60px] rounded-l-[16px] flex flex-col gap-[30px] pt-[20px] items-center [&>*]:cursor-pointer [&>*]:hover:text-[#ffdd95] [&>*]:hover:bg-white/20">
            <a href={"/community"} className="text-white/50 text-16 rounded-full bg-white/10 w-[35px] h-[35px] flex justify-center items-center">
                <i class="far fa-thumbs-up"></i>
            </a>
            <a href={"/community"} className="text-white/50 text-16 rounded-full bg-white/10 w-[35px] h-[35px] flex justify-center items-center">
                <i class="far fa-thumbs-down"></i>
            </a>
        </div>
        <div className="bg-white/22 w-full rounded-r-[16px] flex flex-col justify-between py-[20px] px-[10px]" >
            <div className={`text-[13px] text-${colors[category]} font-light line-clamp-1`}>#{data.category}</div>
            <div className="text-[19.2px] text-white font-medium line-clamp-1">{data.title}</div>
            <div className="text-[13px] text-white/70 font-light line-clamp-2">{data.post}</div>
            <div className="flex items-center gap-[15px]">
                <img src={data.profileImg} className="rounded-full w-[40px]"/>
                <div className="text-[13px] text-white font-light line-clamp-1">{data.username}</div>
            </div>
        </div>
    </div>
}
export default Post