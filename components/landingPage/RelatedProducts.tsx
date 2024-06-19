"use client";
import { useProductStore } from "@/hooks/useProduct";
import React, { useEffect } from "react";
import { ProductCard } from "../ProductCard";

export const RelatedProducts = () => {
  const { products, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  return (
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
                  url={product.product_img}
                  name={product.title}
                  description={product.short_description}
                  brand={product.brand}
                  slug={product.slug}
                />
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};
