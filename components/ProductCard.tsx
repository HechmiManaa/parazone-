import { useCategoryStore } from "@/hooks/useCategory";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { Product } from "@/hooks/useProduct";
import { useRelationStore } from "@/hooks/useRelation";

export function ProductCard({
  id,
  title,
  slug,
  long_description,
  short_description,
  product_img,
  brand_id,
  store_id,
}: Product) {
  const { categories, fetchCategories } = useCategoryStore();
  const { relations, fetchRelations } = useRelationStore();

  useEffect(() => {
    fetchRelations();
  }, [fetchRelations]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden w-80  cursor-pointer h-full">
      <Link href={`/category/${slug}`}>
        <div className="relative w-full h-48 ">
          <Image
            alt={title}
            src={`${product_img}`}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            className="rounded-t-lg"
          />
        </div>
        <div className="p-4 h-40 flex flex-col justify-around">
          <p className="text-sm font-semibold text-gray-900">{title}</p>
          <div>
            <p className="text-xs font-semibold text-gray-600">brand: dezd</p>
            <p className="text-xs font-semibold text-gray-600">category: aze</p>
          </div>

          <p className="overflow-hidden whitespace-nowrap overflow-ellipsis text-gray-700">
            {/*<div dangerouslySetInnerHTML={{ __html: description }}></div>*/}
          </p>
        </div>
      </Link>
    </div>
  );
}
