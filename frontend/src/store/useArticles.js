import { set } from 'mongoose';
import { create } from 'zustand';

const useArticles = create((set) => ({
    articles : [],
    setArticles : (articles) => {
        // console.log(messages);
        set({articles})
    },
}))

export default useArticles;