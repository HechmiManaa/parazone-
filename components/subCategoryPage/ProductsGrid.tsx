"use client";

import { useEffect, useMemo, useState } from "react";
import { useProductStore } from "@/hooks/useProduct"; // Adjust the import path
import { ProductCard } from "@/components/ProductCard";
import { useCategoryStore } from "@/hooks/useCategory";
import { useRelationStore } from "@/hooks/useRelation";
import Link from "next/link";
import { usePathname } from "next/navigation";

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

  const totalPages = Math.ceil(categoryProducts.length / productsPerPage);

  const paginatedProducts = useMemo(
    () =>
      categoryProducts.slice(
        (currentPage - 1) * productsPerPage,
        currentPage * productsPerPage
      ),
    [categoryProducts, currentPage, productsPerPage]
  );

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="w-full mx-auto py-12 bg-gray-100">
      <h1 className="text-2xl ml-4 lg:ml-10 font-bold mb-8 capitalize">
        {category?.name || "Category"}
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8 mx-2 lg:mx-10">
        {paginatedProducts.length > 0 ? (
          paginatedProducts.map((product) => (
            <div key={product.id}>
              <Link
                href={`/category/${parentCategory}/${category?.slug}/${product?.slug}`}
              >
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
  );
}
