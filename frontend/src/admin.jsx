import { useEffect } from 'react'
import Navbar from './navbar.jsx'

function Admin() {

    useEffect(() => {
        const cookieString = document.cookie;
        if (!cookieString) {
            window.location.href = "/notfound"
        }
        const innerCookie = cookieString.split('=')[1].replace(/\\/g, '');
        const verify = async () => {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/admin/verify`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "jwtToken": innerCookie,
                },
            });
            const dRes = await res.json()
            const ndata = dRes.message;
            if (ndata != "verified") {
                window.location.href = "/notfound"
            }
        }
        verify()
    }, [])

    async function uploadNewAnime() {
        const title = document.getElementById("nip1").value
        const description = document.getElementById("nip2").value
        const imageUrl = document.getElementById("nip3").value
        const bannerURL = document.getElementById("nip5").value
        const avgTime = document.getElementById("nip6").value
        const type = document.getElementById("nip7").value
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/admin/new-anime`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: title,
                description: description,
                imageUrl: imageUrl,
                bannerURL: bannerURL,
                type: type,
                avgTime: avgTime,
            }),
        });
        const dRes = await res.json()
        const ndata = dRes.message;
        if (ndata == "anime alredy exist") {

            alert("anime alredy exist")
        }

    }


    async function uploadNewEpisode() {
        const title = document.getElementById("neip1").value
        const eTitle = document.getElementById("neip2").value
        const m3u8_english = document.getElementById("neip3").value
        const m3u8_japanese = document.getElementById("neip6").value
        const subtitles = document.getElementById("neip4").value
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/admin/new-episode`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: title,
                ep_title: eTitle,
                vURL_english: m3u8_english,
                vUrl_japanese: m3u8_japanese,
                subtitles: subtitles,
            }),
        });
        const dRes = await res.json()
        const ndata = dRes.message;
        if (ndata == "anime list not Found") {

            alert("anime list not Found")
        }
        else if (ndata == "episode title alredy exist") {
            alert("episode title alredy exist")
        }
        else if (ndata == "video's Url alredy exist") {
            alert("video's Url alredy exist")
        }


    }

    async function categoryFunction() {
        const value = document.getElementById("selector").value;
        const dataGot = await fetch(`${import.meta.env.VITE_SERVER_URL}/admin/get-tag`, {
            method: "GET",
            headers: {
                "category_name": value,
            },

        })
        let dataGot2 = await dataGot.json()
        dataGot2 = dataGot2.array

        document.getElementById("greaterInput").value = dataGot2;


    }

    async function categoryUploadFunction() {
        const tag = document.getElementById("selector").value;

        const value = document.getElementById("greaterInput").value;
        const tarray = value.split(",")

        const dataGot = await fetch(`${import.meta.env.VITE_SERVER_URL}/admin/set-tag`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({
                titleArray: tarray,
                tag: tag
            }),

        })
        let dataGot2 = await dataGot.json()

    }

    return <div>
        <Navbar />
        <div className='bg-[#242428] h-[70px] w-full'> </div>
        <div className=' pt-[20px] pl-[20px] bg-gray-500 w-full h-[700px] flex flex-col gap-[20px]'>
            <div className='flex gap-[10px] items-center '>
                <div className='font-bold text-white'> Upload New Anime:</div>
                <input id='nip1' placeholder="Anime's Name" className=' pl-[10px] text-white h-[30px] border border-white rounded-[5px]' />
                <input id='nip2' placeholder="Description" className='pl-[10px] text-white h-[30px] border border-white rounded-[5px]' />
                <input id='nip3' placeholder="image's URL" className='pl-[10px] text-white h-[30px] border border-white rounded-[5px]' />
                <input id='nip5' placeholder="Banner URL" className='pl-[10px] text-white h-[30px] border border-white rounded-[5px]' />

                <select name="type" id="nip7" className='bg-black border border-[1px] border-white rounded-md text-white p-[5px] pl-[10px] pr-[10px]'>
                    <option value="null">Choose type</option>
                    <option value="Movie">movie</option>
                    <option value="TV">tv</option>
                </select>
                <input id='nip6' placeholder="Average Time" className='pl-[10px] text-white h-[30px] border border-white rounded-[5px]' />
                <button onClick={uploadNewAnime} className='text-black font-medium p-[10px] cursor-pointer bg-[#ffdd95] rounded-[10px]'>Submit</button>
            </div>
            <div className='flex gap-[10px] items-center '>
                <div className='font-bold text-white'> Upload New Episodes:</div>
                <input id='neip1' placeholder="Anime's Name" className='pl-[10px] text-white h-[30px] border border-white rounded-[5px]' />
                <input id='neip2' placeholder="Eposode's Name" className='pl-[10px] text-white h-[30px] border border-white rounded-[5px]' />
                <input id='neip3' placeholder="English m3u8" className='pl-[10px] text-white h-[30px] border border-white rounded-[5px]' />
                <input id='neip6' placeholder="Japanese m3u8" className='pl-[10px] text-white h-[30px] border border-white rounded-[5px]' />
                <input id='neip4' placeholder="subtitles" className='pl-[10px] text-white h-[30px] border border-white rounded-[5px]' />
                <button onClick={uploadNewEpisode} className='text-black font-medium p-[10px] cursor-pointer bg-[#ffdd95] rounded-[10px]'>Submit</button>
            </div>
            <div>
                <div className='flex gap-[10px] items-center '>
                    <div className='font-bold text-white'> Update Category</div>
                    <select name="type" id="selector" className='bg-black border border-[1px] border-white rounded-md text-white p-[5px] pl-[10px] pr-[10px]'>
                        <option value="null">Choose Category</option>
                        <option value="spotlight">Spotlight</option>
                        <option value="trending">Trending</option>
                        <option value="top_airing">Top Airing</option>
                        <option value="most_popular">Most Popular</option>
                        <option value="most_favorite">Most favorite</option>
                        <option value="latest_completed">Latest Completed</option>
                        <option value="latest_episodes">Latest Episodes</option>
                        <option value="movies">Movies</option>
                        <option value="tv_series">TV Series</option>
                        <option value="new">New</option>
                    </select>
                    <button onClick={categoryFunction} className='text-black font-medium p-[10px] cursor-pointer bg-[#ffdd95] rounded-[10px]'>Submit</button>
                </div>
                <div className='mr-[200px] mt-[20px] '>
                    <textarea id='greaterInput' placeholder="Type your text here..." rows="10"
                        class="w-full h-[400px] border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"></textarea>

                    <button onClick={categoryUploadFunction} className='text-black font-medium p-[10px] cursor-pointer bg-[#ffdd95] rounded-[10px]'>Submit</button>
                </div>
            </div>
        </div>
    </div>
}

export default Admin