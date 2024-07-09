// ProductCard.tsx
import Image from "next/image";
import { Brand } from "@/hooks/useBrand";

export interface ProductCardProps {
  id: string;
  title: string;
  product_img: string;
  value: number;
  brand_id?: Brand;
  new: boolean;
}

export function ProductCard({
  id,
  title,
  product_img,
  brand_id,
  value,
  new: isNew,
}: ProductCardProps) {
  return (
    <div className="card w-40 h-52 lg:h-72 lg:w-56 bg-base-100 border-2 border-neutral-300 relative">
      <figure className="p-2">
        <Image
          alt={title}
          src={`${product_img}`}
          width={500}
          height={500}
          className="object-cover rounded-full w-full h-28 lg:h-36 mt-4"
        />
      </figure>
      <div className="p-2">
        <h2 className="text-[10px] lg:text-xs mb-12">{title}</h2>

        <div className="card-actions justify-end absolute bottom-10">
          <div
            className={`${
              !brand_id?.title ? "" : "badge badge-outline"
            } text-xs text-[8px]`}
          >
            {brand_id?.title}
          </div>
        </div>

        {isNew && (
          <div className="card-actions justify-end absolute top-2 right-2">
            <div className="badge badge-outline text-xs text-[8px] green-background text-white">
              NEW
            </div>
          </div>
        )}

        <div className="flex justify-start items-center gap-2">
          <div className="text-xs">à partir de</div>
          <div className=" green">{value} DT</div>
        </div>
      </div>
    </div>
  );
}
