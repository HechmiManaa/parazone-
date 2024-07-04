import { Metadata } from "next";
import ProductsGrid from "@/components/brandPage/ProdcutsGrid";

function capitalizeSlug(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
export async function generateMetadata({
  params,
}: {
  params: { brandSlug: string };
}): Promise<Metadata> {
  return {
    title: capitalizeSlug(params.brandSlug), // Capitalize the slug for the title
  };
}

export default function Page({
  params,
}: {
  params: {
    brandSlug: string;
  };
}) {
  return <ProductsGrid brandSlug={params.brandSlug} />;
}
