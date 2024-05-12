import { set } from 'mongoose';
import { create } from 'zustand';

const useCreateArticlePage = create((set) => ({
    selectedCreateNewArticle : null,
    setSelectedCreateNewArticle : (selectedCreateNewArticle) => set({selectedCreateNewArticle}),
}))

export default useCreateArticlePage;