// useProductStore.ts
import { create } from "zustand";
import axios from "axios";

export interface brand {
  id: number;
  title: string;
  slug_title: string;
  logo: string;
}

export interface store {
  id: number;
  title: string;
  slug_title: string;
  url: string;
  logo: string;
}

export interface Product {
  id: number;
  title: string;
  slug: string;
  long_description: string;
  short_description: string;
  product_img: string;
  brand_id?: brand;
  store_id?: store;
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
