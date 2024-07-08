// ProductsPageByCategory.tsx
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
  const productsPerPage = 24;
  const [selectedBrands, setSelectedBrands] = useState<number[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<
    { min: number; max: number }[]
  >([]);

  const [productPrices, setProductPrices] = useState<Record<string, number>>(
    {}
  );

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
    return products
      .filter((product) => productIds.includes(product.id))
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
  }, [products, productIds, brandProductCounts]);

  const filteredProducts = useMemo(() => {
    let filtered = categoryProducts;

    if (selectedBrands.length > 0) {
      filtered = filtered.filter((product) =>
        selectedBrands.includes(product.brand_id.id)
      );
    }

    if (selectedPriceRanges.length > 0) {
      const priceFilter = (product: any) => {
        const productPrice = productPrices[product.id];
        return selectedPriceRanges.some((range) => {
          return productPrice >= range.min && productPrice <= range.max;
        });
      };

      filtered = filtered.filter(priceFilter);
    }

    return filtered;
  }, [categoryProducts, selectedBrands, selectedPriceRanges, productPrices]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginatedProducts = useMemo(
    () =>
      filteredProducts.slice(
        (currentPage - 1) * productsPerPage,
        currentPage * productsPerPage
      ),
    [filteredProducts, currentPage, productsPerPage]
  );

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleFilterChange = (
    brands: number[],
    prices: { min: number; max: number }[]
  ) => {
    setSelectedBrands(brands);
    setSelectedPriceRanges(
      prices.map((price) => ({ min: price.min, max: price.max }))
    );
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const handlePriceChange = (productId: string, price: number) => {
    setProductPrices((prevPrices) => ({ ...prevPrices, [productId]: price }));
  };

  return (
    <div className="w-full mx-auto py-12 bg-gray-100">
      <h1 className="text-2xl ml-4 lg:ml-10 font-bold mb-8 capitalize">
        {category?.name || "Category"}
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
                  <Link
                    href={`/category/${parentCategory}/${category?.slug}/${product?.slug}`}
                  >
                    <ProductCard
                      id={product.id}
                      title={product.title}
                      product_img={product.product_img}
                      brand_id={product.brand_id}
                      new={false}
                      onPriceChange={(price) =>
                        handlePriceChange(product.id, price)
                      }
                    />
                  </Link>
                  <div>{productPrices[product.id]}</div>
                </div>
              ))
            ) : (
              <div className="text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg py-20">
                Aucun produit disponible pour la catégorie {category?.name}
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
      </div>
    </div>
  );
}
