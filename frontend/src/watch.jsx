import { useParams } from "react-router-dom";
import './index.css'
import './app.css'
import './watch.css';
import Navbar from './navbar.jsx'
import { useState, useEffect } from "react"
import React from "react";
import VideoPlayer from "./vplayer.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import Ctgridv2 from "./ctgridV2.jsx";
import RightBar from "./rightBar.jsx";
import Footer from "./footer.jsx";
import Sharing from "./sharing.jsx";

function Watch() {

    const [imageURL, setimage] = useState("")
    const [name, setname] = useState("")
    const [type, settype] = useState("")
    const [description, setDescription] = useState("")
    const [m3u8L, setEnglishV] = useState("")
    const [am3u8L, setJapanV] = useState("")
    const [sub, setSub] = useState("")
    const [subserver, setSubServer] = useState(false);
    const [dubServer, setDubServer] = useState(false);
    const [isSub, setIsSub] = useState(false);
    const [epTitle, setEpTitle] = useState([]);
    const { id, ep } = useParams(); // Get the dynamic params from the URL
    const location = useLocation(); // Detect the current URL
    const [idx, setidx] = useState("")
    const [epx, setepx] = useState("")

    useEffect(() => {
        // Update the content based on URL change
        if (id && ep) {
            setepx(ep)
            setidx(id)
        } else {
            setContent("No content available.");
        }
    }, [location.pathname]); // Trigger when the pathname changes

    useEffect(async () => {
        setepx(ep)
        setidx(id)
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/ahome/ahome/${id}`, {
            method: "GET"
        });
        const data = await res.json()
        const data2 = data.data
        setimage(data2.imageUrl)
        setname(data2.title)
        settype(data2.type)
        setDescription(data2.description)
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/watch/watch/${id}`, {
                    method: "GET",
                });
                if (!res.ok) throw new Error("Failed to fetch data");

                const data = await res.json();
                if (data.data.vUrl_japanese.length == 0) {
                    throw new Error("Failed to fetch data");
                }
                const data2 = data.data;
                setEpTitle(data2.title);
                const vURL_english = data2.vURL_english[ep];
                const vUrl_japanese = data2.vUrl_japanese[ep];
                const subUrl = data2.subtitles[ep];
                setEnglishV(vURL_english);
                setJapanV(vUrl_japanese)
                setSub(subUrl);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [idx, epx]);

    const navigate = useNavigate(); // useNavigate hook for navigation

    function vidChanger(index) {
        navigate(`/watch/${idx}/${index}`)
    }

    return <div className=''>
        <Navbar />
        <div className='bg-[#242428]  w-full'> </div>
        <div className="relative h-auto md:h-[1250px] xl:h-[900px] bg-cover bg-center">
            {/* Background Image Overlay */}
            <div
                className="absolute inset-0 bg-black bg-opacity-50 bg-center bg-cover filter grayscale "
                style={{ backgroundImage: `url(${imageURL})` }}
            ></div>
            {/* Content */}
            <div className="relative text-white flex h-auto xl:h-[900px] md:h-[1250px]">
                <div className='bg-black/40 backdrop-blur-[40px] w-[100%]'>
                    <div className="xl:flex gap-[40px]">
                        <div className=' xl:mr-[0px] mr-[20px]  mt-[10px] ml-[20px] xl:flex-[11] flex-shrink-0   pt-[80px] flex gap-[20px]  flex-col'>
                            <div className='text-[16px] font-light'>
                                Home • {type} • {name}
                            </div>
                            <div className='w-[100%] flex lg:flex-row  flex-col-reverse bg-black h-auto  w-[100%]'>
                                <div className=' custom-scroll  h-full bg-[#14151a] overflow-y-scroll text-[15px]'>
                                    {
                                        epTitle.map((x, index) => (
                                            <div onClick={() => vidChanger(index)} className={`${index == epx ? "text-[#ffdd95] bg-[#717175]" : "text-white"} hover:text-[#ffdd95] flex  pr-[20px] gap-[10px] p-[12px] cursor-pointer ${index % 2 == 0 ? "bg-[#242428]/60" : "bg-[#242428]"}`}>
                                                <div>{index + 1}</div>
                                                <div className={`  overflow-hidden text-ellipsis whitespace-nowrap`}>
                                                    {x}
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className="flex-1 h-auto w-[100%]">
                                    <VideoPlayer epTitle={epTitle} vUrl_english={m3u8L} vUrl_japanese={am3u8L} subtitleSrc={sub} isSub={isSub} />
                                    <div className="flex justify-between pl-[10px] pr-[10px]">
                                        <div className="flex flex-row gap-[15px]">
                                            <div className="text-[13px] lg:flex hidden">
                                                Expand
                                            </div>
                                            <div className="text-[13px] flex items-center hidden md:flex">

                                                <i class="fas fa-lightbulb mr-2"></i>
                                                <div className="flex gap-[5px]">
                                                    <div>Light</div>
                                                    <div className="text-[#ffdd95]">On</div>
                                                </div>
                                            </div>
                                            <div className="text-[13px] flex items-center flex gap-[5px]">
                                                <div>Auto Play</div>
                                                <div className="text-[#ffdd95]">On</div>
                                            </div>
                                            <div className="text-[13px] flex items-center flex gap-[5px]">
                                                <div>Auto Next</div>
                                                <div className="text-[#ffdd95]">On</div>
                                            </div>
                                            <div className="text-[13px] flex items-center flex gap-[5px]">
                                                <div>Auto Skip Intro</div>
                                                <div className="text-[#ffdd95]">On</div>
                                            </div>
                                        </div>
                                        <div className="flex flex-row gap-[15px] ">
                                            <div className="text-[13px]">
                                                <i class="fas fa-backward mr-2"></i>
                                                <span className="hidden md:flex">

                                                Prev
                                                </span>
                                            </div>
                                            <div className="text-[13px]">
                                                <span className="hidden md:flex">

                                                Next
                                                </span>
                                                <i class="fas fa-forward ml-2"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="md:flex pl-[10px] pt-[5px]">
                                        <div className=" my-[10px] py-[10px] flex-2 md:bg-[#ffdd95] font-medium text-black text-[13px] rounded-l-[8px]">
                                            <div>
                                                <div className="flex justify-center md:text-black text-white">You are watching</div>
                                                <div className="flex justify-center font-bold md:text-black text-[#ffdd95]">Episode {parseInt(ep) + 1}</div>
                                            </div>
                                            <div className="flex justify-center w-full">
                                                <div className="flex w-full text-center justify-center md:text-black text-white">
                                                    If current server doesn't work please try other servers beside.
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex-6 my-[10px] mx-[0px] bg-[#242428] h-[100px] md:h-[auto] md:rounded-[0px] rounded-[4px] ">
                                            <div className="mx-[22px] flex gap-[50px] bg-[#242428] h-[50%] border-b-white/30 border-b-[1px] flex items-center">
                                                <div className="flex items-center">
                                                    <i class="fas fa-closed-captioning mr-2 text-[#ffdd95]"></i>
                                                    <div className="">Sub:</div>
                                                </div>
                                                <div className="flex text-[13px] gap-[10px]">
                                                    <div onClick={() => {
                                                        setSubServer(0);
                                                        setIsSub(1)
                                                    }} className={` flex justify-center items-center cursor-pointer ${!subserver && isSub ? "bg-[#ffdd95] text-black" : "bg-white/10"} font-medium w-[80px] h-[30px]`}>VidSrc</div>
                                                    <div onClick={() => {
                                                        setSubServer(1);
                                                        setIsSub(1)
                                                    }} className={` flex justify-center items-center cursor-pointer ${subserver && isSub ? "bg-[#ffdd95] text-black" : "bg-white/10"} font-medium w-[100px] h-[30px]`}>MegaCloud</div>
                                                </div>

                                            </div>
                                            <div className="mx-[22px] flex gap-[50px] bg-[#242428] h-[50%] md: flex items-center">
                                                <div className="flex items-center">
                                                    <i class="fas fa-closed-captioning mr-2 text-[#ffdd95]"></i>
                                                    <div className="">Dub:</div>
                                                </div>
                                                <div className="flex text-[13px] gap-[10px]">
                                                    <div onClick={() => {
                                                        setDubServer(0);
                                                        setIsSub(0)
                                                    }} className={`rounded-[4px] flex justify-center items-center cursor-pointer ${!dubServer && !isSub ? "bg-[#ffdd95] text-black" : "bg-white/10"} font-medium w-[80px] h-[30px]`}>VidSrc</div>
                                                    <div onClick={() => {
                                                        setDubServer(1);
                                                        setIsSub(0)
                                                    }} className={`rounded-[4px] flex justify-center items-center cursor-pointer ${dubServer && !isSub ? "bg-[#ffdd95] text-black" : "bg-white/10"} font-medium w-[100px] h-[30px]`}>MegaCloud</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='px-[20px] xl:px-[0px] mt-[42px] xl:pt-[90px] xl:flex-[4] gap-[30px] flex-shrink-0  pb-[20px] xl:h-[600px]  flex flex-row xl:flex-col xl:justify-start'>
                            <div className='w-[120px] flex-shrink-0'>
                                <img src={imageURL} className='w-[120px] h-[177px]   ' />
                            </div>
                            <div className='flex flex-col gap-[20px]'>
                                <div className='text-[24px] font-medium'>
                                    {name}
                                </div>
                                <div className='flex justify-start'>
                                    <div className='flex gap-[2px]'>
                                        <div className='leading-[21px] bg-white text-black font-bold pl-[5px] pr-[5px] text-[12px] rounded-l-[4px]'>R</div>
                                        <div className='leading-[21px] bg-[#ffdd95] text-black font-bold pl-[5px] pr-[5px] text-[12px] '>HD</div>
                                        <div className='leading-[21px] bg-[#b0e3af] text-black font-bold pl-[5px] pr-[5px] text-[12px] '>
                                            <i class="fas fa-closed-captioning mr-1"></i>12
                                        </div>
                                        <div className='leading-[21px] bg-[#e3b5cd] text-black font-bold pl-[5px] pr-[5px] text-[12px] '>
                                            <i class="fas fa-microphone mr-1"></i> 12
                                        </div>
                                        <div className='leading-[21px] bg-[#FFfFff4A] text-white font-bold pl-[5px] pr-[5px] text-[12px]'>12</div>
                                        <div className='leading-[21px] pr-[4px] pl-[4px] text-[#FFfFff9A]'>•</div>
                                        <div className='leading-[21px] text-[13px] pr-[4px] '>{type}</div>
                                        <div className='leading-[21px] pr-[4px] text-[#FFfFff9A] hidden xl:flex'>•</div>
                                        <div className='leading-[21px] text-[13px] hidden xl:flex'>23min</div>
                                    </div>
                                </div>
                                <div className="w-full  pr-[0%] sm:pr-[10%] font-light text-[13px] line-clamp-5 xl:line-clamp-9 relative">
                                    {description}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="bg-[#121315] px-[60px]">
            <Sharing />
        </div>
        <div className='flex pt-[50px] md:px-[40px] px-[20px]'>
            <div className='flex-3'>
                <div>
                    <div className="pl-[15px] text-[#ffdd95] font-semibold text-[22px] pb-[30px]">Most Popular</div>
                    <Ctgridv2 path={"most_popular"} />
                </div>
                <div>
                    <div className="pl-[15px] text-[#ffdd95] font-semibold text-[22px] pt-[40px] pb-[10px]">New On AniWatch</div>
                    <Ctgridv2 path={"new"} />
                </div>
            </div>
            <div className=" flex-1 lg:flex hidden">
                <RightBar />
            </div>
        </div>
        <Footer />
    </div>
}

export default Watch