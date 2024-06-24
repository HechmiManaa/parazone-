import CategoryContent from "@/components/categoryPage/CategoryPage";
import { Metadata } from "next";

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
  return <CategoryContent categorySlug={params.slug} />;
}
