const Conversation = () => {
    return <>
        <div className="flex gap-2 items-center rounded -2 py-1 cursor-pointer">
            <div className="avatar online">
                <div className="w-12 rounded-full">
                    <img src="https://avatar.iran.liara.run/public/boy" alt="avatar"/>
                </div>
            </div>

            <div className="flex flex-col flex-1">
                <div className = 'flex gap-3 justify-between'>
                    <p className = 'font-bold text-black'>Darren Chong</p>
                    <span className = 'text-xl'> 💀 </span>
                </div>
            </div>
        </div>
        
        <div className="divider my-0 py-0 h-1">

        </div>
    </>
};

export default Conversation;