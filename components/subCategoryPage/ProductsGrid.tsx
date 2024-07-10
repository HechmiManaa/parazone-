"use client";

import { useEffect, useMemo, useState } from "react";
import { useProductStore } from "@/hooks/useProduct";
import { ProductCard } from "@/components/ProductCard";
import { useCategoryStore } from "@/hooks/useCategory";
import { useRelationStore } from "@/hooks/useRelation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Filter from "../Filter";

export default function ProductsPageByCategory({
  categorySlug,
}: {
  categorySlug: string;
}) {
  const { products, fetchProducts } = useProductStore();
  const { categories, fetchCategories } = useCategoryStore();
  const { relations, fetchRelations } = useRelationStore();

  const pathname = usePathname();
  const parts = pathname.split("/");
  const parentCategory = parts[2];
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 25;
  const [selectedBrands, setSelectedBrands] = useState<number[]>([]);
  const [selectedPrices, setSelectedPrices] = useState<number[]>([]);
  const [selectedSort, setSelectedSort] = useState<string>("");
  const [priceRanges, setPriceRanges] = useState<
    Array<{ id: number; label: string; range: { min: number; max: number } }>
  >([]);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchRelations();
  }, [fetchProducts, fetchCategories, fetchRelations]);

  const category = useMemo(
    () => categories.find((category) => category.slug === categorySlug),
    [categorySlug, categories]
  );

  const productIds = useMemo(
    () =>
      relations
        .filter(
          (relation) => String(relation.category_id) === String(category?.id)
        )
        .map((relation) => relation.product_id),
    [relations, category?.id]
  );

  const categoryProducts = useMemo(
    () => products.filter((product) => productIds.includes(product.id)),
    [products, productIds]
  );

  const brandProductCounts = useMemo(() => {
    const counts: Record<number, number> = {};
    categoryProducts.forEach((product) => {
      counts[product.brand_id.id] = (counts[product.brand_id.id] || 0) + 1;
    });
    return counts;
  }, [categoryProducts]);

  const brandsWithProducts = useMemo(() => {
    return categoryProducts
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
  }, [categoryProducts, brandProductCounts]);

  const filteredProducts = useMemo(() => {
    let filtered = categoryProducts;

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
  }, [categoryProducts, selectedBrands, selectedPrices, priceRanges]);

  const sortProducts = (products: any[], sortOption: string) => {
    switch (sortOption) {
      case "price-asc":
        return products.sort((a, b) => a.value - b.value);
      case "price-desc":
        return products.sort((a, b) => b.value - a.value);
      case "name-asc":
        return products.sort((a, b) => a.title.localeCompare(b.title));
      case "name-desc":
        return products.sort((a, b) => b.title.localeCompare(a.title));
      default:
        return products;
    }
  };

  const sortedProducts = useMemo(() => {
    const sorted = sortProducts([...filteredProducts], selectedSort);
    return sorted;
  }, [filteredProducts, selectedSort]);

  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  const paginatedProducts = useMemo(
    () =>
      sortedProducts.slice(
        (currentPage - 1) * productsPerPage,
        currentPage * productsPerPage
      ),
    [sortedProducts, currentPage, productsPerPage]
  );

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

  const handleSortChange = (sortOption: string) => {
    setSelectedSort(sortOption);
    setCurrentPage(1); // Reset to first page when sort changes
  };

  return (
    <div className="min-h-screen w-full mx-auto py-12 bg-gray-100 relative">
      <h1 className="text-2xl ml-4 lg:ml-10 font-bold mb-8 capitalize">
        {category?.name || "Category"}
      </h1>
      <div className="flex justify-around ">
        <div className="">
          <Filter
            onFilterChange={handleFilterChange}
            brands={brandsWithProducts}
            onSortChange={handleSortChange}
          />
        </div>
        <div className="w-full mx-auto ">
          <div
            className="flex flex-wrap justify-center gap-4 lg:gap-8
             w-full mx-auto"
          >
            {paginatedProducts.length > 0 ? (
              paginatedProducts.map((product) => (
                <div key={product.id}>
                  <Link
                    href={`/category/${parentCategory}/${category?.slug}/${product?.slug}`}
                  >
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
          {totalPages !== 1 && (
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
          )}
        </div>
      </div>
    </div>
  );
}
