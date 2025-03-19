import { useEffect, useRef, useState } from "react";
import { useAuth } from "../customHooks/loginOpen";



function Chatbox() {
    const inbox = useRef();
    const [chatOpened, setChatOpened] = useState(false)
    const { isLogInOpen, setIsLogInOpen } = useAuth();
    const typed = useRef();
    const y = useRef();
    const [chats, setchats] = useState([]);


    let chats2 = []


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


    useEffect(() => {
        y.current = new WebSocket(import.meta.env.VITE_WSS_URL)

        y.current.onmessage = (x) => {
            const p = JSON.parse(x.data)
            if (p.token == document.cookie.split("\\")[1]) {
                p.token = true;
            }
            else {
                p.token = false
            }
            setchats(x => [...x, p])

        }

    }, [])

    useEffect(() => {
        console.log("Updated Chats:", chats);
    }, [chats]); // Runs when `chats` updates



    return <div className={`z-9999      rounded-2xl ${chatOpened ? "h-[600px] bg-white/25 bg-[linear-gradient(0deg,_#313136_0%,_transparent_75%)] flex flex-col justify-between p-[10px]" : "h-[64px] flex justify-center items-center bg-white/10 backdrop-blur-[10px]"}`}>
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
                    <div className={`flex gap-[15px] ${x.token ? "justify-end" : "justify-start"}`}>
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

}



export default Chatbox