// useStoreStore.ts
import { create } from "zustand";
import axios from "axios";

export interface Store {
  id: number;
  title: string;
  slug_title: string;
  url: string;
  logo: string;
}

interface StoreStore {
  Stores: Store[];
  fetchStores: () => void;
}

export const useStoreStore = create<StoreStore>((set) => ({
  Stores: [],
  fetchStores: async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/store");
      set({ Stores: response.data.data });
    } catch (error) {
      console.error("Error fetching Stores:", error);
    }
  },
}));
