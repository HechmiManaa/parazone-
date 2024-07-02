"use client";

import { useEffect, useMemo, useState } from "react";
import { useProductStore } from "@/hooks/useProduct"; // Adjust the import path
import { ProductCard } from "@/components/ProductCard";
import Link from "next/link";
import { useBrandStore } from "@/hooks/useBrand";

export default function ProductsPageByBrand({
  brandSlug,
}: {
  brandSlug: string;
}) {
  const { products, fetchProducts } = useProductStore();
  const { Brands, fetchBrands } = useBrandStore();

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  useEffect(() => {
    fetchProducts();
    fetchBrands();
  }, [fetchProducts, fetchBrands]);

  const brand = useMemo(
    () => Brands.find((brand) => brand.slug_title === brandSlug),
    [brandSlug, Brands]
  );

  const brandProducts = useMemo(
    () =>
      products.filter((product) => product.brand_id?.slug_title === brandSlug),
    [products]
  );

  const totalPages = Math.ceil(brandProducts.length / productsPerPage);

  const paginatedProducts = useMemo(
    () =>
      brandProducts.slice(
        (currentPage - 1) * productsPerPage,
        currentPage * productsPerPage
      ),
    [brandProducts, currentPage, productsPerPage]
  );

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="w-full mx-auto py-12 bg-gray-100">
      <h1 className="text-2xl ml-4 lg:ml-10 font-bold mb-8 capitalize">
        {brand?.title}
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8 mx-2 lg:mx-10">
        {paginatedProducts.length > 0 ? (
          paginatedProducts.map((product) => (
            <div key={product.id}>
              <Link href={`/brands/${brand?.slug_title}/${product?.slug}`}>
                <ProductCard
                  title={product.title}
                  product_img={product.product_img}
                  brand_id={product.brand_id}
                  new={false}
                />
              </Link>
            </div>
          ))
        ) : (
          <div className="text-center text-lg py-44">
            Aucun produit disponible pour la catégorie {brand?.title}
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-8">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-1 bg-gray-300 rounded hover:bg-gray-400 disabled:bg-gray-200"
        >
          Précédent
        </button>
        <span className="px-4 py-2 mx-1">{`Page ${currentPage} sur ${totalPages}`}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-1 bg-gray-300 rounded hover:bg-gray-400 disabled:bg-gray-200"
        >
          Suivant
        </button>
      </div>
    </div>
  );
}
