import { StrictMode } from 'react'
import { useParams } from "react-router-dom";
import { createRoot } from 'react-dom/client'
import './index.css'
import './app.css'
import Navbar from './navbar.jsx'
import Hbanner from './home/hbanner.jsx'
import CList from './home/cList.jsx'
import CtGrid from './ctGrid.jsx'
import Sharing from './sharing.jsx'
import Adsb from './adsB.jsx'
import Nmenu from './nmenu.jsx'
import { useState, useEffect } from "react"
import Ctgridv2 from './ctgridV2.jsx'
import RightBar from './rightBar.jsx';
import Footer from './footer.jsx';

function Ahome() {
    const [imageURL, setimage] = useState()
    const [name, setname] = useState()
    const [description, setDescription] = useState()
    const { id } = useParams();

    useEffect(async () => {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/ahome/ahome/${id}`, {
            method: "GET"
        });
        const data = await res.json()
        const data2 = data.data
        setimage(data2.imageUrl)
        setname(data2.title)
        setDescription(data2.description)
    }, [])

    function towatch() {
        window.location.href = `/watch/${id}/0`
    }

    return <div className='font-primary'>

        <Navbar />
        <div className='bg-[#242428]  w-full'> </div>
        <div className="relative h-[1150px] xl:h-[600px] bg-cover bg-center">
            <div
                className="absolute inset-0 bg-black bg-opacity-50 bg-center bg-cover filter grayscale "
                style={{ backgroundImage: `url(${imageURL})` }}
            ></div>
            <div className="relative text-white flex  h-full">
                <div className='bg-black/40 backdrop-blur-[40px] w-[100%]'>
                    <div className="xl:flex ">

                        <div className='xl:flex-[7] flex-shrink-0 flex pt-[130px] sm:flex-row flex-col'>
                            <div className='sm:ml-[20px] xl:ml-[150px] min-w-[180px] flex sm:justify-none justify-center'>
                                <img src={imageURL} className='w-[180px] h-[256px]   ' />
                            </div>
                            <div className=' w-[100%] text-white sm:pl-[50px] flex flex-col gap-[10px] sm:items-start items-center'>
                                <div className=' hidden xl:flex '>
                                    Home • TV • {name}
                                </div>
                                <div className=' text-[40px] font-medium'>
                                    {name}
                                </div>
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
                                    <div className='leading-[21px] text-[13px] pr-[4px] '>TV</div>
                                    <div className='leading-[21px] pr-[4px] text-[#FFfFff9A]'>•</div>
                                    <div className='leading-[21px] text-[13px] '>23min</div>
                                </div>
                                <div className='flex gap-[20px] mt-[22px] '>
                                    <div onClick={towatch} className='cursor-pointer bg-[#ffdd95] text-black pl-[20px] pr-[20px] rounded-[30px] pt-[8px] pb-[8px]'>
                                        <i class="fas fa-play mr-2"></i>
                                        Watch now
                                    </div>
                                    <div className='cursor-pointer flex justify-center items-center bg-white text-black pl-[20px] pr-[20px] rounded-[30px] pt-[8px] pb-[8px]'>
                                        <div className='text-[13px]'>
                                            <i class="fas fa-plus mr-2 " ></i>
                                        </div>
                                        Add to List
                                    </div>
                                </div>
                                <div>
                                    <div className='pl-[20px] pr-[20px]'>
                                        <div className="w-full  pr-[0%] sm:pr-[20%] font-light text-[13px] line-clamp-3 relative">
                                            {description}
                                        </div>
                                        <span className=" cursor-pointer ">
                                            +more
                                        </span>
                                    </div>
                                </div>
                                <Sharing />
                            </div>
                        </div>
                        <div className=' xl:flex-[2] flex-shrink-0 bg-[#FFFFFF1A] pb-[20px] xl:h-[600px] pl-[20px]  flex  flex-col xl:justify-center'>
                            <div className='pt-[20px] flex flex-col gap-[8px] pb-[8px] text-[13px] border-b border-white/20 mr-[20px]'>
                                <div>
                                    <span className='font-semibold '> Japanese:</span>
                                    <span className='font-light'> ダンダダン</span>
                                </div>
                                <div>
                                    <span className='font-semibold'> Aired:</span>
                                    <span className='font-light'> Oct 4, 2024 to Dec 20, 2024</span>
                                </div>
                                <div>
                                    <span className='font-semibold'> Premiered:</span>
                                    <span className='font-light'> Fall 2024</span>
                                </div>
                                <div>
                                    <span className='font-semibold'> Duration:</span>
                                    <span className='font-light'> 23m</span>
                                </div>
                                <div>
                                    <span className='font-semibold'> Status:</span>
                                    <span className='font-light'> Finished Airing</span>
                                </div>
                                <div>
                                    <span className='font-semibold'> MAL Score:</span>
                                    <span className='font-light'> 8.73</span>
                                </div>

                            </div>
                            <div className="h-[50px] border-b border-white/20 flex items-center gap-[7px]">
                                <div>Genre: </div>
                                <div className='text-[12px] border border-white/50 rounded-[20px] pt-[2px] pb-[2px] pl-[8px] pr-[8px]'> Action</div>
                                <div className='text-[12px] border border-white/50 rounded-[20px] pt-[2px] pb-[2px] pl-[8px] pr-[8px]'> Comedy</div>
                                <div className='text-[12px] border border-white/50 rounded-[20px] pt-[2px] pb-[2px] pl-[8px] pr-[8px]'> Supernatural</div>
                            </div>
                            <div className='mt-[10px]'>
                                <span className='font-semibold text-[13px]'> Studios:</span>
                                <span className='font-light text-[13px]'> Science SARU</span>
                            </div>
                            <div>
                                <span className='font-semibold text-[13px]'> Producers:</span>
                                <span className='font-light text-[13px]'> Mainichi Broadcasting System</span>
                            </div>
                        </div>
                    </div>
                    <div className='flex pt-[50px]'>
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
            </div>
        </div>
    </div>
}

export default Ahome