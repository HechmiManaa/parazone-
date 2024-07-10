"use client";
import { useProductStore } from "@/hooks/useProduct";
import React, { useEffect } from "react";
import { ProductCard } from "../ProductCard";
import { useRelationStore } from "@/hooks/useRelation";
import { Category, useCategoryStore } from "@/hooks/useCategory";
import Link from "next/link";

export const LatestProducts = () => {
  const { products, fetchProducts } = useProductStore();
  const { relations, fetchRelations } = useRelationStore();
  const { categories, fetchCategories } = useCategoryStore();

  useEffect(() => {
    fetchProducts();
    fetchRelations();
    fetchCategories();
  }, [fetchProducts, fetchRelations, fetchCategories]);

  // Helper function to find a category by ID
  const getCategoryById = (categoryId: number) => {
    return categories.find((category) => category.id === categoryId);
  };

  // Function to get subcategory slug by product ID
  const getParentCategorySlug = (productId: string) => {
    const relation = relations.find(
      (relation) => String(relation.product_id) === productId
    );
    if (relation) {
      const parentCategory = getCategoryById(Number(relation.category_id));
      return parentCategory ? parentCategory.slug : null;
    }
    return null;
  };

  // Function to get parent category slug by product ID
  const getSubCategorySlug = (productId: string) => {
    // Find all relations for the given product ID
    const productRelations = relations.filter(
      (relation) => String(relation.product_id) === productId
    );

    // Iterate over relations to find parent and subcategory
    let parentCategory = null;
    let subCategory = null;

    productRelations.forEach((relation) => {
      const category = getCategoryById(Number(relation.category_id));
      if (category) {
        if (category.parent_id === null) {
          parentCategory = category; // Category with no parent is considered a parent category
        } else {
          subCategory = category; // Category with a parent_id is considered a subcategory
        }
      }
    });

    return subCategory ? (subCategory as Category).slug : null;
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
        <div className="flex flex-wrap justify-center gap-8 mx-2 lg:mx-10">
          {filteredProducts
            .slice(-5)
            .reverse()
            .map((product) => (
              <Link
                key={product.id}
                href={`/category/${product.parentCategorySlug}/${product.subCategorySlug}/${product.slug}`}
              >
                <ProductCard
                  id={product.id}
                  title={product.title}
                  product_img={product.product_img}
                  brand_id={product.brand_id}
                  new={true}
                  value={product.value}
                />
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
};
