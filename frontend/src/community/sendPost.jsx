import React, { useEffect, useReducer, useRef } from "react"
import { useAuth } from "../customHooks/loginOpen";

const SendPost = React.memo(({create,post})=>{
    const { isLogInOpen, setIsLogInOpen } = useAuth();
    const titleRef = useRef()
    const postRef = useRef()

    useEffect( ()=>{
       async function x () {
            if(post==true){
              if(!document.cookie.split("\\")[1]){
                setIsLogInOpen(true)
              }
              else{
                const title = titleRef.current.value
                const post = postRef.current.value
                const token = document.cookie.split("\\")[1]
                console.log(document.cookie.split("\\"))
                const data = await fetch(`${import.meta.env.VITE_SERVER_URL}/community/post`,{
                    method:"POST",
                    headers:{
                        title:title,
                        post:post,
                        token:token
                    }
                })
                const resData = await data.json()
                titleRef.current.value=""
                postRef.current.value=""
              }

    
            }
        }
        x()
    },[post])

    return <div className={`${create ? "" : "hidden"}`}>

    <div className="w-[100%] h-[230px]  backdrop-blur-[10px]  flex">

      <div className="bg-white/22 w-full rounded-[16px]" >
        <div className="bg-black/20 h-[30%] rounded-t-[16px]">

          <textarea ref={titleRef} className="p-[10px] w-full h-full text-white text-[24px]  focus:outline-none" placeholder="Enter Title.."></textarea>
        </div>
        <div className="bg-white/10 h-[70%] rounded-b-[16px]">
          <textarea ref={postRef} className="p-[10px] text-indent-5 w-full h-full text-white text-[24px]  focus:outline-none placeholder:flex placeholder:justify-center" placeholder="Your text here"></textarea>
        </div>

      </div>
    </div>

  </div>
})
export default SendPost