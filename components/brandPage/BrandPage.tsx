"use client";

import { useBrandStore } from "@/hooks/useBrand";
import { useProductStore } from "@/hooks/useProduct";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo } from "react";

const BrandsPage = () => {
  const { Brands, fetchBrands } = useBrandStore();
  const { products, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchBrands();
    fetchProducts();
  }, [fetchBrands, fetchProducts]);

  // Compute product counts for each brand
  const brandProductCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    products.forEach((product) => {
      const brandId = product.brand_id?.id.toString();
      if (brandId) {
        counts[brandId] = (counts[brandId] || 0) + 1;
      }
    });
    return counts;
  }, [products]);

  return (
    <div className="flex flex-wrap justify-center gap-4 py-10">
      {Brands.map(
        (brand) =>
          brand.slug_title &&
          brand.logo !== "URL du logo de la marque non trouvé" && (
            <Link href={`/marques/${brand.slug_title}`} key={brand.id}>
              <div className="cursor-pointer  bg-white hover:bg-gray-100 dark:bg-gray-950 rounded-lg shadow-md p-6 w-56 text-center flex flex-col items-center justify-between">
                <div className="flex items-center justify-center mb-4">
                  <Image
                    src={brand.logo}
                    alt={brand.title}
                    width={100}
                    height={100}
                    className="object-cover rounded-full w-full"
                  />
                </div>

                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {brandProductCounts[brand.id] || 0} produits
                </div>

                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Voir les produits
                </div>
              </div>
            </Link>
          )
      )}
    </div>
  );
};

export default BrandsPage;
