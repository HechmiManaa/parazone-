"use client";

import { useEffect } from "react";
import Link from "next/link";
import CategoryBox from "./CategoryBox"; // Adjust the import path as necessary
import { useCategoryStore } from "@/hooks/useCategoryStore"; // Adjust the import path as necessary

export default function CategoriesPage() {
  const { categories, fetchCategories } = useCategoryStore();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Filter out parent categories
  const parentCategories = categories.filter(
    (category) => category.parent_id === null
  );

  return (
    <div className="flex justify-between gap-2 items-center py-2 overflow-auto mx-4 md:mx-20">
      {parentCategories.map((parentCategory) => (
        <div key={parentCategory.id} className="mb-4">
          <div className="font-bold text-xl mb-2">
            <Link
              key={parentCategory.id}
              href={`/category/${parentCategory.name.toLowerCase()}`}
            >
              <CategoryBox
                icon={parentCategory.icon}
                name={parentCategory.name}
              />
            </Link>
          </div>
          <div className="flex justify-between gap-2 items-center py-2 overflow-auto">
            {categories
              .filter(
                (subCategory) => subCategory.parent_id === parentCategory.id
              )
              .map((subCategory) => (
                <Link
                  key={subCategory.id}
                  href={`/category/${parentCategory.name.toLowerCase()}/${subCategory.name.toLowerCase()}`}
                >
                  <div>
                    <CategoryBox
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

  <div className="flex justify-between gap-2 items-center py-2 overflow-auto mx-4 md:mx-20">
    {categories.map((category) => (
      <Link
        key={category.id}
        href={`/category/${category.name.toLowerCase()}/${category.name}`}
      >
        <div>
          <CategoryBox icon={category.icon} name={category.name} />
        </div>
      </Link>
    ))}
  </div>;
}
