import { set } from 'mongoose';
import { create } from 'zustand';

const useArticle = create((set) => ({
    selectedArticle : null,
    setSelectedArticle : (selectedArticle) => set({selectedArticle}),
    comments : [],
    setComments : (comments) => {
        // console.log(messages);
        set({comments})
    },
}))

export default useArticle;