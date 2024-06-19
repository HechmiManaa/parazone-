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
    <div className="bg-white rounded-lg shadow-lg overflow-hidden h-56 lg:h-80  cursor-pointer hover:bg-gray-50 ">
      <div className="flex items-center justify-center mb-4">
        <Image
          alt={title}
          src={`${product_img}`}
          width={500}
          height={500}
          className=" object-cover rounded-full w-full h-20 lg:h-44"
        />
      </div>
      <div className="p-4 h-22 flex flex-col justify-around">
        <p className="text-xs lg:text-sm font-bold text-gray-900">{title}</p>
        <div>
          <p className="text-xs font-semibold text-gray-600 py-2">
            Marque: {brand_id?.title}
          </p>
        </div>
      </div>
    </div>
  );
}
