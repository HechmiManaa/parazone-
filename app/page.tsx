"use client";

import Hero from "@/components/Hero";
import { ProductCard } from "@/components/ProductCard";
import { CiPill } from "react-icons/ci";
import { CiDeliveryTruck } from "react-icons/ci";
import { MdOutlineShield } from "react-icons/md";
import { HiArrowSmallRight } from "react-icons/hi2";
import { useProductStore } from "@/hooks/useProductStore";
import { useEffect } from "react";
import { useTest } from "@/hooks/useTest";

export default function HomePage() {
  const { products, fetchProducts } = useProductStore();
  const { categories, fetchCategories } = useTest();
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  console.log(categories);

  return (
    <>
      <section className="px-6 md:px-20 pb-24 pt-10 background-i">
        <div className="flex max-xl:flex-col gap-16">
          <div className="flex flex-col justify-center flex-1">
            <p className="small-text">
              Your Trusted Parapharmacie Partner{" "}
              <HiArrowSmallRight className="mt-1" />
            </p>
            <h2>{categories[0]?.name}</h2>
            <h1 className="head-text">
              Discover Health & Wellness with Parazone
            </h1>

            <p className="mt-6">
              Discover a wide range of healthcare products and services at your
              fingertips.
            </p>
          </div>
          <div className="flex-1 ">
            <Hero />
          </div>
        </div>
      </section>

      <section className="trending-section py-8">
        <div className="mx-auto">
          <h2 className="text-center text-2xl mb-2 font-extrabold text-black py-4">
            Latest drops
          </h2>
          <div className="flex flex-col lg:flex-row justify-center items-center gap-2 w-full">
            {products
              .slice(-4)
              .reverse()
              .map((product) => (
                <div key={product.id}>
                  <ProductCard
                    id={product.id}
                    category_id={product.category_id}
                    url={product.url}
                    name={product.name}
                    description={product.description}
                    brand={product.brand}
                    slug={product.slug}
                  />
                </div>
              ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 lg:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-950 rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="text-4xl mr-2">
                  <CiPill />
                </div>
                <h3 className="text-xl font-bold">Wide Product Selection</h3>
              </div>
              <p className="text-gray-500 dark:text-gray-400">
                Explore our extensive range of healthcare products, from
                vitamins and supplements to personal care items.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-950 rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="text-4xl mr-2">
                  <CiDeliveryTruck />
                </div>
                <h3 className="text-xl font-bold">Convenient Delivery</h3>
              </div>
              <p className="text-gray-500 dark:text-gray-400">
                Get your orders delivered right to your doorstep, ensuring a
                hassle-free shopping experience.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-950 rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="text-4xl mr-2">
                  <MdOutlineShield />
                </div>
                <h3 className="text-xl font-bold">Trusted Quality</h3>
              </div>
              <p className="text-gray-500 dark:text-gray-400">
                Rest assured that all our products meet the highest quality
                standards for your well-being.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-200 dark:bg-gray-800 py-12 md:py-20 lg:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Explore Our Services
            </h2>
            <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
              From consultations to personalized recommendations, we are here to
              support your healthcare needs.
            </p>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-950 rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <h3 className="text-xl font-bold">
                    Personalized Consultations
                  </h3>
                </div>
                <p className="text-gray-500 dark:text-gray-400">
                  Schedule a consultation with our healthcare experts to get
                  personalized recommendations.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-950 rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <h3 className="text-xl font-bold">Wellness Assessments</h3>
                </div>
                <p className="text-gray-500 dark:text-gray-400">
                  Discover your health and wellness needs with our comprehensive
                  assessments.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-950 rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <h3 className="text-xl font-bold">Appointment Scheduling</h3>
                </div>
                <p className="text-gray-500 dark:text-gray-400">
                  Book appointments with our healthcare professionals at your
                  convenience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
