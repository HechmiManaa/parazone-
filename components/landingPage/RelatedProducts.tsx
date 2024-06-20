"use client";
import { useProductStore } from "@/hooks/useProduct";
import React, { useEffect } from "react";
import { ProductCard } from "../ProductCard";
import { useRelationStore } from "@/hooks/useRelation";
import { Category, useCategoryStore } from "@/hooks/useCategory";
import Link from "next/link";

export const RelatedProducts = () => {
  const { products, fetchProducts } = useProductStore();
  const { relations, fetchRelations } = useRelationStore();
  const { categories, fetchCategories } = useCategoryStore();

  useEffect(() => {
    fetchProducts();
    fetchRelations();
    fetchCategories();
  }, [fetchProducts, fetchRelations, fetchCategories]);

  const getCategoryById = (categoryId: string) => {
    return categories.find(
      (category) => String(category.id) === String(categoryId)
    );
  };

  const getParentCategory = (category: Category | null | undefined) => {
    if (category && category.parent_id) {
      return getCategoryById(String(category.parent_id));
    }
    return null;
  };

  const getSubCategorySlug = (productId: number) => {
    const relation = relations.find(
      (relation) => relation.product_id === productId
    );
    const subCategory = relation
      ? getCategoryById(String(relation.category_id))
      : null;
    return subCategory ? subCategory.slug : null;
  };

  const getParentCategorySlug = (productId: number) => {
    const relation = relations.find(
      (relation) => relation.product_id === productId
    );
    const subCategory = relation
      ? getCategoryById(String(relation.category_id))
      : null;
    const parentCategory = getParentCategory(subCategory);
    return parentCategory ? parentCategory.slug : null;
  };

  const filteredProducts = products
    .filter((product) =>
      relations.some((relation) => relation.product_id === product.id)
    )
    .map((product) => ({
      ...product,
      parentCategorySlug: getParentCategorySlug(product.id),
      subCategorySlug: getSubCategorySlug(product.id),
    }));

  return (
    <section className="py-8">
      <div className="mx-auto bg-blue-100 pb-20 pt-10">
        <h2 className="text-center text-2xl mb-2 font-extrabold text-black py-2 pb-5">
          Derniers produits
        </h2>
        <div className="flex flex-row flex-wrap  items-center gap-8 mx-2 lg:mx-10">
          {filteredProducts
            .slice(-4)
            .reverse()
            .map((product) => (
              <Link
                key={product.id}
                href={`/category/${product.parentCategorySlug}/${product.subCategorySlug}/${product.slug}`}
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
            ))}
        </div>
      </div>
    </section>
  );
};
