"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import CategoryBox from "./CategoryBox"; // Adjust the import path as necessary
import SubCategoriesBox from "./SubCategoryBox";
import { useCategoryStore } from "@/hooks/useCategory"; // Adjust the import path as necessary

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

  console.log(parentCategories);

  return (
    <div className="flex justify-between gap-2 items-center py-2 overflow-auto mx-1 md:mx-20">
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
              href={`/category/${parentCategory.slug}`}
            >
              <CategoryBox
                name={parentCategory.name}
                id={parentCategory.id}
                img={""}
              />
            </Link>
          </div>

          {showSubCategories === parentCategory.id &&
            categories.filter(
              (subCategory) =>
                String(subCategory.parent_id) === String(parentCategory.id)
            ).length != 0 && (
              <div className="hidden lg:block bg-white shadow-xl absolute p-2 rounded-xl w-[100%] left-0 z-10">
                <div className="font-bold p-4">{parentCategory.name}</div>

                <div className="flex flex-wrap gap-2 items-center pb-4 px-10 overflow-auto">
                  {categories
                    .filter(
                      (subCategory) =>
                        String(subCategory.parent_id) ===
                        String(parentCategory.id)
                    )
                    .map((subCategory) => (
                      <Link
                        onClick={() => setShowSubCategories(null)}
                        key={subCategory.id}
                        href={`/category/${parentCategory.slug}/${subCategory.slug}`}
                      >
                        <div>
                          <SubCategoriesBox name={subCategory.name} />
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
