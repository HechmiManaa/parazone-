"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import SubCategoryBox from "@/components/SubCategoryBox"; // Adjust the import path as necessary
import { useCategoryStore } from "@/hooks/useCategory"; // Adjust the import path as necessary

export default function Page({
  params,
}: {
  params: {
    slug: string; // Specify type as string
  };
}) {
  const { categories, fetchCategories } = useCategoryStore();
  const categorySlug = params.slug;

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]); // Fetch categories only once

  const parentCategory = categories.find(
    (category) => category.slug === categorySlug
  );

  const subCategories = categories.filter(
    (subCategory) =>
      Number(subCategory.parent_id) === Number(parentCategory?.id)
  );

  return (
    <div className="flex flex-col gap-1 p-4 min-h-screen">
      <h1 className="font-semibold p-2 ">{parentCategory?.name}</h1>
      {parentCategory && (
        <div className="flex flex-wrap gap-2">
          {subCategories.map((subCategory) => (
            <Link
              key={subCategory.id}
              href={`/category/${parentCategory.slug}/${subCategory.slug}`}
            >
              <div>
                <SubCategoryBox
                  img={subCategory.img}
                  name={subCategory.name}
                  id={subCategory.id}
                />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
