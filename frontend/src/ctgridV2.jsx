import { useEffect, useState } from "react"
import FloatInfo from "./floatInfo"

function Ctgridv2(props) {

    const [resData, setResData] = useState([])
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [visible, setVisible] = useState(false);
    const [isInCard, setIsInCard] = useState(false);
    const [isInFloat, setIsInFloat] = useState(false);
    const [animedata, setAnimedata] = useState(0)

    const handleMouseEnterCard = (x, e) => {
        if (isInFloat == false) {
            setAnimedata(x);
            let b = window.event

            setPosition({
                x: b.clientX,
                y: b.clientY
            });
            setIsInCard(true);
        }
    };

    const handleMouseLeaveCard = () => {
        setIsInCard(false)
    };

    const handleMouseEnterFloat = () => {
        setIsInFloat(true)
    };

    const handleMouseLeaveFloat = () => {
        setTimeout(() => {
            setIsInFloat(false)
        }, 200);
    };

    useEffect(() => {
        if (isInCard || isInFloat) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    }, [isInCard, isInFloat]);


    useEffect(() => {
        const fetchData = async () => {
            const x = props.path

            const resp = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/home/category`, {
                method: "GET",
                headers: {
                    "category": x, // Specify the content type
                }
            })
            const resData2 = await resp.json()
            setResData(resData2.categorydata)
        }
        fetchData()
    }, [])

    return <div className="flex flex-col md:px-[15px] px-[3px] relative">
        <div
            onMouseEnter={handleMouseEnterFloat}
            onMouseLeave={handleMouseLeaveFloat}
            className={` ${visible ? "xl:flex opacity-100" : "opacity-0 pointer-events-none"} 
              transition-opacity duration-[300ms] bg-[#4e4e54]/60 
              backdrop-blur-xl rounded-md z-[2000] text-[20px] text-white 
              absolute h-[300px] w-[300px] hidden xl:flex `}
            style={{ position: "fixed", top: position.y, left: position.x }}>
            <FloatInfo
                type={animedata.type}
                name={animedata.title}
                description={animedata.description}
                id={animedata._id}
                avgTime={animedata.avgTime}
            />
        </div>
        <div className="  grid    grid-cols-6 xs:grid-cols-9 sm:grid-cols-9  md:grid-cols-12    lg:grid-cols-12  gap-[15px] grid-rows-[auto] gap-y-[30px] ">
            {
                resData.map((x, index) => {
                    if (index < 12||props.full) {
                        return <div key={x._id + index} className={`relative ${index <= 3 && props.type2 ? "col-span-3" : "col-span-3 lg:col-span-2"} `}>
                            <a href={`/name/${x._id}`} className="  relative cursor-pointer">
                                <div className=" z-[99] transition transition-all duration-200 absolute flex justify-center items-center h-[100%] w-[100%] text-[40px] text-white opacity-0  hover:opacity-100 hover:backdrop-blur-md"
                                    onMouseEnter={(e) => handleMouseEnterCard(x, e)}
                                    onMouseLeave={handleMouseLeaveCard}
                                ><i class="fas fa-play"></i></div>
                                <div>
                                    <img src={x.imageUrl} className={` ${props.type2 && index <= 3 ? "aspect-[207/230] object-contain" : "aspect-[207/290]"}  max-h-[500px] w-[100%] overflow-hidden object-cover `} />
                                    <div className="absolute inset-0 bg-[linear-gradient(0deg,_#242428_0%,_transparent_25%)]"></div>
                                </div>
                            </a>
                            <div className="text-white font-medium line-clamp-1">{x.title}</div>
                            <div className="flex gap-[5px] text-[14px] pt-[10px] pb-[5px]">
                                <span className="text-[#aaa]">{x.type}</span>
                                <span className="text-[#aaa]">•</span>
                                <span className="text-[#aaa]">{x.avgTime} min</span>
                            </div>
                            <div className={`  line-clamp-3 text-[13px] text-[#aaa] font-light ${((index > 3) || (!props.type2)) ? " hidden " : "content"} max-[1024px]:hidden`}>{x.description}</div>
                        </div>
                    }
                    else {
                        return;
                    }
                })
            }
        </div>
    </div>
}

export default Ctgridv2