// useTagStore.ts
import { create } from "zustand";
import axios from "axios";

export interface Tag {
  id: number;
  content: string;
}

interface TagStore {
  Tags: Tag[];
  fetchTags: () => void;
}

export const useTagStore = create<TagStore>((set) => ({
  Tags: [],
  fetchTags: async () => {
    try {
      const response = await axios.get("https://parazone.tn/api/tag");
      set({ Tags: response.data.data });
    } catch (error) {
      console.error("Error fetching Tags:", error);
    }
  },
}));
