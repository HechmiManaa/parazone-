// useProductStore.ts
import { create } from "zustand";
import axios from "axios";
import { Brand } from "./useBrand";
import { Store } from "./useStore";

export interface Product {
  id: string;
  title: string;
  slug: string;
  long_description: string;
  short_description: string;
  product_img: string;
  brand_id: Brand;
  store_id?: Store;
}

interface ProductStore {
  products: Product[];
  fetchProducts: () => void;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  fetchProducts: async () => {
    try {
      const response = await axios.get(`https://parazone.tn/api/product`);
      set({ products: response.data.data });
    } catch (error) {
      console.error(`Error fetching products`, error);
    }
  },
}));
