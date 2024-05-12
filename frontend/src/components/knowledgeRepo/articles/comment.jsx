import useDeleteComment from "../../../hooks/useDeleteComment";
import { useAuthContext } from "../../../context/AuthContext";

const Comment = ({comment}) => {
    const {deleteComment} = useDeleteComment();
    const {authUser} = useAuthContext();

    const handleDelete = async (e) => {
        e.preventDefault();
        const ret = await deleteComment(comment);
    }

    const profilePic = `https://avatar.iran.liara.run/username?username=${comment.authorFullName}`;

    return (
        <div className="py-3">
            <div className="flex">
                <div className="w-14 rounded-full">
                    <img src={profilePic} alt="avatar"/>
                </div>
                <div className=" ml-3 font-bold text-red-600 text-xl">
                    {comment.autherName}
                </div>

                
                <div className="mt-1 flex justify-center bg-yellow-400 h-4 rounded ml-3">
                    <p className = 'text-xs font-bold text-black content-center'>{comment.authorRole}</p>
                </div>
            </div>

            <div className="ml-12 p-5 pl-6 break-all">
                <p className="text-black">
                    {comment.content}
                </p>
            </div>

            <div className="flex ml-16 pl-2">
                <div className="mr-5">
                    <label className="items-center cursor-pointer text-blue-100 text-sm">
                        Edit
                    </label>
                </div>

                <div>
                    <label className="items-center cursor-pointer text-blue-100 text-sm" onClick={handleDelete}>
                        Delete
                    </label>
                </div>
            </div>
            {/* <div className="chat-footer flex">12:45</div> */}
        </div>
    );
};

export default Comment;