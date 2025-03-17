function Card({ card, cardsN, index }) {
    return <div
        className=" flex  cursor-pointer relative">
        <div className="flex flex-col justify-end">
            <div className='mt-[53px] [writing-mode:vertical-rl] rotate-180  max-h-[150px] truncate   font-medium text-white bg-gradient-to-t from-[#242428] to-transparent'> {cardsN}</div>
            <div className=" text-center text-[20px] font-semibold text-[#ffdd95]"> {index<10? "0"+index:index} </div>
        </div>
        <div className="flex w-[153.33px] sm:w-[228px] transition-transform duration-1000">
            <img src={card} className="w-[153.33px] h-[222.32px] sm:w-[228px] sm:h-[308px]   overflow-hidden  transition duration-100" />
        </div>
    </div>
}

export default Card