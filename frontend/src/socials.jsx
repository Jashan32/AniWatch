function Socials() {

  return <div className='flex ml-[30px] hidden xl:flex '>
    <div className=' hidden 2xl:flex   w-[38px] mr-[20px] leading-tight text-[#aaa]'>Join Now</div>
    <div className='flex gap-[5px] my-auto [&>*]:cursor-pointer'>
      <a href="https://discord.com/invite" target="_blank" className='bg-[#7289da] text-white rounded-full w-[30px] h-[30px] flex justify-center'>
        <i class="fab fa-discord my-auto" ></i>
      </a>
      <a href="https://t.me" target="_blank" className='bg-white text-[20px] text-[#24A1DE] rounded-full w-[30px] h-[30px] flex justify-center'>
        <i class="fab fa-telegram-plane my-auto text-[30px]"></i>
      </a>
      <a href="https://www.reddit.com/r/AniWatchZone/" target="_blank" className='bg-[#FF5700] text-[20px] text-[white] rounded-full w-[30px] h-[30px] flex justify-center'>
        <i class="fab fa-reddit-alien my-auto"></i>
      </a>
      <a href="https://x.com/AniwatchTV" target="_blank" className='bg-[white] text-[20px] text-[#1DA1F2] rounded-full w-[30px] h-[30px] flex justify-center'>
        <i class="fab fa-twitter my-auto"></i>
      </a>
    </div>
  </div>
}

export default Socials