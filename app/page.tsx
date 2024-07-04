"use client";

import Hero from "@/components/landingPage/Hero";
import { LatestProducts } from "@/components/landingPage/LatestProducts";
import MoreInfo from "@/components/landingPage/MoreInfo";

export default function HomePage() {
  return (
    <>
      <Hero />
      <LatestProducts />
      <MoreInfo />
    </>
  );
}
