import { useState, useEffect } from "react"
const titles = ["Demon Slayer: Kimetsu no Yaiba",
    "Pseudo Harem",
    "The Strongest Magician in the Demon Lord's Army Was a Human",
    "Bleach",
    "One Piece",
]
import bannerN1 from "./assets/banner7.jpg"
import bannerN2 from "./assets/banner8.jpg"
import banner3 from "./assets/banner9.jpg"
import newimg from "./assets/new.jpg"
import banner from "./assets/banner.jpg"
const slides = [newimg, banner, bannerN1, bannerN2, banner3]

export default function Slider2() {
    const [index, setIndex] = useState(0);
    const [animate, setAnimate] = useState(false);
    useEffect(() => {
        const interval = setInterval(() => {
            setAnimate(true);
            setTimeout(() => {
                setIndex((prev) => {
                    const newIndex = prev >= titles.length - 1 ? 0 : prev + 1;
                    return newIndex;
                });
                setAnimate(false);
            }, 200); // Match animation duration
        }, 5000);
        return () => clearInterval(interval);
    }, []); // Dependency array empty to only run once

    return <div className=" w-[100vw] h-[600px] scale-[120%] object-contain pl-[20px] flex">
        <div className=" relative w-full  mt-[50px]  flex  justify-end  overflow-hidden  text-white">
            <div className={`absolute  transition-transform duration-500 ${animate ? "translate-x-full opacity-0" : "translate-x-0 opacity-100"}`}>
                <img src={slides[index]} className="w-[1440px] h-full object-contain" />
            </div>
        </div>
    </div>
}