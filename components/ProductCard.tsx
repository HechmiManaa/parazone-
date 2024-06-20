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
    <div className="card w-80 bg-base-100 shadow-xl relative">
      <figure>
        <Image
          alt={title}
          src={`${product_img}`}
          width={500}
          height={500}
          className=" object-cover rounded-full w-full h-20 lg:h-40"
        />
      </figure>
      <div className="card-body h-36">
        <h2 className="card-title text-xs">
          {title}
          <div className="badge text-white green-background">NEW</div>
        </h2>

        <div className="card-actions justify-end absolute bottom-5">
          <div className="badge badge-outline text-xs">{brand_id?.title}</div>
          <div className="badge badge-outline text-xs">{store_id?.title}</div>
        </div>
      </div>
    </div>
  );
}
