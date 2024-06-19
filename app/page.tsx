"use client";

import Hero from "@/components/landingPage/Hero";
import { RelatedProducts } from "@/components/landingPage/RelatedProducts";
import MoreInfo from "@/components/landingPage/MoreInfo";

export default function HomePage() {
  return (
    <>
      <Hero />
      <RelatedProducts />
      <MoreInfo />
    </>
  );
}
