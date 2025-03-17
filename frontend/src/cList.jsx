import Card from './card.jsx'
import './cList.css';
import { useState, useEffect } from "react"
import FloatInfo from './floatInfo.jsx';

function CList() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [visible, setVisible] = useState(false);
    const [isInCard, setIsInCard] = useState(false);
    const [isInFloat, setIsInFloat] = useState(false);
    const [index, setIndex] = useState(0)
    const [imagArray, setimageArray] = useState([]);
    const [nameArray, setName] = useState([]);
    const [count, setCount] = useState(0);
    const [id, setid] = useState([]);
    const [type, settype] = useState("");
    const [descriptionArray, setDescriptionArray] = useState([]);

    const handleMouseEnterCard = (index2, e) => {
        if (isInFloat == false) {
            setIndex(index2)
            let b = window.event
            setPosition({
                x: b.clientX,
                y: b.clientY
            });
            setIsInCard(true)
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
            try {
                const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/home/trendingList`);
                const data = await res.json();
                const imageUrls = data.sliderArray.map((x) => x.imageUrl
                );
                // Preload images
                const loadImages = imageUrls.map((src) => {
                    return new Promise((resolve, reject) => {
                        const img = new Image();
                        img.src = src;
                        img.onload = resolve;
                        img.onerror = reject;
                    });
                });
                // Wait until all images are loaded
                await Promise.all(loadImages);
                // Now update state
                setimageArray(imageUrls);
                setName(data.sliderArray.map((x) => x.title));
                setid(data.sliderArray.map((x) => x._id));
                settype(data.sliderArray.map((x) => x.type))
                setDescriptionArray(data.sliderArray.map((x) => x.description));
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    function nextC() {
        const x = window.innerWidth
        const y = 262
        const max_scrollable = 8 - x / y

        if (count >= max_scrollable + 1) {
            setCount(count)
        }
        else {
            setCount((count) => count + 1)
        }
    }


    function backC() {
        if (count == 0) {
            setCount(0)
        } else {
            setCount((count) => count - 1)
        }
    }

    function toahome(index) {
        window.location.href = `/name/${id[index]}`
    }

    return <div className='flex  relative'>
        <div onMouseEnter={handleMouseEnterFloat}
            onMouseLeave={handleMouseLeaveFloat}
            className={` ${visible ? "xl:flex opacity-100" : "opacity-0 pointer-events-none"} 
              transition-opacity duration-[300ms] bg-[#4e4e54]/60 
              backdrop-blur-xl rounded-md z-[2000] text-[20px] text-white 
              absolute h-[300px] w-[300px] hidden xl:flex `}
            style={{ position: 'fixed', top: position.y, left: position.x }} >
            <FloatInfo type={type[index]} name={nameArray[index]} description={descriptionArray[index]} id={id[index]} />

        </div>
        <div className='w-[100%] flex gap-[30px] overflow-hidden overflow-x-auto custom-scroll '>
            {nameArray.map((s, index) => (
                <div
                    onMouseEnter={(e) => handleMouseEnterCard(index, e)}
                    onMouseLeave={handleMouseLeaveCard}
                    onClick={() => toahome(index)} key={imagArray[index]} className='duration-200 transition-transform ' style={{ transform: `translateX(-${(count * 222)}px)` }}            > {/* Add a unique key */}
                    <Card card={imagArray[index]} cardsN={nameArray[index]} index={index + 1} />
                </div>
            ))}
        </div>
        <div className=' hidden md:flex md:flex-col pb-[40px] justify-between  gap-[10px] justify-end  pl-[20px] text-white mr-[20px]' >
            <div onClick={backC} className=' rounded-md p-[5px] bg-[#FFFFFF1A] cursor-pointer hover:bg-[#ffdd95] hover:text-black text-[24px] w-[40px] h-[111px] flex justify-center items-center'>
                <i class="fas fa-angle-left"></i>
            </div>
            <div onClick={nextC} className=' rounded-md p-[5px] bg-[#FFFFFF1A] cursor-pointer hover:bg-[#ffdd95] hover:text-black text-[24px] w-[40px] h-[111px] flex justify-center items-center'>
                <i class="fas fa-angle-right"></i>
            </div>
        </div>
    </div>
}



export default CList