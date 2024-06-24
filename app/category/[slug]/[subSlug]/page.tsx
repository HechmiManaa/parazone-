import { Metadata } from "next";
import ProductsGrid from "@/components/subCategoryPage/ProductsGrid";

function capitalizeSlug(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
export async function generateMetadata({
  params,
}: {
  params: { subSlug: string };
}): Promise<Metadata> {
  return {
    title: capitalizeSlug(params.subSlug), // Capitalize the slug for the title
  };
}

export default function Page({
  params,
}: {
  params: {
    subSlug: string;
    parentCategory: string;
  };
}) {
  return <ProductsGrid categorySlug={params.subSlug} />;
}
