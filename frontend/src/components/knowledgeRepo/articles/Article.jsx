import useArticle from "../../../store/useArticle";

const Article = ({article}) => {

    const {selectedArticle, setSelectedArticle} = useArticle();

    const isSelected = selectedArticle?._id === article._id;
    // console.log(article);

    return (<>
        <div className={"flex gap-2 items-center rounded -2 py-2 cursor-pointer"}
                onClick={() => setSelectedArticle(article)}> 

            <div className="flex flex-col flex-1">
                <div className = 'flex gap-3 justify-between'>
                    
                    <p className = 'font-bold text-black text-xl'>{article.title}</p>
                    <span className = 'text-xl'> 💀 </span>
                </div>

                <div className = 'flex gap-3 justify-between'>
                    <p className = 'font text-black'>{article.authorName}</p>
                </div>
            </div>
        </div>
        
        <div className="divider my-0 py-0 h-1">

        </div>
    </>);
};

export default Article;