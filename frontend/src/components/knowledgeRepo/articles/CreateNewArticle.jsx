import useComment from "../../../hooks/useComment";
import useArticle from "../../../store/useArticle";
import useCreateArticlePage from "../../../store/useCreateArticlePage";
import useCreateArticle from "../../../hooks/useCreateArticle";
import { useState } from "react";

const CreateNewArticle = ({article}) => {
    // console.log(article);
    const {selectedArticle, setSelectedArticle} = useArticle();
    const {selectedCreateNewArticle, setSelectedCreateNewArticle} = useCreateArticlePage();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const {loading, createArticle} = useCreateArticle() 
    


    const handleSubmit = async (e) => {
        e.preventDefault();
        const ret = await createArticle(title, content);
        console.log(ret);
        
        if (ret) {
            setSelectedArticle(null);
            setSelectedCreateNewArticle(null);
        }
        
        
    }

    return (<>
        <div>
            <div className="flex mb-20">
                <div className="mr-64 flex-col content-center">
                    <label className="items-center cursor-pointer text-blue-500" onClick={() => setSelectedCreateNewArticle(null)}>
                        cancel
                    </label>
                </div>

                <div className="mx-64 px-24 justify-self-center">
                    <h1 className="text-4xl font-bold">
                        New Article
                    </h1>
                </div>
                
            </div>


            <div className="flex px-64 mx-20">
                <form className="w-full" onSubmit={handleSubmit}>
                    <label className="mr-10">
                        <span className="text-xl text-gray-800">
                            Title
                        </span>
                    </label>

                    <input type="text" className="w-full border-2 border-gray-300 p-3 rounded mt-1" placeholder="Title" 
                    value = {title} onChange = {(e) => setTitle(e.target.value)}/>

                    <textarea className="w-full border-2 border-gray-300 p-3 rounded mt-10 overflow-auto" placeholder="Article" rows="10"
                    value = {content} onChange = {(e) => setContent(e.target.value)}/>

                    <div className="flex justify-end">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-20">
                            Submit
                        </button>
                    </div>
                </form>
                    

            </div>

        </div>
    </>);
};

export default CreateNewArticle;