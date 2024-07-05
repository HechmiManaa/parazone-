import { Metadata } from "next";
import BlogPage from "@/components/blogPage/BlogPage";

// Capitalize each word in the slug
function capitalizeSlug(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  return {
    title: capitalizeSlug(params.slug), // Capitalize the slug for the title
  };
}

export default function Page({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  return <BlogPage slug={params.slug} />;
}
