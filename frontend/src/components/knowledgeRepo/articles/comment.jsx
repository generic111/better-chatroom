
const Comment = ({comment}) => {
    return (
        <div>
            <div>
                <div className="w-10 rounded-full">
                    <img src="https://avatar.iran.liara.run/public/boy" alt="avatar"/>
                </div>
            </div>

            <div className="text-black">
                {comment.content}
            </div>
            {/* <div className="chat-footer flex">12:45</div> */}
        </div>
    );
};

export default Comment;