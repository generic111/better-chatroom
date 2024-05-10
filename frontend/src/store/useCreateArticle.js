import { set } from 'mongoose';
import { create } from 'zustand';

const useCreateArticle = create((set) => ({
    selectedCreateNewArticle : null,
    setSelectedCreateNewArticle : (selectedCreateNewArticle) => set({selectedCreateNewArticle}),
}))

export default useCreateArticle;