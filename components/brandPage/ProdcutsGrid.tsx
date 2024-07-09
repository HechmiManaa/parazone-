"use client";

import { useEffect, useMemo, useState } from "react";
import { useProductStore } from "@/hooks/useProduct"; // Adjust the import path
import { ProductCard } from "@/components/ProductCard";
import Link from "next/link";
import { useBrandStore } from "@/hooks/useBrand";
import Filter from "../Filter";

export default function ProductsPageByBrand({
  brandSlug,
}: {
  brandSlug: string;
}) {
  const { products, fetchProducts } = useProductStore();
  const { Brands, fetchBrands } = useBrandStore();

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 25;
  const [selectedBrands, setSelectedBrands] = useState<number[]>([]);
  const [selectedPrices, setSelectedPrices] = useState<number[]>([]);
  const [priceRanges, setPriceRanges] = useState<
    Array<{ id: number; label: string; range: { min: number; max: number } }>
  >([]);

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
    [products, brandSlug]
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

  const brandProductCounts = useMemo(() => {
    const counts: Record<number, number> = {};
    brandProducts.forEach((product) => {
      counts[product.brand_id.id] = (counts[product.brand_id.id] || 0) + 1;
    });
    return counts;
  }, [brandProducts]);

  const brandsWithProducts = useMemo(() => {
    return brandProducts
      .map((product) => product.brand_id)
      .filter(
        (brand, index, self) =>
          brand && self.findIndex((b) => b.id === brand.id) === index
      )
      .map((brand) => ({
        ...brand,
        productCount: brandProductCounts[brand.id] || 0,
      }))
      .filter((brand) => brand.productCount > 0);
  }, [brandProducts, brandProductCounts]);

  const handleFilterChange = (
    brands: number[],
    prices: number[],
    ranges: Array<{
      id: number;
      label: string;
      range: { min: number; max: number };
    }>
  ) => {
    setSelectedBrands(brands);
    setSelectedPrices(prices);
    setPriceRanges(ranges);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  return (
    <div className="w-full mx-auto py-12 bg-gray-100 relative">
      <h1 className="text-2xl font-bold text-center mb-4">{brand?.title}</h1>
      <div className="flex">
        <Filter
          onFilterChange={handleFilterChange}
          brands={brandsWithProducts}
        />
        <div>
          <div
            className="flex flex-wrap justify-center gap-4 lg:gap-8
             w-full mx-auto"
          >
            {paginatedProducts.length > 0 ? (
              paginatedProducts.map((product) => (
                <div key={product.id}>
                  <Link href={`/produit/${product?.slug}`}>
                    <ProductCard
                      id={product.id}
                      title={product.title}
                      product_img={product.product_img}
                      brand_id={product.brand_id}
                      new={false}
                      value={product.value}
                    />
                  </Link>
                </div>
              ))
            ) : (
              <p>No products found</p>
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
      </div>
    </div>
  );
}
