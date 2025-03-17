function NotFound() {
    return <div className="h-[100vh] flex flex-col justify-center ">
        <div className=" [&>*]:flex [&>*]:justify-center text-white flex flex-col ">
            <div className="max-h-[300px]">
                <img src="https://aniwatchtv.to/images/404.png?v=0.2" className="max-w-[300px]"/>
            </div>
            <div className="text-[30px] mt-[10px]">404 Error</div>
            <div className="text-[14px] mb-[20px]">Oops! We can't find this page.</div>
            <div className="cursor-pointer">
                <a href="/" className="bg-[#ffdd95] text-[16px] text-black h-[42px] w-[210px] flex justify-center items-center rounded-full">
                    <i class="fa fa-chevron-circle-left mr-2"></i> Back to homepage
                </a>
            </div>
        </div>
    </div>
}
export default NotFound