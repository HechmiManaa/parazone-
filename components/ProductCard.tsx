import { Category, useCategoryStore } from "@/hooks/useCategoryStore";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

interface ProductCardProps {
  id: number;
  name: string;
  description: string;
  category_id: Category;
  brand?: string | null;
  url?: string | null;
}

export function ProductCard({
  id,
  name,
  description,
  category_id,
  brand,
  url,
}: ProductCardProps) {
  const { categories, fetchCategories } = useCategoryStore();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const parentCategory = categories.find(
    (cat) => cat.id === category_id.parent_id
  );

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden w-80  cursor-pointer h-full">
      <Link
        href={`/category/${parentCategory?.name.toLowerCase()}/${category_id.name.toLowerCase()}/${name.toLowerCase()}`}
      >
        <div className="relative w-full h-48 ">
          <Image
            alt={name}
            src={`https://admin.parazone.tn/assets/${url}`}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            className="rounded-t-lg"
          />
        </div>
        <div className="p-4 h-40 flex flex-col justify-around">
          <p className="text-sm font-semibold text-gray-900">{name}</p>
          <div>
            <p className="text-xs font-semibold text-gray-600">
              brand: {brand}
            </p>
            <p className="text-xs font-semibold text-gray-600">
              category: {category_id.name}
            </p>
          </div>

          <p className="overflow-hidden whitespace-nowrap overflow-ellipsis text-gray-700">
            {/*<div dangerouslySetInnerHTML={{ __html: description }}></div>*/}
          </p>
        </div>
      </Link>
    </div>
  );
}
