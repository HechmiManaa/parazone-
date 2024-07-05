import BlogsPage from "@/components/blogPage/BlogsPage";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Blogs", // Capitalize the slug for the title
  };
}
export default function Page({}) {
  return <BlogsPage />;
}
