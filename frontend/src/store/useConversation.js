import { set } from 'mongoose';
import { create } from 'zustand';


const useConversation = create((set) => ({
    isChatroom: null,
    setIsChatroom: (isChatroom) => set({isChatroom}),
    selectedConversation : null,
    setSelectedConversation : (selectedConversation) => set({selectedConversation}),
    messages : [],
    setMessages : (messages) => {
        // console.log(messages);
        set({messages})
    },
}))

export default useConversation;