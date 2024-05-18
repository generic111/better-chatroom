import Conversations from "../sidebar/Conversations.jsx";
import SignOutButton from "../sidebar/SignOutButton.jsx";
import SearchInput from "../sidebar/SearchInput.jsx";
import Chats from "../sidebar/Chats.jsx";
import Modal from "./Modal.jsx";
import { useState } from "react";
import { BsSend } from "react-icons/bs";
import useCreateChat from "../../hooks/useCreateChat.js";

const Friends = () => {
    const [open, setOpen] = useState(false);
    const [chatname, setChatname] = useState('');
    const {loading, createChat} = useCreateChat();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(chatname);
        await createChat(chatname);
        setOpen(false);
        setChatname("");
    }

    return (
        <div className="border-r border-slate-500 p-4 flex flex-col"> 
            <SearchInput />
            <div className = 'divider px-3'></div>
            <Conversations /> 
            <Chats />
            {/* <SignOutButton />  */}
            <button onClick = {() => setOpen(true)} className = 'btn btn-primary mt-auto'>Create Chat</button>
            <Modal open={open} onClose={() => setOpen(false)}> 
                <div className="flex-row justify-center">
                <h1 className = 'text-2xl font-bold mb-5'>Create Chat</h1>
                <form onSubmit={handleSubmit}>
                    <div className="flex">
                    <input 
                        type = 'text' 
                        className = 'border text-sm rounded-lg block w-full p-2.5'
                        placeholder = 'Enter Chat name'
                        value = {chatname}
                        onChange={(e) => setChatname(e.target.value)}
                    />
                    <button type = 'submit' className="inset-y-0 end-0 flex items-center pe-3 ml-2">
                        <BsSend/>
                    </button>
                    </div>
                </form>
                </div>
            </Modal>
        </div>
    );
};

export default Friends;