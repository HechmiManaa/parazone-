// useBlogStore.ts
import { create } from "zustand";
import axios from "axios";

export interface Blog {
  id: number;
  title: string;
  slug: string;
  long_description: string;
  short_description: string;
  author: string;
  image: string;
  created_at: string;
  updated_at: string;
}

interface BlogStore {
  Blogs: Blog[];
  fetchBlogs: () => void;
}

export const useBlogStore = create<BlogStore>((set) => ({
  Blogs: [],
  fetchBlogs: async () => {
    try {
      const response = await axios.get(`https://parazone.tn/api/blog`);
      set({ Blogs: response.data.data });
    } catch (error) {
      console.error(`Error fetching Blogs`, error);
    }
  },
}));
