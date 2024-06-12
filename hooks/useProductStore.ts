// useProductStore.ts
import { create } from "zustand";
import axios from "axios";
import { Category } from "./useCategoryStore";

export interface Product {
  id: number;
  name: string;
  description: string;
  category_id: Category;
  brand?: string | null;
  url?: string | null;
}

interface ProductStore {
  products: Product[];
  fetchProducts: () => void;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  fetchProducts: async () => {
    try {
      const response = await axios.get(`https://141.98.152.246:666/products`);
      set({ products: response.data.data });
    } catch (error) {
      console.error(`Error fetching products`, error);
    }
  },
}));
