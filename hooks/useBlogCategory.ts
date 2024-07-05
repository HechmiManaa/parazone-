// useBlogCategoryStore.ts
import { create } from "zustand";
import axios from "axios";
import { Category } from "./useCategory";

export interface BlogCategory {
  id: number;
  blog_id: string;
  category_id: Category;
}

interface BlogCategoryStore {
  BlogCategories: BlogCategory[];
  fetchBlogCategories: () => void;
}

export const useBlogCategoryStore = create<BlogCategoryStore>((set) => ({
  BlogCategories: [],
  fetchBlogCategories: async () => {
    try {
      const response = await axios.get("https://parazone.tn/api/blog_category");
      set({ BlogCategories: response.data.data });
    } catch (error) {
      console.error("Error fetching blogCategories:", error);
    }
  },
}));
