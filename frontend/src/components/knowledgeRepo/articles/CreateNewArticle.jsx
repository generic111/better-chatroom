const CreateNewArticle = ({article}) => {
    // console.log(article);

    return (<>
        <div>
            <div className="flex mb-20">
                <div className="mr-64 flex-col content-center">
                    <label className="items-center cursor-pointer text-blue-500">cancel</label>
                </div>

                <div className="mx-64 px-24 justify-self-center">
                    <h1 className="text-4xl font-bold">
                        New Article
                    </h1>
                </div>
                
            </div>


            <div className="flex px-64 mx-20">
                <form className="w-full">
                    <label className="mr-10">
                        <span className="text-gray-700">
                            Title
                        </span>
                    </label>

                    <input type="text" className="w-full border-2 border-gray-300 p-3 rounded mt-1" placeholder="Title" />

                    <textarea className="w-full border-2 border-gray-300 p-3 rounded mt-10 overflow-auto" placeholder="Article" rows="10">
                        Content
                    </textarea>

                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Submit
                    </button>
                </form>
                    

            </div>

        </div>
    </>);
};

export default CreateNewArticle;