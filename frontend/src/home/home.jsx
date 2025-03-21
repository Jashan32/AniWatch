import '../index.css'
import '../app.css'
import Navbar from '../navbar.jsx'
import Hbanner from './hbanner.jsx'
import CList from './cList.jsx'
import CtGrid from '../ctGrid.jsx'
import Sharing from '../sharing.jsx'
import Adsb from '../adsB.jsx'
import Ctgridv2 from '../ctgridV2.jsx'
import RightBar from '../rightBar.jsx'
import Footer from '../footer.jsx'

function Home() {
    return <div className='bg-[#242428] font-primary '>
        <Navbar />
        <Hbanner />
        <div className='mt-[30px] sm:mt-[40px] mb-[30px] ml-[10px] mr-[10px]'>
            <Adsb />
        </div>
        <div className='z-[4000] px-[40px]'>
            <div className=' mb-[20px] bg-[#242428] text-[#ffdd95] text-[22px] font-semibold  '>
                Trending
            </div>
            <CList />
        </div>
        <div className='px-[40px] mt-[20px]'>
            <Sharing />
        </div>
        <div className='px-[40px]'>
            <CtGrid />
        </div>
        <div className='pt-[40px] px-[20px]'>
            <div className='flex'>
                <div className='flex-3'>
                    <div>
                        <div className='flex justify-between text-[#aaa] text-[12px]'>
                            <div className="pl-[15px] text-[#ffdd95] font-semibold text-[22px] pb-[20px]  items-center">Latest Episode</div>
                            <div className='flex justify-center items-center cursor-pointer pr-[15px]'>View more <i class="fas fa-angle-right ml-2"></i></div>
                        </div>
                        <Ctgridv2 path={"latest_completed"} type2={false} />
                    </div>
                    <div>
                        <div className="pl-[15px] text-[#ffdd95] font-semibold text-[22px] pt-[40px] pb-[20px]">New On AniWatch</div>
                        <Ctgridv2 path={"new"} type2={false} />
                    </div>
                </div>
                <div className=" flex-1 xl:flex hidden">
                    <RightBar />
                </div>
            </div>
        </div>
        <Footer />
    </div>
}

export default Home