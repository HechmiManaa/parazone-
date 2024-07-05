// useProductStore.ts
import { create } from "zustand";
import axios from "axios";
import { Store } from "./useStore";

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
  store_id?: Store;
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
      const response = await axios.get(`https://parazone.tn/api/price`);
      set({ Prices: response.data.data });
    } catch (error) {
      console.error(`Error fetching prices`, error);
    }
  },
}));
