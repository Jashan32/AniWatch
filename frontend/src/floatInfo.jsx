
function FloatInfo({ type, name, description, id, avgTime }) {

    function towatch() {
        window.location.href = `/watch/${id}/0`
    }

    return <div className="flex flex-col justify-between h-full  pl-[15px] pr-[15px] pt-[15px] pb-[20px]">
        <div className="text-[18px]  font-semibold">
            {name}
        </div>
        <div className='flex gap-[2px] flex-row '>
            <div className='leading-[21px] bg-white text-black font-bold pl-[5px] pr-[5px] text-[12px] rounded-l-[4px]'>R</div>
            <div className='leading-[21px] bg-[#ffdd95] text-black font-bold pl-[5px] pr-[5px] text-[12px] '>HD</div>
            <div className='flex leading-[21px] bg-[#b0e3af] text-black font-bold pl-[5px] pr-[5px] text-[12px] '>
                <div>
                    <i class="fas fa-closed-captioning mr-1"></i>
                </div>
                <div>
                    12
                </div>
            </div>
            <div className='flex leading-[21px] bg-[#e3b5cd] text-black font-bold pl-[5px] pr-[5px] text-[12px] '>
                <div>
                    <i class="fas fa-microphone mr-1"></i>
                </div>
                <div>
                    12
                </div>
            </div>
            <div className='leading-[21px] bg-[#FFfFff4A] text-white font-bold pl-[5px] pr-[5px] text-[12px]'>12</div>
            <div className='leading-[21px] pr-[4px] pl-[4px] text-[#FFfFff9A]'>•</div>
            <div className='leading-[21px] text-[13px] pr-[4px] '>{type}</div>
            <div className='leading-[21px] pr-[4px] text-[#FFfFff9A]'>•</div>
            <div className='leading-[21px] text-[13px] line-clamp-1'>{avgTime} min</div>
        </div>
        <div className="text-[13px]  font-light overflow-hidden line-clamp-3">
            {description}
        </div>
        <div className="flex flex-col justify between">
            <div className="flex gap-[10px] text-[14px]">
                <div className="text-[#bdbbbb]">Japanese: </div>
                <div>ブルーロック</div>
            </div>
            <div className="flex gap-[10px] text-[14px]">
                <div className="text-[#bdbbbb]">Aired: </div>
                <div>Oct 3, 2024</div>
            </div>
            <div className="flex gap-[10px] text-[14px]">
                <div className="text-[#bdbbbb]">Status: </div>
                <div>Finished Airing</div>
            </div>
            <div className="flex gap-[10px] text-[14px]">
                <div className="text-[#bdbbbb]">Genres: </div>
                <div>Action, Comedy, Supernatural</div>
            </div>
        </div>
        <div className="flex justify-between">
            <div onClick={() => towatch()} className="cursor-pointer bg-[#ffdd95]  sm:text-[16px] text-[12px] text-[black] rounded-[30px]  pl-[20px] pr-[20px] w-[220px] flex justify-center items-center">
                <i class="fas fa-play-circle mr-2"></i>
                Watch Now
            </div>
            <div className="font-black cursor-pointer bg-white   text-[20px] text-black rounded-full  w-[40px] h-[40px] flex justify-center items-center">
                <i class="fas fa-plus"></i>
            </div>
        </div>
    </div>
}

export default FloatInfo