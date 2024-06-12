// useCategoryStore.ts
import { create } from "zustand";
import axios from "axios";

export interface Category {
  modifiedName: any;
  subName: string;
  id: number;
  name: string;
  parent_id: number | null;
  description: string | null;
  icon: string;
}

interface CategoryStore {
  categories: Category[];
  fetchCategories: () => void;
}

export const useCategoryStore = create<CategoryStore>((set) => ({
  categories: [],
  fetchCategories: async () => {
    try {
      const response = await axios.get("https://141.98.152.246:666/categories");
      set({ categories: response.data.data });
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  },
}));
