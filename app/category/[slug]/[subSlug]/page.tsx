"use client";

import { useEffect } from "react";
import { useProductStore } from "@/hooks/useProduct"; // Adjust the import path
import { ProductCard } from "@/components/ProductCard";
import { useCategoryStore } from "@/hooks/useCategory";

export default function ProductsPageByCategory({
  params,
}: {
  params: { subSlug: string };
}) {
  const categorySlug = params.subSlug;
  const { products, fetchProducts } = useProductStore();
  const { categories, fetchCategories } = useCategoryStore();

  useEffect(() => {
    fetchProducts();
  }, [categorySlug, fetchProducts]);

  const categoryProducts = products.filter(
    (product) => product.category_id.slug === categorySlug
  );

  const Category = categories.find(
    (category) => category.slug === categorySlug
  );

  useEffect(() => {
    if (Category) {
      fetchCategories();
    }
  }, [categorySlug, fetchCategories, Category]);

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-2xl ml-4 font-bold mb-8 capitalize">
        {Category?.name}
      </h1>
      <div className="flex flex-col lg:flex-row flex-wrap justify-start items-center gap-4">
        {categoryProducts.length > 0 ? (
          categoryProducts.map((product) => (
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
          ))
        ) : (
          <div className="text-cente text-lg py-44">
            Aucun produit disponible pour la catégorie {Category?.name}
          </div>
        )}
      </div>
    </div>
  );
}
