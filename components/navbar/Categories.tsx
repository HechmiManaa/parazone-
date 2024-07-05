"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import CategoryBox from "./CategoryBox"; // Adjust the import path as necessary
import SubCategoriesBox from "./SubCategoryBox";
import { useCategoryStore } from "@/hooks/useCategory"; // Adjust the import path as necessary
import SearchBar from "./SearchBar";

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
    <div className="flex flex-col  justify-center items-center w-full">
      <div className="blue-background w-full flex flex-col items-center justify-center p-2">
        <h1 className="font-bold text-base lg:text-2xl text-white">
          Comparez et trouvez le prix le moins cher !
        </h1>
        <h2 className=" text-xs lg:text-lg text-center text-white">
          Nous comparons des milliers de produits afin de vous trouver les prix
          les plus bas.
        </h2>
        <div className="bg-white rounded-lg m-4 lg:w-1/3">
          <SearchBar />
        </div>
      </div>
      <div className="green-background flex justify-between lg:justify-center gap-2 items-center py-2 overflow-auto mx-2 md:mx-20 w-full">
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
                  slug={""}
                />
              </Link>
            </div>

            {showSubCategories === parentCategory.id &&
              categories.filter(
                (subCategory) =>
                  String(subCategory.parent_id) === String(parentCategory.id)
              ).length != 0 && (
                <div className="hidden lg:block bg-white shadow-xl absolute p-2 rounded-xl w-[100%] left-0 z-20">
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
    </div>
  );
}
