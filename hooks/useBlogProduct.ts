// useProductStore.ts
import { create } from "zustand";
import axios from "axios";
import { Product } from "./useProduct";

export interface BlogProduct {
  id: number;
  blog_id: string;
  product_id: Product;
}

interface BlogProductStore {
  BlogProducts: BlogProduct[];
  fetchBlogProducts: () => void;
}

export const useBlogProductStore = create<BlogProductStore>((set) => ({
  BlogProducts: [],
  fetchBlogProducts: async () => {
    try {
      const response = await axios.get(`https://parazone.tn/api/blog_product`);
      set({ BlogProducts: response.data.data });
    } catch (error) {
      console.error(`Error fetching products`, error);
    }
  },
}));
