"use client";

import { useEffect, useMemo } from "react";
import { useProductStore } from "@/hooks/useProduct"; // Adjust the import path
import { ProductCard } from "@/components/ProductCard";
import { useCategoryStore } from "@/hooks/useCategory";
import { useRelationStore } from "@/hooks/useRelation";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ProductsPageByCategory({
  params,
}: {
  params: { subSlug: string };
}) {
  const categorySlug = params.subSlug;
  const { products, fetchProducts } = useProductStore();
  const { categories, fetchCategories } = useCategoryStore();
  const { relations, fetchRelations } = useRelationStore();
  const pathname = usePathname();

  // pathname will be like "/category/visage/paux-grasses"
  const parts = pathname.split("/");
  const parentCategory = parts[2]; // Get the third part (considering parts[0] is an empty string)

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchRelations();
  }, [fetchProducts, fetchCategories, fetchRelations]);

  // Find the category matching the slug
  const category = useMemo(
    () => categories.find((category) => category.slug === categorySlug),
    [categorySlug, categories]
  );

  // Get the product IDs related to the category
  const productIds = useMemo(
    () =>
      relations
        .filter(
          (relation) => String(relation.category_id) === String(category?.id)
        )
        .map((relation) => relation.product_id),
    [relations, category?.id]
  );

  // Filter products based on the related product IDs
  const categoryProducts = useMemo(
    () => products.filter((product) => productIds.includes(product.id)),
    [products, productIds]
  );

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-2xl ml-4 font-bold mb-8 capitalize">
        {category?.name || "Category"}
      </h1>

      <div className="flex flex-col lg:flex-row flex-wrap justify-start items-center gap-4">
        {categoryProducts.length > 0 ? (
          categoryProducts.map((product) => (
            <div key={product.id}>
              <Link
                href={`/category/${parentCategory}/${category?.slug}/${product?.slug}`}
              >
                <ProductCard
                  id={product.id}
                  title={product.title}
                  slug={product.slug}
                  product_img={product.product_img}
                  short_description={product.short_description}
                  long_description={product.long_description}
                  brand_id={product.brand_id}
                  store_id={product.store_id}
                />
              </Link>
            </div>
          ))
        ) : (
          <div className="text-center text-lg py-44">
            Aucun produit disponible pour la catégorie {category?.name}
          </div>
        )}
      </div>
    </div>
  );
}
