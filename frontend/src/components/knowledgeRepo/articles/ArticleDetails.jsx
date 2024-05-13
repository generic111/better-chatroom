import useDeleteArticle from "../../../hooks/useDeleteArticle";
import useArticle from "../../../store/useArticle";
import { useAuthContext } from "../../../context/AuthContext";
import useCreateArticlePage from "../../../store/useCreateArticlePage";
import toast from "react-hot-toast";

const ArticleDetails = ({article}) => {

    const {selectedArticle, setSelectedArticle } = useArticle();
    const {deleteArticle} = useDeleteArticle();
    const {authUser} = useAuthContext();
    const {selectedEditArticle, setSelectedEditArticle, setSelectedCreateNewArticle} = useCreateArticlePage();

    const handleDelete = async (e) => {
        e.preventDefault();
        const ret = await deleteArticle(selectedArticle);
        if (ret) {
            setSelectedArticle(null);
            return;
        }
        console.log(ret);
    }
    
    const handleEdit = async (e) => {
        e.preventDefault();

        if (authUser.role === "admin" || selectedArticle.authorName === authUser.username) {
            setSelectedEditArticle(selectedArticle);
            setSelectedCreateNewArticle(null);
        }

        else {
            toast.error("You are not authorized to edit this article");
        }
        // setSelectedArticle(null);
        // console.log(ret);
    }   


    

    const profilePic = `https://avatar.iran.liara.run/username?username=${selectedArticle.authorFullName}`;

    return (
        <div className="pr-60">
            <div className="mb-10">
                <h1 className="font-bold text-4xl">{selectedArticle.title}</h1>
            </div>

            <div className="flex">
                <div className="chat-image avatar">
                    <div className="w-16 rounded-full">
                        <img src={profilePic} alt="avatar"/>
                    </div>
                </div>

                <div className="flex flex-col ml-5">
                    <p className = 'text-2xl font-bold text-red-600'>{selectedArticle.authorName}</p>
                </div>


                <div className="flex justify-center bg-yellow-400 h-4 rounded ml-3 mt-2">
                    <p className = 'text-xs font-bold text-black content-center'> {selectedArticle.authorRole} </p>
                </div>


            </div>

            <div className="mt-10 break-all">
                <p className="text-lg text-black">{selectedArticle.content}</p>
            </div>

            <div className="flex mb-10 mt-5">
                <div className="mr-5">
                    <label className="items-center cursor-pointer text-blue-100 text-sm" onClick={handleEdit}>
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

export default ArticleDetails;