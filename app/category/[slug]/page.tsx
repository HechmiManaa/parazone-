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
      <div className=" flex flex-col lg:flex-row items-center justify-around lg:border-2 m-2 lg:m-10 lg:px-20">
        <div className="w-full flex flex-col gap-2">
          <h1 className="font-semibold p-2 text-xl ">{parentCategory?.name}</h1>

          <div
            className="mx-4 text-sm"
            dangerouslySetInnerHTML={{
              __html: parentCategory?.description || "",
            }}
          ></div>
        </div>
        <div>
          {parentCategory?.img && (
            <div>
              <img
                src={parentCategory.img}
                alt={parentCategory.name}
                className="w-[80%] h-full object-cover m-10"
              />
            </div>
          )}
        </div>
      </div>

      {parentCategory && (
        <div className="flex flex-wrap gap-2 mx-2 lg:mx-20">
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
