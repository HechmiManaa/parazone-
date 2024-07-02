import BrandProductPage from "@/components/brandPage/BrandProductPage";
import { Metadata } from "next";

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
  params: { productSlug: string };
}): Promise<Metadata> {
  return {
    title: capitalizeSlug(params.productSlug), // Capitalize the slug for the title
  };
}

export default function Page({
  params,
}: {
  params: {
    productSlug: string;
  };
}) {
  return <BrandProductPage productSlug={params.productSlug} />;
}
