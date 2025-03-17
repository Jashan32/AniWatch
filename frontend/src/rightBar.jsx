import { useEffect, useState } from "react"
import TotalEp from "./totalEp";

function RightBar() {
    const [moreVisible, setMoreVisible] = useState(false);
    const [resData, setResData] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const resp = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/home/category`, {
                method: "GET",
                headers: {
                    "category": "spotlight", // Specify the content type
                }
            })
            const resData2 = await resp.json()
            setResData(resData2.categorydata)
        }
        fetchData()
    }, [])

    return <div className="h-[100%] w-[100%] mr-[30px] ml-[15px]">
        <div className=" w-[100%]   ">
            <div className="text-[#ffdd95] font-semibold text-[22px] mb-[10px] mt-[8px]">Genres</div>
            <div className="flex- flex-col bg-white/10 p-[15px] mr-[15px]">
                <div className="grid grid-cols-3 grid-rows-8 text-[14px] gap-[0px] 
                [&>*]:hover:bg-white/10 [&>*]:h-[45px] [&>*]:flex 
                [&>*]:items-center [&>*]:m-[0px] [&>*]:rounded-md 
                [&>*]:font-semibold [&>*]:pl-[8px] [&>*]:cursor-pointer">
                    <a className="text-[#d0e6a5]">Action</a>
                    <a className="text-[#ffdd95]">Adventure</a>
                    <a className="text-[#fc887b]">Cars</a>
                    <a className="text-[#ccabda]">Comedy</a>
                    <a className="text-[#abccd8]">Dementia</a>
                    <a className="text-[#d8b2ab]">Demons</a>
                    <a className="text-[#86e3ce]">Drama</a>
                    <a className="text-[#d0e6a5]">Ecchi</a>
                    <a className="text-[#ffdd95]">Fantasy</a>
                    <a className="text-[#fc887b]">Game</a>
                    <a className="text-[#ccabda]">Harem</a>
                    <a className="text-[#abccd8]">Historical</a>
                    <a className="text-[#d8b2ab]">Horror</a>
                    <a className="text-[#86e3ce]">Isekai</a>
                    <a className="text-[#d0e6a5]">Josie</a>
                    <a className="text-[#ffdd95]">Kids</a>
                    <a className="text-[#fc887b]">Magic</a>
                    <a className="text-[#ccabda]">Martial Arts</a>
                    <a className="text-[#abccd8]">Mecha</a>
                    <a className="text-[#d8b2ab]">Military</a>
                    <a className="text-[#86e3ce]">Music</a>
                    <a className="text-[#d0e6a5]">Mystery</a>
                    <a className="text-[#ffdd95]">Parody</a>
                    <a className="text-[#fc887b]">Police</a>
                    {moreVisible && <>
                        <a className="text-[#ccabda]">psychological</a>
                        <a className="text-[#abccd8]">Romance</a>
                        <a className="text-[#d8b2ab]">Sumurai</a>
                        <a className="text-[#86e3ce]">School</a>
                        <a className="text-[#d0e6a5]">Sci-Fi</a>
                        <a className="text-[#ffdd95]">Seinen</a>
                        <a className="text-[#fc887b]">Shoujo</a>
                        <a className="text-[#ccabda]">Shoujo Ai</a>
                        <a className="text-[#abccd8]">Shounen</a>
                        <a className="text-[#d8b2ab]">Shounen Ai</a>
                        <a className="text-[#86e3ce]">Slice of Life</a>
                        <a className="text-[#d0e6a5]">Space</a>
                        <a className="text-[#ffdd95]">Sports</a>
                        <a className="text-[#fc887b]">Super Power</a>
                        <a className="text-[#ccabda]">Supernatural</a>
                        <a className="text-[#abccd8]">Thriller</a>
                        <a className="text-[#d8b2ab]">Vampire</a>
                    </>
                    }
                </div>
                <div onClick={() => {
                    setMoreVisible((x) => (!x))
                }}
                    className="flex justify-center items-center cursor-pointer text-[14px] text-[white] font-semibold bg-white/10 hover:bg-white/20 rounded-md h-[45px] mt-[8px]">
                    {moreVisible ? "Show Less" : "Show More"}
                </div>
            </div>
        </div>
        <div className="pt-[50px]">
            <div className="text-[#ffdd95] text-[22px] font-semibold ">Top 10</div>
            <div className="flex flex-col bg-white/7 ">
                {
                    resData.map((x, index) => (
                        <div className="flex items-center pl-[10px] hover:bg-white/10">
                            <div className={`font-semibold text-white text-[20px] ${index < 3 ? "cursor-default border-b-[4px] border-[#ffdd95]" : "text-white/40 hover:text-white cursor-default"} `}> {index < 9 ? "0" : ""}{index + 1}</div>
                            <div className="flex items-center gap-[15px] border-b border-white/5 w-full mr-[20px] p-[15px]">
                                <img src={x.imageUrl} className="w-[60px] h-[76px] rounded-sm" />
                                <div>
                                    <div>
                                        <a href={`/name/${x._id}`} className="font-medium text-white hover:text-[#ffdd95]"> {x.title} </a>
                                    </div>
                                    <TotalEp />
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    </div>
}

export default RightBar