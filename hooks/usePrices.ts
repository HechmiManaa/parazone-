// useProductStore.ts
import { create } from "zustand";
import axios from "axios";

export interface Store {
  id: number;
  name: string;
  website: string;
  logo_url_?: string | null;
}

export interface Prices {
  id: number;
  product_id: number;
  store_id: Store;
  price: number;
  timestamp?: string | null;
  price_url: string;
  title: string;
}

interface PriceStore {
  Prices: Prices[];
  fetchPrices: () => void;
}

export const usePricesStore = create<PriceStore>((set) => ({
  Prices: [],
  fetchPrices: async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/Price`);
      set({ Prices: response.data.data });
    } catch (error) {
      console.error(`Error fetching prices`, error);
    }
  },
}));
