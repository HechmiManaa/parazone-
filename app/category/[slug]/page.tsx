"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import SubCategoryBox from "@/components/SubCategoryBox"; // Adjust the import path as necessary
import { useCategoryStore } from "@/hooks/useCategoryStore"; // Adjust the import path as necessary

export default function Page({
  params,
}: {
  params: {
    slug: any;
  };
}) {
  const { categories, fetchCategories } = useCategoryStore();
  const categorySlug = params.slug;

  useEffect(() => {
    fetchCategories();
  }, [categorySlug, fetchCategories]);

  const parentCategory = categories.find(
    (category) => category.slug === categorySlug
  );

  useEffect(() => {
    if (parentCategory) {
      fetchCategories();
    }
  }, [categorySlug, fetchCategories, parentCategory]);

  return (
    <div className="flex flex-col gap-1 p-4 min-h-screen">
      <h1 className="font-semibold p-2 ">{parentCategory?.name}</h1>
      {categories.map((parentCategory) => (
        <div key={parentCategory.id}>
          <div className="flex flex-wrap gap-2">
            {categories
              .filter(
                (subCategory) =>
                  subCategory.parent_id === parentCategory.id &&
                  parentCategory.slug === categorySlug
              )
              .map((subCategory) => (
                <Link
                  key={subCategory.id}
                  href={`/category/${parentCategory.slug}/${subCategory.slug}`}
                >
                  <div>
                    <SubCategoryBox
                      icon={subCategory.icon}
                      name={subCategory.name}
                    />
                  </div>
                </Link>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
