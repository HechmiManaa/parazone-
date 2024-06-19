import Image from "next/image";
import { Product } from "@/hooks/useProduct";

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
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden w-80 cursor-pointer h-full">
      <div className="relative w-full h-48">
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
          <p className="text-xs font-semibold text-gray-600">
            Brand: {brand_id?.title}
          </p>
        </div>
        <div className="overflow-hidden whitespace-nowrap overflow-ellipsis text-gray-700">
          <div
            className="text-xs font-semibold text-gray-600"
            dangerouslySetInnerHTML={{ __html: short_description }}
          ></div>
        </div>
      </div>
    </div>
  );
}
