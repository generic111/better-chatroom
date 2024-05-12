import { useState } from "react";
import { BsSend } from "react-icons/bs";
import useComment from "../../../hooks/useComment";

const CommentInput = () => {

    const [comment, setComment] = useState("");
    const {loading, sendComment} = useComment();

    const submitFunc = async (e) => {
        e.preventDefault();
        if (!comment) return;
        await sendComment(comment);

        setComment("");
    }

    return (
        <div>
            <form onSubmit={submitFunc}>
                <div className = 'w-full relative pr-20'>
                    <input 
                        type = 'text' 
                        className = 'border text-sm rounded-lg block w-full p-2.5'
                        placeholder = 'Comment'
                        value = {comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <button type = 'submit' className="absolute inset-y-0 end-0 flex items-center pe-24">
                        <BsSend/>
                    </button>
                </div>
            </form>
        </div>
    )
    
}

export default CommentInput