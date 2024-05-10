import useArticle from "../../../store/useArticle";

const ArticleDetails = ({article}) => {

    const {selectedArticle} = useArticle();

    return (
        <div className="pr-60">
            <div className="mb-10">
                <h1 className="font-bold text-4xl">{selectedArticle.title}</h1>
            </div>

            <div className="flex flex-row gap-5">
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <img src="https://avatar.iran.liara.run/public/boy" alt="avatar"/>
                    </div>
                </div>

                <div className="flex flex-col justify-center">
                    <p className = 'text-xl text-red-500'>{selectedArticle.authorName}</p>
                </div>

            </div>

            <div className="my-10">
                <p className="text-black">{selectedArticle.content}</p>
            </div>

            
            {/* <div className="chat-footer flex">12:45</div> */}
        </div>
    );
};

export default ArticleDetails;