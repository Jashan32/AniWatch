import { Slider } from './slider.jsx'

function Hbanner() {

    return <div className=''>
        <div className="hidden xl:flex z-1 absolute w-full h-[600px] bg-[linear-gradient(90deg,_#242428_25%,_transparent_50%)] " ></div>
        <div className="hidden xl:flex z-1 absolute w-full h-[600px] bg-[linear-gradient(180deg,_#242428_0%,_transparent_25%)] " ></div>
        <div className="flex sm:hidden z-90 absolute w-full h-[350px] bg-[linear-gradient(90deg,_#242428_0%,_transparent_50%)]"></div>
        <div className="hidden sm:flex z-90 absolute w-full h-[600px] bg-[linear-gradient(0deg,_#242428_0%,_transparent_50%)]"></div>
        <div className="flex sm:hidden z-90 absolute w-full h-[350px] bg-[linear-gradient(0deg,_#242428_0%,_transparent_50%)]"></div>
        <div className="flex xl:hidden  z-1 absolute w-full h-[350px] sm:h-[600px] bg-black/60 " ></div>
        <div className=" hidden xl:flex z-1 absolute w-full h-[600px] bg-[linear-gradient(-90deg,_#242428_0%,_transparent_30%)] flex justify-end flex-col  " >
            <div className=" hidden text-white z-1 w-full h-[300px] bg-gradient-to-t from-[#242428] to-transparent">
            </div>
        </div>
        <Slider />
    </div>
}

export default Hbanner