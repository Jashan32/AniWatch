import { useEffect, useState } from 'react'
import Ctlist from './ctList.jsx'

function CtGrid() {

    const [category, setCategory] = useState([])
    const [resData, setResData] = useState({
        "top_airing": [
            {
                "_id": "67a85e478c736669e3b71819",
                "title": "Dandadan",
                "imageUrl": "https://img.flawlessfiles.com/_r/300x400/100/a8/b5/a8b56a7589ff9edb6c86977c31e27a06/a8b56a7589ff9edb6c86977c31e27a06.jpg",
            },

            {
                "_id": "67a8da327fa253358b507e70",
                "title": "Death Note",
                "imageUrl": "https://m.media-amazon.com/images/M/MV5BNDU4ZGViNTMtZmE5NS00YTZjLTk3OGYtNDkyMTE5MjE0MjVlXkEyXkFqcGc@._V1_FMjpg_UX400_.jpg",
            },
            {
                "_id": "67a8d79f7fa253358b507e68",
                "title": "My Hero Academia",
                "imageUrl": "https://img.flawlessfiles.com/_r/300x400/100/d1/ae/d1ae1f3d3324e24dfdfa64e4c2e687f8/d1ae1f3d3324e24dfdfa64e4c2e687f8.jpg",
            },
            {
                "_id": "67a8dadd7fa253358b507e74",
                "title": "Your Name",
                "imageUrl": "https://m.media-amazon.com/images/M/MV5BNmEyZjI0M2MtNGFkOC00YTRlLWI0MGQtYTgyODY2MGRhMjc4XkEyXkFqcGc@._V1_FMjpg_UX1132_.jpg",
            },
            {
                "_id": "67a8d6d07fa253358b507e64",
                "title": "Spy x Family",
                "imageUrl": "https://img.flawlessfiles.com/_r/300x400/100/88/bd/88bd17534dc4884f23027035d23d74e5/88bd17534dc4884f23027035d23d74e5.jpg",
            }
        ],
        "most_popular": [

            {
                "_id": "67a89d847fa253358b507e5f",
                "title": "Solo Leveling",
                "imageUrl": "https://img.flawlessfiles.com/_r/300x400/100/b1/47/b147d331e311a5d5c8ee81269725fc92/b147d331e311a5d5c8ee81269725fc92.png",
            },
            {
                "_id": "67a8d79f7fa253358b507e68",
                "title": "My Hero Academia",
                "imageUrl": "https://img.flawlessfiles.com/_r/300x400/100/d1/ae/d1ae1f3d3324e24dfdfa64e4c2e687f8/d1ae1f3d3324e24dfdfa64e4c2e687f8.jpg",
            },
            {
                "_id": "67a8da327fa253358b507e70",
                "title": "Death Note",
                "imageUrl": "https://m.media-amazon.com/images/M/MV5BNDU4ZGViNTMtZmE5NS00YTZjLTk3OGYtNDkyMTE5MjE0MjVlXkEyXkFqcGc@._V1_FMjpg_UX400_.jpg",
            },
            {
                "_id": "67a8dadd7fa253358b507e74",
                "title": "Your Name",
                "imageUrl": "https://m.media-amazon.com/images/M/MV5BNmEyZjI0M2MtNGFkOC00YTRlLWI0MGQtYTgyODY2MGRhMjc4XkEyXkFqcGc@._V1_FMjpg_UX1132_.jpg",
            },
            {
                "_id": "67a8d6d07fa253358b507e64",
                "title": "Spy x Family",
                "imageUrl": "https://img.flawlessfiles.com/_r/300x400/100/88/bd/88bd17534dc4884f23027035d23d74e5/88bd17534dc4884f23027035d23d74e5.jpg",
            }
        ],
        "most_favorite": [

            {
                "_id": "67a8dd5a7fa253358b507e7c",
                "title": "Suzume’s Door-Locking",
                "imageUrl": "https://m.media-amazon.com/images/M/MV5BNjBiM2FkN2QtNDRmOS00ZGY4LTkyNjUtMDQ1ZjgzMTI2MzZjXkEyXkFqcGc@._V1_FMjpg_UX1125_.jpg",
            },
            {
                "_id": "67a8d8db7fa253358b507e6c",
                "title": "Classroom of the Elite",
                "imageUrl": "https://img.flawlessfiles.com/_r/300x400/100/01/73/0173c02acdd9948db19842566285a7db/0173c02acdd9948db19842566285a7db.png",
            },
            {
                "_id": "67a8d79f7fa253358b507e68",
                "title": "My Hero Academia",
                "imageUrl": "https://img.flawlessfiles.com/_r/300x400/100/d1/ae/d1ae1f3d3324e24dfdfa64e4c2e687f8/d1ae1f3d3324e24dfdfa64e4c2e687f8.jpg",
            },
            {
                "_id": "67a8dadd7fa253358b507e74",
                "title": "Your Name",
                "imageUrl": "https://m.media-amazon.com/images/M/MV5BNmEyZjI0M2MtNGFkOC00YTRlLWI0MGQtYTgyODY2MGRhMjc4XkEyXkFqcGc@._V1_FMjpg_UX1132_.jpg",
            },
            {
                "_id": "67a8d6d07fa253358b507e64",
                "title": "Spy x Family",
                "imageUrl": "https://img.flawlessfiles.com/_r/300x400/100/88/bd/88bd17534dc4884f23027035d23d74e5/88bd17534dc4884f23027035d23d74e5.jpg",
            }
        ],
        "latest_completed": [

            {
                "_id": "67a89d847fa253358b507e5f",
                "title": "Solo Leveling",
                "imageUrl": "https://img.flawlessfiles.com/_r/300x400/100/b1/47/b147d331e311a5d5c8ee81269725fc92/b147d331e311a5d5c8ee81269725fc92.png",
            },
            {
                "_id": "67a8da327fa253358b507e70",
                "title": "Death Note",
                "imageUrl": "https://m.media-amazon.com/images/M/MV5BNDU4ZGViNTMtZmE5NS00YTZjLTk3OGYtNDkyMTE5MjE0MjVlXkEyXkFqcGc@._V1_FMjpg_UX400_.jpg",
            },
            {
                "_id": "67a8d79f7fa253358b507e68",
                "title": "My Hero Academia",
                "imageUrl": "https://img.flawlessfiles.com/_r/300x400/100/d1/ae/d1ae1f3d3324e24dfdfa64e4c2e687f8/d1ae1f3d3324e24dfdfa64e4c2e687f8.jpg",
            },
            {
                "_id": "67a8dadd7fa253358b507e74",
                "title": "Your Name",
                "imageUrl": "https://m.media-amazon.com/images/M/MV5BNmEyZjI0M2MtNGFkOC00YTRlLWI0MGQtYTgyODY2MGRhMjc4XkEyXkFqcGc@._V1_FMjpg_UX1132_.jpg",
            },
            {
                "_id": "67a8d6d07fa253358b507e64",
                "title": "Spy x Family",
                "imageUrl": "https://img.flawlessfiles.com/_r/300x400/100/88/bd/88bd17534dc4884f23027035d23d74e5/88bd17534dc4884f23027035d23d74e5.jpg",
            }
        ]
    })


    useEffect(() => {
        const fetchData = async () => {
            const resp = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/home/ctgrid`)
            const resData2 = await resp.json()
            setResData(resData2)
            setCategory(Object.keys(resData))
        }
        fetchData()
    }, [])

    return <div>
        <div className='flex flex-wrap md:grid xl:grid-cols-4 gap-4 grid md:grid-cols-2 grid-col-1'>
            <Ctlist category={"Top Airing"} cards={resData.top_airing} category2={category[0]} />
            <Ctlist category={"Most Popular"} cards={resData.most_popular} category2={category[1]} />
            <Ctlist category={"Most Favorite"} cards={resData.most_favorite} category2={category[2]} />
            <Ctlist category={"Latest"} cards={resData.latest_completed} category2={category[3]} />
        </div>
    </div>
}

export default CtGrid