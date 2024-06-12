"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import CategoryBox from "./CategoryBox"; // Adjust the import path as necessary
import SubCategoriesBox from "./SubCategoriesBox";
import { useCategoryStore } from "@/hooks/useCategoryStore"; // Adjust the import path as necessary

export default function CategoriesPage() {
  const { categories, fetchCategories } = useCategoryStore();
  const [showSubCategories, setShowSubCategories] = useState<number | null>(
    null
  );

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
        <div
          key={parentCategory.id}
          className=""
          onMouseEnter={() => setShowSubCategories(parentCategory.id)}
          onMouseLeave={() => setShowSubCategories(null)}
        >
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

          {showSubCategories === parentCategory.id &&
            categories.filter(
              (subCategory) => subCategory.parent_id === parentCategory.id
            ).length != 0 && (
              <div className="hidden lg:block bg-white shadow-xl absolute p-2 rounded-xl w-[100%] left-0 z-10">
                <div className="font-bold p-4">{parentCategory.name}</div>

                <div className="flex flex-wrap gap-2 items-center pb-4 px-10 overflow-auto">
                  {categories
                    .filter(
                      (subCategory) =>
                        subCategory.parent_id === parentCategory.id
                    )
                    .map((subCategory) => (
                      <Link
                        onClick={() => setShowSubCategories(null)}
                        key={subCategory.id}
                        href={`/category/${parentCategory.name.toLowerCase()}/${subCategory.name.toLowerCase()}`}
                      >
                        <div>
                          <SubCategoriesBox
                            icon={subCategory.icon}
                            name={subCategory.name}
                          />
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
            )}
        </div>
      ))}
    </div>
  );
}
