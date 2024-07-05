import BrandsPage from "@/components/brandPage/BrandPage";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Marques", // Capitalize the slug for the title
  };
}
export default function Page({}) {
  return (
    <div className="min-h-screen">
      <BrandsPage />
    </div>
  );
}
