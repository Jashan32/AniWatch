import { useParams } from "react-router-dom"
import Navbar from "./navbar"
import {useState } from "react";
import Sharing from "./sharing";
import Ctgridv2 from "./ctgridV2";
import RightBar from "./rightBar";
import Footer from "./footer";

function Category() {
    const { category } = useParams();
    const lowetitle = category.replace("_", " ")
    return <div className="">
        <Navbar />
        <div className="h-[10px] md:h-[80px]"></div>
        <div className="bg-black px-[50px]">
            <Sharing />
        </div>
        <div className="text-[#ffdd95] text-[22px] font-semibold p-[20px] px-[40px]">
            {lowetitle.replace(/\b\w/g, (char) => char.toUpperCase())}
        </div>
        <div className='flex px-[40px]'>
            <div className='flex-3'>
                <Ctgridv2 path={category} type2={true} full={true}/>
            </div>
            <div className=" flex-1 xl:flex hidden">
                <RightBar />
            </div>
        </div>
        <Footer/>
    </div>
}
export default Category