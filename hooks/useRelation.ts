// useRelationStore.ts
import { create } from "zustand";
import axios from "axios";

export interface Relation {
  product_id: number;
  category_id: number;
}

interface RelationStore {
  relations: Relation[];
  fetchRelations: () => void;
}

export const useRelationStore = create<RelationStore>((set) => ({
  relations: [],
  fetchRelations: async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/relation");
      set({ relations: response.data.data });
    } catch (error) {
      console.error("Error fetching relations:", error);
    }
  },
}));
