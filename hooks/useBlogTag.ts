// useTagStore.ts
import { create } from "zustand";
import axios from "axios";
import { Tag } from "./useTag";

export interface BlogTag {
  id: number;
  blog_id: string;
  tag_id: Tag;
}

interface BlogTagStore {
  BlogTags: BlogTag[];
  fetchBlogTags: () => void;
}

export const useBlogTagStore = create<BlogTagStore>((set) => ({
  BlogTags: [],
  fetchBlogTags: async () => {
    try {
      const response = await axios.get("https://parazone.tn/api/blog_tag");
      set({ BlogTags: response.data.data });
    } catch (error) {
      console.error("Error fetching BlogTags:", error);
    }
  },
}));
