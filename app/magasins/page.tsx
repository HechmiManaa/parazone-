import StoresPage from "@/components/storePage/StorePage";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Magasins", // Capitalize the slug for the title
  };
}
export default function Page({}) {
  return <StoresPage />;
}
