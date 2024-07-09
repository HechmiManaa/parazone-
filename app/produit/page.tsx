"use client";
import { useEffect, useMemo, useState } from "react";
import { Product, useProductStore } from "@/hooks/useProduct";
import Filter from "@/components/Filter";
import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";

const SearchResultPage = ({ searchParams }: { searchParams: any }) => {
  const [searchedProducts, setSearchedProducts] = useState<Product[]>([]);
  const { products, fetchProducts } = useProductStore();
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 25;
  const [selectedBrands, setSelectedBrands] = useState<number[]>([]);
  const [selectedPrices, setSelectedPrices] = useState<number[]>([]);
  const [priceRanges, setPriceRanges] = useState<
    Array<{ id: number; label: string; range: { min: number; max: number } }>
  >([]);

  console.log("searchTerm : ", searchParams.search);
  const searchTerm = searchParams.search;

  useEffect(() => {
    if (searchTerm) {
      const normalizeString = (str: string) =>
        str
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[^a-z0-9]/g, "");

      const normalizedSearchTerm = normalizeString(searchTerm);
      const results = products.filter((product) => {
        const normalizedTitle = normalizeString(product.title);
        return normalizedTitle.includes(normalizedSearchTerm);
      });
      setSearchedProducts(results);
    } else {
      setSearchedProducts([]);
    }
  }, [searchTerm, products]);

  const filteredProducts = useMemo(() => {
    let filtered = searchedProducts;

    if (selectedBrands.length > 0) {
      filtered = filtered.filter((product) =>
        selectedBrands.includes(product.brand_id.id)
      );
    }

    if (selectedPrices.length > 0) {
      filtered = filtered.filter((product) => {
        const price = product.value;
        return selectedPrices.some((priceId) => {
          const range = priceRanges.find(
            (range) => range.id === priceId
          )?.range;
          return range ? price >= range.min && price <= range.max : false;
        });
      });
    }

    return filtered;
  }, [searchedProducts, selectedBrands, selectedPrices, priceRanges]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginatedProducts = useMemo(
    () =>
      filteredProducts.slice(
        (currentPage - 1) * productsPerPage,
        currentPage * productsPerPage
      ),
    [filteredProducts, currentPage, productsPerPage]
  );

  const brandProductCounts = useMemo(() => {
    const counts: Record<number, number> = {};
    searchedProducts.forEach((product) => {
      counts[product.brand_id.id] = (counts[product.brand_id.id] || 0) + 1;
    });
    return counts;
  }, [searchedProducts]);

  const brandsWithProducts = useMemo(() => {
    return searchedProducts
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
  }, [searchedProducts, brandProductCounts]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

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
    <div className="w-full mx-auto py-12 bg-gray-100">
      <h1 className="text-2xl font-bold mb-3 text-center">
        Résultat pour "{searchTerm}"
      </h1>
      <div className="flex">
        <Filter
          onFilterChange={handleFilterChange}
          brands={brandsWithProducts}
        />
        <div>
          <div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5
           gap-8 mx-2 lg:mx-10"
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
};

export default SearchResultPage;
