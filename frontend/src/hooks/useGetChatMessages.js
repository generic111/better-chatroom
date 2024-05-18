import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../store/useConversation";

const useGetChatMessages = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();

	useEffect(() => {
		const getMessages = async () => {
			setLoading(true);

			// console.log("here")
			try {
				const res = await fetch(`/api/chat/${selectedConversation._id}`);
				const data = await res.json();				

				// console.log(data_1);
				if (data.error) {
                    throw new Error(data.error);
                }
                setMessages(data);
				// setMessages(decrypted);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		if (selectedConversation?._id) {
            getMessages();
        }
	}, [selectedConversation?._id, setMessages]);

	return { messages, loading };
};
export default useGetChatMessages;

