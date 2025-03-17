import TotalEp from "./totalEp"

function Ctlist({ category, cards, category2 }) {

    return <div className="">
        <div className="flex flex-col text-[#ffdd95] text-[22px] font-semibold w-full ml-[00px] mt-[50px] ml-[00px]">
            {category}
            {cards?.map((s, index) => (
                <div className={` ${index < 5 ? "flex" : "hidden"} flex border-b border-white/10 `}>
                    <a href={`/name/${s._id}`}>
                        <img src={s.imageUrl} className="cursor-pointer rounded-md w-[60px] h-[76px] mt-[16px] mb-[16px]" />
                    </a>
                    <div className="w-full h-[100%] flex flex-col gap-[10px] my-[auto]">
                        <a href={`/name/${s._id}`} className="cursor-pointer hover:text-[#ffdd95] text-white text-[16px] flex   pl-[10px] font-medium font-[arial] items-center w-[70%]"> {s.title} </a>
                        <div className="flex gap-[10px] ml-[10px] ">
                            <TotalEp />
                            <div className="font-normal text-[#aaa] flex justify-center items-center text-[14.4px]" > •  </div>
                            <div className="font-normal text-[#ddd] flex justify-center items-center text-[14.4px]" > {s.type} </div>
                        </div>
                    </div>
                </div>
            )
            )}
        </div>
        <div className=" text-white pt-[16px] pb-[16px] text-[16px] font-light  flex">
            <a href={`/category/${category2}`} className="hover:text-[#ffdd95] cursor-pointer flex items-center">

                <div  >View More</div>
                <i class="fas fa-angle-right ml-2"></i>
            </a>
        </div>
    </div>
}

export default Ctlist