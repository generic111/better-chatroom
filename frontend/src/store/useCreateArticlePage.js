import { set } from 'mongoose';
import { create } from 'zustand';

const useCreateArticlePage = create((set) => ({
    selectedCreateNewArticle : null,
    setSelectedCreateNewArticle : (selectedCreateNewArticle) => set({selectedCreateNewArticle}),
    selectedEditArticle : null,
    setSelectedEditArticle : (selectedEditArticle) => set({selectedEditArticle}),
}))

export default useCreateArticlePage;