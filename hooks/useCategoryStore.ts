// useCategoryStore.ts
import { create } from "zustand";
import axios from "axios";

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  parent_id: number | null;
  img: string;
}

interface CategoryStore {
  categories: Category[];
  fetchCategories: () => void;
}

export const useCategoryStore = create<CategoryStore>((set) => ({
  categories: [],
  fetchCategories: async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/categories");
      set({ categories: response.data.data });
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  },
}));
