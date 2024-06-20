// useProductStore.ts
import { create } from "zustand";
import axios from "axios";

interface store {
  id: number;
  title: string;
  slug_title: string;
  url: string;
  logo: string;
}

export interface Price {
  id: number;
  title: string;
  value: number;
  product_img: string;
  product_url: string;
  availability?: string | null;
  rating?: number | null;
  nbr_rating?: number | null;
  delivery_price?: number | null;
  delivery_time?: string | null;
  offer?: string | null;
  scraping_time: string;
  brand_id?: number | null;
  store_id?: store;
  product_id: number;
}

interface PriceStore {
  Prices: Price[];
  fetchPrices: () => void;
}

export const usePricesStore = create<PriceStore>((set) => ({
  Prices: [],
  fetchPrices: async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/price`);
      set({ Prices: response.data.data });
    } catch (error) {
      console.error(`Error fetching prices`, error);
    }
  },
}));
