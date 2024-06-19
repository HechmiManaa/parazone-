// useCategoryStore.ts
import { create } from "zustand";
import axios from "axios";

export interface Category {
  id: number;
  name: string;
  description: string | null;
  img: string;
  slug: string;
}

interface CategoryStore {
  categories: Category[];
  fetchCategories: () => void;
}

export const useTest = create<CategoryStore>((set) => ({
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
