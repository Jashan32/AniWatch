import { useEffect, useRef, useState } from "react"
import Navbar from "./navbar"
import Post from "./post"
import { useAuth } from "./customHooks/loginOpen";
import Footer from "./footer";


function Community() {
  const { isLogInOpen, setIsLogInOpen } = useAuth();
  const [chatOpened, setChatOpened] = useState(false)
  const typed = useRef();
  const inbox = useRef();
  const [chats, setchats] = useState([]);
  const y = useRef();

  let chats2 = []

  useEffect(() => {
    y.current = new WebSocket(import.meta.env.VITE_WSS_URL)

    y.current.onmessage = (x) => {
      const p = JSON.parse(x.data)
      if(p.token == document.cookie.split("\\")[1]){
        p.token = true;
      }
      else{
        p.token =false
      }
      setchats(x => [...x, p])

    }

  }, [])

  useEffect(() => {
    console.log("Updated Chats:", chats);
  }, [chats]); // Runs when `chats` updates




  function sendmessage() {
    if (!document.cookie.split("\\")[1]) {
      console.log(isLogInOpen)
      setIsLogInOpen(true)
      console.log(isLogInOpen)
    }
    else {
      console.log(typed.current.value)
      const message = {
        message: typed.current.value,
        token: document.cookie.split("\\")[1]
      }
      // setchats([...chats , {message:typed.current.value,sender:document.cookie.split("\\")[1]}])
      console.log(y.current)
      y.current.send(JSON.stringify(message))
    }
  }






  return <div className="relative select-none">
    <Navbar />
    <div className=" absolute w-full h-screen  max-h-[700px] flex pt-[70px] ">
      <div className="z-2 absolute w-full h-[705px] bg-[linear-gradient(0deg,_#242428_0%,_transparent_50%)]          " ></div>
      <div className="relative w-full h-[705px] overflow-hidden">
        {/* Image */}
        <img
          src="https://pub-7e93347dff804c9b9eb01d9aa012ff19.r2.dev/cover.jpg"
          className="w-full h-full object-cover object-[50%_20%] opacity-30"
        />
        {/* Blur Overlay */}
        <div className="absolute inset-0 backdrop-blur-[10px]"></div>
      </div>
      <div className="absolute inset-0 h-[705px] mt-[70px] bg-[url('https://pub-7e93347dff804c9b9eb01d9aa012ff19.r2.dev/dotted_black_background%20(3).jpg')] opacity-100  mix-blend-multiply"></div>
    </div>
    <div className="relative z-9 flex flex-col gap-[40px] mt-[30px]">

      <div className=" flex z-3 mt-[70px]  text-[19px] font-semibold justify-center">
        <div className="flex gap-[30px]">

          <div className=" flex flex-col gap-[10px]">
            <div className="cursor-pointer text-[#888] hover:text-white">Super X</div>
            <div className="w-[60%] h-[3px] bg-[#ffdd95] mx-auto rounded-full"></div>
          </div>
          <div className=" flex flex-col gap-[10px]">
            <div className="cursor-pointer text-[#888] hover:text-white">Z Community</div>
            <div className="w-[60%] h-[3px] bg-[#ffdd95] mx-auto rounded-full"></div>
          </div>
          <div className=" flex flex-col gap-[10px]">
            <div className="cursor-pointer text-[#888] hover:text-white">My Zone</div>
            <div className="w-[60%] h-[3px] bg-[#ffdd95] mx-auto rounded-full"></div>
          </div>
        </div>
        {/* bg-[#242428]/70 */}
      </div>
      <div className="font-bold text-[32px] md:text-[64px] text-white flex justify-center">AniWatch Connect</div>
      <div className="z-9999 flex justify-center">
        <div className="w-[1240px] mx-[20px] md:mx-[90px] flex flex-col gap-[50px]">
          <div className={`z-9999      rounded-2xl ${chatOpened ? "h-[600px] bg-white/25 bg-[linear-gradient(0deg,_#313136_0%,_transparent_75%)] flex flex-col justify-between p-[10px]" : "h-[64px] flex justify-center items-center bg-white/10 backdrop-blur-[10px]"}`}>
            <div onClick={() => { setChatOpened(!chatOpened) }} className={`text-white cursor-pointer ${chatOpened ? "flex justify-end p-[10px]" : ""}`}>
              <span>
                <i class={`fas fa-${chatOpened ? "minus" : "plus"}-circle mr-2`}></i>
              </span>
              <span>
                {chatOpened ? "Hide chatbox" : "Show chatbox"}
              </span>
            </div>
            <div ref={inbox} className={`${chatOpened ? "overflow-y-auto flex flex-col w-[100%] h-[100%] gap-[20px] " : "hidden"} `}>
              {
                chats.map((x) => (
                  <div className={`flex gap-[15px] ${x.token?"justify-end":"justify-start"}`}>
                    <div><img className="rounded-full h-[40px]" src={x.profileImg} /></div>
                    <div className="flex flex-col bg-[#242428]/30 px-[20px] min-w-[250px] rounded-[6px] min-h-[60px] justify-between py-[7px]">
                      <div className="flex">
                          <div className="text-white font-semibold text-[13px]">{x.name}</div>
                      </div>
                      <div className="text-white font-light text-[13px]">
                        {x.message}
                      </div>

                    </div>
                  </div>
                ))
              }
            </div>
            <div className={`${chatOpened ? "flex" : "hidden"} flex gap-[20px] px-[20px]`}>
              <input ref={typed} placeholder="Send a message... (Slow mode is on)" className="bg-white h-[50px] w-[100%] focus:outline-none rounded-[4px] placeholder:text-[13px]" />
              <button onClick={sendmessage} className="bg-[#ffdd95] font-semibold rounded-[4px] text-[13px] md:text-[13px] px-[24px] h-[50px] cursor-pointer">Send</button>
            </div>
          </div>
          <div className="flex gap-[40px]">
            <div className=" [&>*]:cursor-pointer [&>*]:hover:bg-white/20 hidden md:flex flex-col gap-[10px] [&>*]:bg-white/10 [&>*]:rounded-full [&>*]:h-[43px] [&>*]:w-[280px] [&>*]:flex  [&>*]:items-center">
              <div className="flex justify-between px-[5%]">
                <div className="font-medium text-white ">#All</div>
                <div className="h-[16px] w-[75px] text-black bg-white rounded-full"> </div>
              </div>
              <div className="flex justify-between px-[5%]">
                <div className="font-medium text-[#ff718c] ">#Updates</div>
                <div className="h-[16px] w-[75px] text-black bg-white rounded-full"> </div>
              </div>
              <div className="flex justify-between px-[5%]">
                <div className="font-medium text-[#4da6ff] ">#General</div>
                <div className="h-[16px] w-[75px] text-black bg-white rounded-full"> </div>
              </div>
              <div className="flex justify-between px-[5%]">
                <div className="font-medium text-[#7df796] ">#Suggestion</div>
                <div className="h-[16px] w-[75px] text-black bg-white rounded-full"> </div>
              </div>
              <div className="flex justify-between px-[5%]">
                <div className="font-medium text-[#ffce71] ">#Question</div>
                <div className="h-[16px] w-[75px] text-black bg-white rounded-full"> </div>
              </div>
              <div className="flex justify-between px-[5%]">
                <div className="font-medium text-[#d4a2f7] ">#Discussion</div>
                <div className="h-[16px] w-[75px] text-black bg-white rounded-full"> </div>
              </div>
              <div className="flex justify-between px-[5%]">
                <div className="font-medium text-[#ff7e3f] ">#Feedback</div>
                <div className="h-[16px] w-[75px] text-black bg-white rounded-full"> </div>
              </div>
            </div>
            <div className="w-[100%] flex flex-col gap-[20px]">
              <div className="flex justify-between pr-[15px]">
                <div className="flex gap-[10px] ">
                  <div onClick={() => console.log(document.cookie.split("\\")[1])} className="cursor-pointer gap-[5px] text-[16px] text-black bg-white rounded-full h-[40px] px-[20px] flex justify-center items-center">
                    <div className="font-extrabold"><i class="fas fa-plus"></i></div>
                    <span className="sm:flex hidden">Create</span>
                  </div>
                  <div className="cursor-pointer hover:text-[#ffdd95]  gap-[5px] text-[16px] text-white rounded-full h-[40px] w-[108px] flex justify-center items-center">
                    <div className="font-extrabold"><i class="fas fa-list"></i></div>
                    <span className="">My Posts</span>
                  </div>
                </div>
                <div className="flex gap-[20px]">

                  <div className="text-white flex items-center cursor-pointer hover:text-[#ffdd95]">
                    <span>Short by</span>
                    <span><i class="fas fa-sort ml-2"></i></span>
                  </div>
                  <div className="text-white flex items-center cursor-pointer hover:text-[#ffdd95]">
                    <span>#All</span>
                    <span><i class="fas fa-sort ml-2"></i></span>
                  </div>
                </div>
              </div>
              <Post />
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
}

export default Community