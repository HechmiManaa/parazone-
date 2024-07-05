// useBlogBrandStore.ts
import { create } from "zustand";
import axios from "axios";
import { Brand } from "./useBrand";

export interface BlogBrand {
  id: number;
  blog_id: string;
  brand_id: Brand;
}

interface BlogBrandStore {
  BlogBrands: BlogBrand[];
  fetchBlogBrands: () => void;
}

export const useBlogBrandStore = create<BlogBrandStore>((set) => ({
  BlogBrands: [],
  fetchBlogBrands: async () => {
    try {
      const response = await axios.get("https://parazone.tn/api/blog_brand");
      set({ BlogBrands: response.data.data });
    } catch (error) {
      console.error("Error fetching BlogBrands:", error);
    }
  },
}));
