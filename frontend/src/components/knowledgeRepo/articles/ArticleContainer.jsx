import { useEffect } from "react";
import useArticle from "../../../store/useArticle";
import ArticleDetails from "./ArticleDetails.jsx";
import useCreateArticle from "../../../store/useCreateArticle.js";
import CreateNewArticle from "./CreateNewArticle.jsx";
import { MdOutlineArticle } from "react-icons/md";
import Comments from "./Comments.jsx";
import CommentInput from "./CommentInput.jsx";


function ContainerContent({selectedArticle, selectedCreateNewArticle}) {

    if (!selectedArticle && !selectedCreateNewArticle) {
        return (
            <div className=" flex-col m-auto py-60">
                <div className="flex justify-center">
                <MdOutlineArticle size={150} opacity={0.3}/>
                </div>

                <div className="flex justify-center">
                    <h1 className="font-bold text-2xl opacity-50">Select an article</h1>
                </div>
            </div>
        
        );
    }
    else if (selectedArticle) {
        return (
            <div className="flex flex-col">
                <ArticleDetails />
                <Comments />
                <CommentInput />
            </div>
        );
    }

    else if (selectedCreateNewArticle) {
        return (
            <div className="flex flex-col">
                <CreateNewArticle />
            </div>
        );

    }

    else {
        return (
            <div></div>
        );
    }
}

const ArticleContainer = () => {

    const {selectedArticle, setSelectedArticle} = useArticle();
    const {selectedCreateNewArticle, setSelectedCreateNewArticle} = useCreateArticle();
  
    useEffect(() => {
        return () => setSelectedArticle(null);
    }, [setSelectedArticle]);

    useEffect(() => {
        return () => setSelectedCreateNewArticle(null);
    }, [setSelectedCreateNewArticle]);

    return (
        <div className="flex flex-col w-full pt-5 pl-20">
            <ContainerContent
                selectedArticle={selectedArticle}
                selectedCreateNewArticle={selectedCreateNewArticle} 
            />
            {/* <>
 
                {!selectedArticle ? (<div></div>) : 
                ( 
                    <div className="flex flex-col">
                        <ArticleDetails />
                    </div>
                )}
            </> */}
        </div>
    )
}

export default ArticleContainer;