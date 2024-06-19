// useProductStore.ts
import { create } from "zustand";
import axios from "axios";
import { Category } from "./useCategory";

export interface Product {
  id: number;
  title: string;
  slug: string;
  long_description: string;
  short_description: string;
  product_img: string;
  brand_id?: number | null;
  store_id?: number | null;
}

interface ProductStore {
  products: Product[];
  fetchProducts: () => void;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  fetchProducts: async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/product`);
      set({ products: response.data.data });
    } catch (error) {
      console.error(`Error fetching products`, error);
    }
  },
}));
