// useBrandStore.ts
import { create } from "zustand";
import axios from "axios";

export interface Brand {
  id: number;
  title: string;
  slug_title: string;
  logo: string;
}

interface BrandStore {
  Brands: Brand[];
  fetchBrands: () => void;
}

export const useBrandStore = create<BrandStore>((set) => ({
  Brands: [],
  fetchBrands: async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/brand");
      set({ Brands: response.data.data });
    } catch (error) {
      console.error("Error fetching Brands:", error);
    }
  },
}));
