"use client";
import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { IoSearchOutline } from "react-icons/io5";
import { Product, useProductStore } from "@/hooks/useProduct";
import Image from "next/image";
import Link from "next/link";
import { useCategoryStore } from "@/hooks/useCategory";
import { useRelationStore } from "@/hooks/useRelation";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const { categories, fetchCategories } = useCategoryStore();
  const { products, fetchProducts } = useProductStore();
  const { relations, fetchRelations } = useRelationStore();
  const searchBarRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (products.length === 0) fetchProducts();
    if (relations.length === 0) fetchRelations();
  }, [products.length, relations.length, fetchProducts, fetchRelations]);

  useEffect(() => {
    if (searchTerm) {
      const results = products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(results);
    } else {
      setFilteredProducts([]);
    }
  }, [searchTerm, products]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    setSearchTerm(""); // Clear the search term when the pathname changes
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target as Node)
      ) {
        setSearchTerm("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getCategoryById = (categoryId: string | null | undefined) =>
    categories.find((category) => String(category.id) === categoryId);

  const getSlugsForProduct = (productId: string) => {
    const relation = relations.find((rel) => rel.product_id === productId);
    if (!relation) return { parentCategorySlug: null, subCategorySlug: null };

    const subCategory = getCategoryById(String(relation.category_id));
    const parentCategory = subCategory
      ? getCategoryById(String(subCategory.parent_id))
      : null;

    return {
      parentCategorySlug: parentCategory ? parentCategory.slug : null,
      subCategorySlug: subCategory ? subCategory.slug : null,
    };
  };

  return (
    <div ref={searchBarRef} className="relative z-20">
      <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2 w-full shadow-sm focus-within:border-blue-400 focus-within:ring focus-within:ring-blue-300 focus-within:ring-opacity-50 transition duration-300 ease-in-out">
        <IoSearchOutline size={20} className="text-gray-400 mr-4" />
        <input
          type="text"
          placeholder="Recherchez votre produit ici..."
          className="border-none outline-none flex-grow"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {searchTerm && (
        <div className="absolute bg-white h-64 overflow-y-auto p-4 w-full shadow-2xl mt-2 rounded-lg">
          {filteredProducts.length > 0 ? (
            <div className="flex flex-col justify-center gap-1">
              {filteredProducts.map((product) => {
                const { parentCategorySlug, subCategorySlug } =
                  getSlugsForProduct(product.id);
                return (
                  <Link
                    key={product.id}
                    href={`/category/${parentCategorySlug}/${subCategorySlug}/${product.slug}`}
                    className="cursor-pointer hover:text-blue-500"
                  >
                    <div className="flex items-center gap-2 w-full hover:border-2 rounded-lg transition duration-300 ease-in-out">
                      <Image
                        src={`${product.product_img}`}
                        alt={product.title}
                        width={100}
                        height={100}
                        className="w-12 h-12 object-cover rounded-md"
                      />
                      <div className="text-xs">{product.title}</div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <p>No products found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
