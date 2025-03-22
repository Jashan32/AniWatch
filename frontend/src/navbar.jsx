import './App.css'
import './index.css'
import logoimg from "./assets/logo.png"
import warning from "./assets/warning.png"
import livesvg from "./assets/live.svg"
import { useState, useEffect, useRef } from "react"
import { useAuth } from "./customHooks/loginOpen";
import RecaptchaForm from './recaptcha'
import Socials from './socials'
import useDebounce from './customHooks/useDebounce'

function Navbar() {

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [str, setstr] = useState("");
  const [captchaToken, setCaptchaToken] = useState(null);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [isNavbarOpen2, setIsNavbarOpen2] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordRef2 = useRef();
  const captchaRef = useRef();
  const [register, setRegister] = useState(false)
  const rememberRef = useRef()
  const nameRef = useRef();
  const [loginError, setLoginError] = useState("")
  const [lgoinErrVisi, setLoginErrVisi] = useState(false)
  const [errorPosition, setErrorPosition] = useState({})
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [isLoggedIn2, setIsLoggedIn2] = useState(false)
  const [imgUrl, setImgUrl] = useState("")
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [userEmail, setUserEmail] = useState("")
  const userDataRef = useRef();
  const [random, setrandom] = useState("")
  const [username, setusername] = useState("")
  const [scrolled, setScrolled] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const debouncedValue = useDebounce(inputVal, 500)
  const [searchVisibility, setSearchVisibilty] = useState(false)
  const [searchData, setSearchData] = useState([])
  const [language, setLanguage] = useState(true)
  const { isLogInOpen, setIsLogInOpen } = useAuth();
  const [isLogInOpen2, setIsLogInOpen2] = useState(false);

  function searchChange(e) {
    if (e.target.value == "") {
      setSearchData([])
    }
    setInputVal(e.target.value)
  }

  useEffect(() => {
    if (!debouncedValue) return; // Avoid unnecessary fetch calls if input is empty

    const fetchData = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/watch/search/${inputVal}`)
        const resdata = await res.json();
        const resdata2 = resdata.data
        setSearchData(resdata2)
      } catch (error) {
        console.error("Fetch Error:", error);
      }
    };

    fetchData(); // Call the async function
  }, [debouncedValue]); // Run when debouncedValue changes

  const handleMouseEnterCard = (str, e) => {
    setstr(str);
    const rect = e.currentTarget.getBoundingClientRect();


    setPosition({
      x: rect.left + rect.width / 2,  // Center tooltip relative to the element
      y: rect.bottom + window.scrollY + 10  // Add 10px for spacing below
    });
    setVisible(true);
  };

  const handleMouseLeaveCard = () => {
    setVisible(false)
  };

  useEffect(() => {
    const random_pick = async () => {
      const resp = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/home/category`, {
        method: "GET",
        headers: {
          "category": "spotlight", // Specify the content type
        }
      })
      const resData2 = await resp.json()
      setrandom(resData2.categorydata[Math.floor(8 * Math.random())]._id);
    }
    random_pick()
  }, [])

  useEffect(() => {
    const stored_language = localStorage.getItem("language");
    setLanguage(stored_language == "true");
  }, [])

  // Use effect to toggle body overflow on navbar open/close
  useEffect(() => {
    if (isNavbarOpen) {
      // Prevent scrolling when navbar is open
      document.body.style.overflow = "hidden";
    } else {
      // Allow scrolling when navbar is closed
      document.body.style.overflow = "auto";
    }

    setTimeout(() => {
      setIsNavbarOpen2(isNavbarOpen)

    }, 0);

    // Cleanup the effect
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isNavbarOpen]);

  function nMToggle() {
    setIsNavbarOpen(true)

  }

  function ncloser() {
    setIsNavbarOpen2(false)
    setTimeout(() => {

      setIsNavbarOpen(false)
    }, 100);
  }

  const handleClickOutside = (event) => {
    if (userDataRef.current && !userDataRef.current.contains(event.target)) {
      setIsProfileOpen(false); // Perform the action (e.g., closing the div)
    }
  };

  useEffect(
    () => {
      const fetchUserData =
        async () => {
          document.addEventListener("mousedown", handleClickOutside);
          const splitted = document.cookie.split("\\")
          const narray = []
          let promisifiedcookie = splitted.map((x, index) => {
            return new Promise((resolve, reject) => {
              if (index % 2 == 1) {
                narray.push(x)
              }
              resolve(x)
            })
          })
          await Promise.all(promisifiedcookie)
          if (narray[0]) {
            setIsLoggedIn(true)

            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/data`, {
              method: "GET",
              headers: { jwtToken: narray[0] }
            })
            const userdata = await response.json()
            setImgUrl(userdata.profileImg);
            setusername(userdata.name)
            setUserEmail(userdata.email)
          }
          else { setIsLoggedIn(false) }
        }
      fetchUserData()
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isLoggedIn2])

  // Use effect to toggle body overflow on navbar open/close
  useEffect(() => {
    if (isLogInOpen) {
      // Prevent scrolling when navbar is open
      document.body.style.overflow = "hidden";
    } else {
      // Allow scrolling when navbar is closed
      document.body.style.overflow = "auto";
    }
    setTimeout(() => {
      setIsLogInOpen2(isLogInOpen)
    }, 0);
    // Cleanup the effect
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isLogInOpen]);

  function remberfunction() {
    rememberRef.current.checked = !rememberRef.current.checked
  }


  function loginopen() {
    rememberRef.current.checked = true
    setIsLogInOpen(true)
  }

  function loginclose() {
    setIsLogInOpen2(false)
    setRegister(false)
    setTimeout(() => {
      setIsLogInOpen(false)
    }, 100);
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const emptyError = (x, y) => {
    const rect = x.current.getBoundingClientRect();
    setErrorPosition({
      x: rect.left + 100,  // Center tooltip relative to the element
      y: rect.bottom + 10  // Add 10px for spacing below
    })
    setLoginError(y)
    setLoginErrVisi(true)
    setTimeout(() => {
      setLoginErrVisi(false)
    }, 2000)
  }

  const handleLogin = async () => {

    if (!captchaToken) {
      emptyError(captchaRef, "Please click \"I'm not a robot\"")
    }
    else if (!emailRef.current.value) {
      emptyError(emailRef, "Email can not be blank")
    }
    else if (!passwordRef.current.value) {
      emptyError(passwordRef, "Password cannot be blank")
    }
    else {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/login/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: captchaToken,
          email: emailRef.current.value,
          password: passwordRef.current.value
        }
        ),
      });
      const data = await response.json();
      if (data.message == "login_sucessfull") {
        document.cookie = `jwtToken=${data.jwtToken}; path=/; SameSite=Strict;`;
        const splitted = document.cookie.split("\\")
        const narray = []
        let promisifiedcookie = splitted.map((x, index) => {
          return new Promise((resolve, reject) => {

            if (index % 2 == 1) {
              narray.push(x)
            }
            resolve(x)
          })
        })
        await Promise.all(promisifiedcookie);
        setIsLogInOpen(false)
        setIsLoggedIn(true)
        setIsLoggedIn2(true)
      }
      else if (data.message == "captcha_failed") {
        emptyError(captchaRef, "Captcha Failed")
      }
      else if (data.message == "User does not exist") {
        emptyError(emailRef, "User does not exist")
      }
      else if (data.message == "Invalid email or password") {
        emptyError(emailRef, "Invalid email or password")
      }
    }
    grecaptcha.reset();
    setCaptchaToken("")
  };

  const handleRegister = async () => {

    if (!captchaToken) {
      emptyError(captchaRef, "Please click \"I'm not a robot\"")
    }
    else if (!nameRef.current.value) {
      emptyError(nameRef, "Name can not be blank")
    }
    else if (!emailRef.current.value) {
      emptyError(emailRef, "Email can not be blank")
    }
    else if (!passwordRef.current.value) {
      emptyError(passwordRef, "Password cannot be blank")
    }
    else if (!passwordRef2.current.value) {
      emptyError(passwordRef2, "Password cannot be blank")
    }
    else if (passwordRef2.current.value == passwordRef.current.value) {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/login/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: captchaToken,
          name: nameRef.current.value,
          email: emailRef.current.value,
          password: passwordRef.current.value
        }
        ),
      });
      const data = await response.json();
      if (data.message == "registered_sucessfully") {
        setRegister(!register)
        document.cookie = `jwtToken=${data.jwtToken}; path=/; SameSite=Strict;`;
        const splitted = document.cookie.split("\\")
        const narray = []
        let promisifiedcookie = splitted.map((x, index) => {
          return new Promise((resolve, reject) => {

            if (index % 2 == 1) {
              narray.push(x)
            }
            resolve(x)
          })
        })
        await Promise.all(promisifiedcookie);
        setIsLogInOpen(false)
        setIsLoggedIn(true)
        setIsLoggedIn2(true)
      }
      else if (data.message == "captcha_failed") {
        setLoginError(data.message)
        alert("Captcha Failed")
      }
      else if (data.message == "Invalid email format") {
        emptyError(emailRef, "Invalid email format")
      }
      else if (data.message == "Password must be at least 5 characters") {
        setLoginError(data.message)
        alert(data.message)
      }
      else if (data.message == "Name must be 35 characters or less") {
        setLoginError(data.message)
        alert(data.message)
      }
      else if (data.message == "email_elredy_exist") {
        alert(data.message)
      }
      else if (data.message !== "registered_sucessfully") {
        alert(data.message)
      }
    }
    else {
      const rect = passwordRef2.current.getBoundingClientRect();
      setErrorPosition({
        x: rect.left + 100,  // Center tooltip relative to the element
        y: rect.bottom + 10  // Add 10px for spacing below
      })
      setLoginError("Confirm password does not match")
      setLoginErrVisi(true)
    }
    grecaptcha.reset();
    setCaptchaToken("")
  }

  function loggingOut() {
    document.cookie = "jwtToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    location.reload();
  }

  return (
    <div className={`font-primary max-[760px]:bg-[#242428] pb-[0px] md:pb-[0px]  z-[200] fixed z-10 relative w-full bg-gradient-to-b from-[#242428] to-transparent flex`}>
      {visible && (
        <div
          className="text-center max-w-[200px] absolute bg-white text-black text-sm font-medium py-2 px-3 rounded-md shadow-md transform -translate-x-1/2"
          style={{ top: position.y, left: position.x }}
        >
          <div className="absolute w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[6px] border-b-white top-[-6px] left-1/2 transform -translate-x-1/2"></div>
          {str}
        </div>
      )}
      {lgoinErrVisi && (
        <div
          className="cursor-default flex flex-row ietms-center text-center gap-[7px] z-[9990] text-center max-w-[200px] absolute bg-white text-black text-sm font-medium py-2 px-3 rounded-md shadow-md transform -translate-x-1/2"
          style={{ top: errorPosition.y, left: errorPosition.x }}
          onClick={() => setLoginErrVisi(false)}
        >
          <div className=" absolute w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[6px] border-b-white top-[-6px] left-1/9 transform -translate-x-1/2 text-[900px]"></div>


          <img src={warning} className='h-[25px] object-contain' /> <div>{loginError}</div>
        </div>
      )}
      <div
        onClick={ncloser}
        className={`fixed bg-[#242428]/60 absolute z-[201] ${isNavbarOpen ? "flex" : "hidden"} backdrop-blur-md overflow-y-hidden text-[100px] text-white h-[100vh] w-[100vw]`}>
        <div
          className={`  flex flex-col gap-[15px] h-[100vh] bg-[#FFFFFF1A] transition-all ease-in-out delay-10 duration-100 overflow-hidden ${isNavbarOpen2 ? "w-[260px]" : "w-[0px]"} `}>
          <div className='w-full pt-[20px] pl-[10px]'>
            <div className='hover:bg-[#6c757d] cursor-pointer text-[14px] bg-[#56565b] w-[131px] h-[40px] rounded-[30px] flex justify-center items-center '> <i class=" text-[10px] font-black fas fa-angle-left mr-2"></i> Close Menu</div>
          </div>
          <a href='/community' className='w-full  pl-[10px]'>
            <div className='cursor-pointer  bg-[#222327] w-[239px] h-[36px] rounded-[30px] flex justify-center items-center text-[13px] font-medium'> <i class="text-[13px] fas fa-comments mr-2 text-[#ffdd95]"></i> Community</div>
          </a>
          <div>
            <a href='/' className='hover:text-[#ffdd95] cursor-pointer text-[14px] font-semibold flex items-center p-[15px] border-b border-white/5'> Home </a>
            <a href='/category/subbed_anime' className='hover:text-[#ffdd95] cursor-pointer text-[14px] font-semibold flex items-center p-[15px] border-b border-white/5'> Subbed Anime </a>
            <a href='/category/dubbed_anime' className='hover:text-[#ffdd95] cursor-pointer text-[14px] font-semibold flex items-center p-[15px] border-b border-white/5'> Dubbed Anime </a>
            <a href='/category/most_popular' className='hover:text-[#ffdd95] cursor-pointer text-[14px] font-semibold flex items-center p-[15px] border-b border-white/5'> Most Popular </a>
            <a href='/category/movies' className='hover:text-[#ffdd95] cursor-pointer text-[14px] font-semibold flex items-center p-[15px] border-b border-white/5'> Movies </a>
            <a href='/category/tv_series' className='hover:text-[#ffdd95] cursor-pointer text-[14px] font-semibold flex items-center p-[15px] border-b border-white/5'> TV Series </a>
            <a href='/category/ovas' className='hover:text-[#ffdd95] cursor-pointer text-[14px] font-semibold flex items-center p-[15px] border-b border-white/5'> OVAs </a>
            <a href='/category/specials' className='hover:text-[#ffdd95] cursor-pointer text-[14px] font-semibold flex items-center p-[15px] border-b border-white/5'> Specials </a>
            <a href='/category/events' className='hover:text-[#ffdd95] cursor-pointer text-[14px] font-semibold flex items-center p-[15px] border-b border-white/5'> Events </a>
            <a href='https://aniwatchtv.to/app-download' className='hover:text-[#ffdd95] cursor-pointer text-[14px] font-semibold flex items-center p-[15px] border-b border-white/5'> Aniwatch App </a>
            <a className='hover:text-[#ffdd95] cursor-pointer text-[14px] font-semibold flex items-center p-[15px] border-b border-white/5'> Genre </a>
          </div>
        </div>
      </div>
      <div onClick={loginclose} className={` ${isLogInOpen ? "flex" : "hidden"} fixed flex absolute z-[999] h-[100vh] w-[100vw] bg-[#1c1c1f]/80 backdrop-blur-none`}>
        <div onClick={(e) => {
          e.stopPropagation();
          setLoginErrVisi(false);
        }} className={` w-[500px] pl-[60px] pr-[60px] bg-[#333]/70 flex flex-col gap-[20px] rounded-4xl mx-auto  ease-in-out delay-10 duration-100 backdrop-blur-xl overflow-hidden transition-translate pb-10 max-h-[90vh] overflow-scroll ${register ? " my-auto h-auto" : isLogInOpen2 ? "my-auto h-auto" : "  translate-y-10 h-[600px]"}`}>
          <div className=' font-semibold text-white text-center text-[20px] pt-[25px]'>
            {register ? "Create an Account" : "Welcome back!"}
          </div>
          <div className={`flex flex-col gap-[10px] ${!register ? "hidden" : "flex"}`}>
            <div className={`font-semibold text-white opacity-50  text-[11px] tracking-[1px] `}>
              YOUR NAME
            </div>
            <input ref={nameRef} placeholder='Name' className="rounded-sm outline-none pl-[10px] h-[33px] text-[#495057] placeholder-[#495057] bg-white placeholder:text-[14px] text-[13px] w-full leading-[33px]" />
          </div>
          <div className='flex flex-col gap-[10px]'>
            <div className='font-semibold text-white opacity-50  text-[11px] tracking-[1px]'>
              EMAIL ADDRESS
            </div>
            <input ref={emailRef} placeholder='name@email.com' className="rounded-sm outline-none pl-[10px] h-[33px] text-[#495057] placeholder-[#495057] bg-white placeholder:text-[14px] text-[13px] w-full leading-[33px]" />
          </div>
          <div className='flex flex-col gap-[10px]'>
            <div className='font-semibold text-white opacity-50  text-[11px] tracking-[1px]'>
              PASSWORD
            </div>
            <input type='password' ref={passwordRef} placeholder='Password' className="rounded-sm outline-none pl-[10px] h-[33px] placeholder-[#495057] bg-white text-[13px] placeholder:text-[14px] w-full leading-[33px]" />
          </div>
          <div className={`flex ${!register ? "hidden" : "flex"} flex-col gap-[10px]`}>
            <div className='font-semibold text-white opacity-50  text-[11px] tracking-[1px]'>
              CONFIRM PASSWORD
            </div>
            <input type='password' ref={passwordRef2} placeholder='Confirm Password' className="rounded-sm outline-none pl-[10px] h-[33px] placeholder-[#495057] bg-white text-[13px] placeholder:text-[14px] w-full leading-[33px]" />
          </div>
          <div className={`flex justify-between ${register ? "hidden" : "flex"}`}>
            <div className='flex gap-[10px] text-white'>
              <input ref={rememberRef} type='checkbox' />
              <div onClick={remberfunction} className='cursor-default	'> Remember me</div>
            </div>
            <div className=' cursor-pointer text-[#ffdd95]'>
              Forgot password?
            </div>
          </div>
          <div ref={captchaRef}>
            <RecaptchaForm onVerify={setCaptchaToken} />
          </div>
          <button onClick={(e) => {
            handleLogin();
            e.stopPropagation();
          }}
            className={`bg-[#ffdd95] h-[47px] rounded-md cursor-pointer ${register ? "hidden" : ""}`}> Login</button>
          <button onClick={(e) => {
            handleRegister();
            e.stopPropagation();
          }}
            className={`bg-[#ffdd95] h-[47px] rounded-md cursor-pointer ${!register ? "hidden" : ""}`}> Register</button>
          <div className='text-white flex gap-[5px] justify-center font-light text-[16px] font-primary'>
            <span>{register ? "Have an account?" : "Don't have an account?"} </span> <span className='text-[#ffdd95] cursor-pointer' onClick={() => setRegister(!register)}>{register ? "Login" : "Register"}</span> {register ? "" : "or"} <span className='text-[#ffdd95] cursor-pointer'>{register ? "" : "Verify"}</span>
          </div>
        </div>
      </div>
      <div className={` pt-[15px] pl-[20px] pr-[20px] xl:pr-[30px] pb-[10px] xl:pl-[30px] max-[760px]:bg-[#242428]  z-[200] fixed z-10 absolute w-full bg-gradient-to-b from-[#242428] to-transparent flex   ${scrolled ? "bg-[#242428]/70 backdrop-blur-md" : ""}`}>
        <div className="flex items-center justify-center h-[40px]">
          <i onClick={nMToggle} className="fas fa-bars text-xl text-white text-[24px] cursor-pointer"></i>
        </div>
        <a href="/">
          <img  draggable="false" src={logoimg} className='cursor-pointer w-[121] h-[40px] ml-[30px] mr-[25px] box-content ' />
        </a>
        <div className=' hidden lg:flex flex w-[300px] 2xl:w-[400px]  h-[40px] bg-white  box-content'>
          <input onFocus={() => { setSearchVisibilty(true) }} onBlur={() => setTimeout(() => {
            setSearchVisibilty(false);
            setSearchData([]);

          }, 1000)} onChange={searchChange} placeholder='Search anime...' className=' focus:outline-none cursor:auto text-[14px]  bg-white h-[40px] w-[300px] pl-[15px]   box-content' />
          <div className={`${searchVisibility ? "max-h-[2000px] " : "max-h-[0px]"} transition transition-all duration-[400ms] absolute  bg-[#414248]  hidden lg:flex flex w-[300px] 2xl:w-[400px] mt-[40px]`}>
            <div className={`${searchVisibility ? "flex flex-col" : "hidden"} w-[100%]`}>
              {
                searchData.map((x, index) => (
                  index < 5 &&
                  <a href={`/name/${x._id}`} className='hover:bg-white/10 group flex p-[10px] gap-[15px] border-b border-dashed border-[#5c5d63]'>
                    <div>
                      <img src={x.imageUrl} className=' h-[70px] min-w-[50px] max-w-[50px]' />
                    </div>
                    <div className="">
                      <div className="text-[14px] font-semibold text-white group-hover:text-[#ffdd95] line-clamp-1 h-[20px]">
                        {x.title}
                      </div>
                      <div className="text-[13px] text-white/50 font-light line-clamp-1 h-[20px]">
                        {x.description}
                      </div>
                    </div>
                  </a>
                ))
              }
              <div className={` ${searchData.length > 0 ? "flex" : "hidden"} cursor-pointer bg-[#ffdd95] flex justify-center items-center h-[60px]`}>
                <div>
                  <span className='text-[15px]'>View all results</span>
                  <span className='font-black'>
                    <i class="fa fa-angle-right ml-2"></i>
                  </span>
                </div>
              </div>
              <div className={`${searchData.length == 0 && debouncedValue.length > 0 ? "flex" : "hidden"} w-[100%] pl-[10px] items-center h-[45px] text-white hover:text-[#ffdd95] `}>
                No results found!
              </div>
            </div>
          </div>
          <div className='cursor-pointer my-auto'>
            <i class="fas fa-search text-[16px]  mr-[15px]"></i>
          </div>
          <button className='cursor-pointer text-[.8rem] pl-[6px] pr-[6px]  h-[26px] pointer bg-[#757575] text-[#fff] br-[3px] rounded-[3px] my-auto mr-[7px]'>
            Filter
          </button>
        </div>
        <Socials />
        <div className=' max-[760px]:hidden       ml-[20px] flex gap-[20px] justify-between  item-center my-auto'>
          {/* <a className='cursor-pointer  flex flex-col  items-center justify-center'
            onMouseEnter={(e) => handleMouseEnterCard("Watch with friends", e)}
            onMouseLeave={handleMouseLeaveCard}>
            <img draggable="false" src={livesvg} className='h-[20px] mx-auto ' />
            <div
              className='  text-white text-[13px] font-normal mt-[8px]'>
              Watch2gether
            </div>
          </a> */}
          <a href={`/watch/${random}/0`} className='cursor-pointer '
            onMouseEnter={(e) => handleMouseEnterCard("Random", e)}
            onMouseLeave={handleMouseLeaveCard}
          >
            <div className='text-center flex flex-col  items-center justify-center'>
              <i class="fas fa-random text-[#ffdd95] text-[20px]"></i>
            </div>
            <div className='   text-white text-[13px] mt-[8px]'>
              Random
            </div>
          </a>
          <div className='cursor-pointer flex  flex flex-col  items-center justify-center'>
            <div className=''
              onClick={() => {
                setLanguage(!language);
                localStorage.setItem("language", !language)
              }}
              onMouseEnter={(e) => handleMouseEnterCard("Select language of anime name to display", e)}
              onMouseLeave={handleMouseLeaveCard} >
              <div className='flex justify-center'>
                <span className={`${language ? "bg-[#ffdd95] text-black" : "bg-[#4d5059] text-white"} text-center inline-block text-xs w-[26px] h-[18px] rounded-l-sm`}> EN</span>
                <span className={`${!language ? "bg-[#ffdd95] twxt-black" : "bg-[#4d5059] text-white"} text-center inline-block text-xs w-[26px] h-[18px] pl-[2px] rounded-r-sm`}> JP</span>
              </div>
              <div className='  text-white text-[13px] mt-[8px]'>
                Anime Name
              </div>
            </div>
          </div>
          <a href={'/community'} className='cursor-pointer'
            onMouseEnter={(e) => handleMouseEnterCard("AniWatch connect", e)}
            onMouseLeave={handleMouseLeaveCard}>
            <div className='cursor-pointer text-center flex flex-col  items-center justify-center'>
              <i class="fas fa-comments text-[#ffdd95] text-[19px]"></i>
            </div>
            <div className='  text-white text-[13px] mt-[8px]'>
              Community
            </div>
          </a>
        </div>
        <button onClick={loginopen} className={` ${isLoggedIn ? "hidden" : "flex"} items-center cursor-pointer  ml-auto text-black bg-[#ffdd95] h-[40px] pl-[15px] pr-[15px] text-sm font-semibold rounded-[3.2px] right-0`}>
          Login
        </button>
        <img onClick={() => {
          setIsProfileOpen((x) => (!x))
        }}
          src={imgUrl} className={` ${!isLoggedIn ? "hidden" : "flex"} rounded-full items-center cursor-pointer  ml-auto text-black h-[40px]  text-sm font-semibold right-0`} />
        {isProfileOpen &&
          <div ref={userDataRef} className='pl-[16px] pr-[16px] pt-[12px] z-[90] absolute border border-[#ffffff]/20 opacity-97 h-[430px] rounded-xl bg-[#242428] w-[300px] right-0 mt-[40px] mr-[30px]'>
            <div className='text-[#ffdd95] text-[14px font-medium]'>{username}</div>
            <div className='text-white text-[14px] mt-[5px]'>{userEmail}</div>
            <div className='mt-[20px] flex flex-col gap-[6px]'>
              <div className='cursor-pointer hover:text-[#ffdd95] hover:bg-white/15   bg-white/10 text-white pt-[8px] pb-[8px] rounded-full pl-[10px] text-[14px]' > <i class="fas fa-user mr-2"></i> <span className='text-[16px]'>Profile</span> </div>
              <div className='cursor-pointer hover:text-[#ffdd95] hover:bg-white/15   bg-white/10 text-white pt-[8px] pb-[8px] rounded-full pl-[10px] text-[14px]' > <i class="fas fa-history mr-2"></i> <span className='text-[16px]'>Continue Watching</span> </div>
              <div className='cursor-pointer hover:text-[#ffdd95] hover:bg-white/15   bg-white/10 text-white pt-[8px] pb-[8px] rounded-full pl-[10px] text-[14px]' > <i class="fas fa-heart mr-2"></i> <span className='text-[16px]'>Watch List</span> </div>
              <div className='cursor-pointer hover:text-[#ffdd95] hover:bg-white/15   bg-white/10 text-white pt-[8px] pb-[8px] rounded-full pl-[10px] text-[14px]' > <i class="fas fa-bell mr-2"></i> <span className='text-[16px]'>Notification</span> </div>
              <div className='cursor-pointer hover:text-[#ffdd95] hover:bg-white/15   bg-white/10 text-white pt-[8px] pb-[8px] rounded-full pl-[10px] text-[14px]' > <i class="fas fa-file-import mr-2"></i> <span className='text-[16px]'>MAL Import / Export</span> </div>
              <div className='cursor-pointer hover:text-[#ffdd95] hover:bg-white/15   bg-white/10 text-white pt-[8px] pb-[8px] rounded-full pl-[10px] text-[14px]' > <i class="fas fa-cog mr-2"></i> <span className='text-[16px]'>Settings</span> </div>
            </div>
            <div className='text-white  flex justify-end items-center pt-[16px] text-[14px]' >
              <div onClick={loggingOut} className='hover:text-[#ffdd95] cursor-pointer'>
                <span className='text-[16px] '>Logout</span><i class="fas fa-arrow-right ml-2 mr-1"></i>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default Navbar;