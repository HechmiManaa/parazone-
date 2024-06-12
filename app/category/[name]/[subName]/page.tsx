"use client";

import { useEffect } from "react";
import { useProductStore } from "@/hooks/useProductStore"; // Adjust the import path
import { ProductCard } from "@/components/ProductCard";

export default function ProductsPageByCategory({
  params,
}: {
  params: { subName: string };
}) {
  const category = params.subName;
  const { products, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [category, fetchProducts]);

  const categoryProducts = products.filter(
    (product) =>
      product.category_id.name.toLowerCase() ===
      decodeURIComponent(category).toLowerCase()
  );
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-2xl ml-4 font-bold mb-8 capitalize">
        {decodeURIComponent(category)}
      </h1>
      <div className="flex flex-col lg:flex-row flex-wrap justify-start items-center gap-4">
        {categoryProducts.length > 0 ? (
          categoryProducts.map((product) => (
            <div key={product.id}>
              <ProductCard
                id={product.id}
                category_id={product.category_id}
                url={product.url}
                name={product.name}
                description={product.description}
                brand={product.brand}
              />
            </div>
          ))
        ) : (
          <div className="text-cente text-lg py-44">
            Aucun produit disponible pour la catégorie{" "}
            {decodeURIComponent(category)}
          </div>
        )}
      </div>
    </div>
  );
}
