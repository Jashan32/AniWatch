import { useState, useEffect } from "react"
import { data } from "react-router-dom";

function Slider() {
  const [slides, setSlides] = useState([]);
  const [id, setid] = useState([]);
  const [titles, setTitles] = useState([]);
  const [description, setDescriptions] = useState([]);
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/home/slider`);
        const data = await res.json();
        const imageUrls = data.sliderArray.map((x) => x.bannerURL);
        console.log(imageUrls)

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

        setDescriptions(data.sliderArray.map((x) => x.description));
        // Now update state
        setSlides(imageUrls);
        setTitles(data.sliderArray.map((x) => x.title));
        setid(data.sliderArray.map((x) => x._id));
        setimg(data.sliderArray.map((x) => x.imageUrl));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);


  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(true);
      let indexV = index
      // console.log(titles.length)
      if (indexV < titles.length - 1) {
        indexV += 1
      }
      else {
        indexV = 0
      }
      setTimeout(() => {
        setIndex(indexV);
        setAnimate(false);
      }, 150); // Match animation duration
    }, 10000);

    return () => clearInterval(interval);
  }, [index, titles]); // Dependency array empty to only run once
  // /name/${id[index]}
  function toahome() {
    window.location.href = `/name/${id[index]}`
  }
  function toWatch() {
    window.location.href = `/watch/${id[index]}/0`
  }

  return <div className="w-full overflow-hidden relative flex justify-center">

    <div className=" w-[100vw] h-[350px] sm:h-[400px] sm:h-[600px]  object-contain flex">

      <div className=" relative w-full   flex  justify-end  overflow-hidden  text-white">
        <div
          className={`absolute  transition-transform duration-500 ${animate ? "translate-x-full opacity-0" : "translate-x-0 opacity-100"}`}>
          <img src={slides[index]} className="2xl:w-[2000px] sm:w-[1440px] w-full min-h-[330px] sm:h-[600px] scale-[1] sm:scale-[1]  object-cover" />
        </div>
      </div>
    </div>
    <div className="absolute ml-[30px] w-[100vw]   sm:mt-[155px] pl-[20px] flex flex-col justify-end ">
      <div className="z-[100] relative w-full pb-[60px] h-[350px] sm:h-[600px] sm:justify-start sm:flex-row flex-col justify-end sm:mt-[50px]  flex  overflow-hidden  text-white ">
        <div className={`absolute flex flex-col sm:gap-[40px] transition-transform duration-500 ${animate ? "translate-x-full opacity-0" : "translate-x-0 opacity-100"}`}>
          <div className="text-[#ffdd95]  sm:text-[18px] text-[14px] "> #{index + 1} Spotlight </div>
          <div className="h-auto">
            <div className="sm:text-[48px] text-[20px] font-bold w-[300px] sm:w-[600px] overflow-hidden line-clamp-2 ">{titles[index]}</div>
            <div className=" hidden sm:block">
              <div className="text-[0.95em] font-light max-w-[600px] overflow-hidden line-clamp-3 ">{description[index]}</div>
            </div>
          </div>
          <div className="flex gap-[10px] mt-[20px]">
            <div onClick={() => toWatch()} className="cursor-pointer bg-[#ffdd95]  sm:text-[16px] text-[14px] text-[black] rounded-[30px] py-[10px] pl-[16px] pr-[16px] w-[150px] flex justify-center items-center">
              <i class="fas fa-play-circle mr-2"></i>
              Watch Now
            </div>
            <div onClick={() => toahome()} className="cursor-pointer bg-[#56565b] flex justify-center items-center rounded-[30px] w-[95px] h-[42]">
              Detail
              <i class="fas fa-angle-right ml-2"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
}

export { Slider };