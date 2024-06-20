// useRelationStore.ts
import { create } from "zustand";
import axios from "axios";

export interface Relation {
  product_id: string;
  category_id: string;
}

interface RelationStore {
  relations: Relation[];
  fetchRelations: () => void;
}

export const useRelationStore = create<RelationStore>((set) => ({
  relations: [],
  fetchRelations: async () => {
    try {
      const response = await axios.get("https://parazone.tn/api/relation");
      set({ relations: response.data.data });
    } catch (error) {
      console.error("Error fetching relations:", error);
    }
  },
}));
