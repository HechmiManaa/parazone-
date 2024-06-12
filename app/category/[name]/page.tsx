"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import SubCategoryBox from "@/components/SubCategoryBox"; // Adjust the import path as necessary
import { useCategoryStore } from "@/hooks/useCategoryStore"; // Adjust the import path as necessary

export default function Page({
  params,
}: {
  params: {
    name: any;
  };
}) {
  const { categories, fetchCategories } = useCategoryStore();
  const categoryName = params.name;

  useEffect(() => {
    fetchCategories();
  }, [categoryName, fetchCategories]);

  return (
    <div className="flex flex-col gap-4 p-4">
      {categories.map((parentCategory) => (
        <div key={parentCategory.id}>
          <div className="flex flex-wrap gap-2">
            {categories
              .filter(
                (subCategory) =>
                  subCategory.parent_id === parentCategory.id &&
                  parentCategory.name.toLowerCase() ===
                    categoryName.toLowerCase()
              )
              .map((subCategory) => (
                <Link
                  key={subCategory.id}
                  href={`/category/${parentCategory.name.toLowerCase()}/${subCategory.name.toLowerCase()}`}
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
