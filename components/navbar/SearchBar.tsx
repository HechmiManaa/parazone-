"use client";
import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { IoSearchOutline } from "react-icons/io5";
import { Product, useProductStore } from "@/hooks/useProduct";
import Image from "next/image";
import Link from "next/link";
import { Category, useCategoryStore } from "@/hooks/useCategory";
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

  // Helper function to find a category by ID
  const getCategoryById = (categoryId: number) => {
    return categories.find((category) => category.id === categoryId);
  };

  // Function to get subcategory slug by product ID
  const getParentCategorySlug = (productId: string) => {
    const relation = relations.find(
      (relation) => String(relation.product_id) === productId
    );
    if (relation) {
      const parentCategory = getCategoryById(Number(relation.category_id));
      return parentCategory ? parentCategory.slug : null;
    }
    return null;
  };

  // Function to get parent category slug by product ID
  const getSubCategorySlug = (productId: string) => {
    // Find all relations for the given product ID
    const productRelations = relations.filter(
      (relation) => String(relation.product_id) === productId
    );

    // Iterate over relations to find parent and subcategory
    let parentCategory = null;
    let subCategory = null;

    productRelations.forEach((relation) => {
      const category = getCategoryById(Number(relation.category_id));
      if (category) {
        if (category.parent_id === null) {
          parentCategory = category; // Category with no parent is considered a parent category
        } else {
          subCategory = category; // Category with a parent_id is considered a subcategory
        }
      }
    });

    return subCategory ? (subCategory as Category).slug : null;
  };

  const filteredProductsById = filteredProducts
    .filter((product) =>
      relations.some((relation) => relation.product_id === product.id)
    )
    .map((product) => ({
      ...product,
      parentCategorySlug: getParentCategorySlug(product.id),
      subCategorySlug: getSubCategorySlug(product.id),
    }));

  return (
    <div ref={searchBarRef} className="relative z-20">
      <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2 w-full shadow-sm focus-within:border-blue-400 focus-within:ring focus-within:ring-blue-300 focus-within:ring-opacity-50 transition duration-300 ease-in-out">
        <IoSearchOutline size={20} className="text-gray-400 mr-4" />
        <input
          type="text"
          placeholder="Recherchez votre produit ici..."
          className="border-none outline-none flex-grow text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {searchTerm && (
        <div className="absolute bg-white h-64 overflow-y-auto p-4 w-full shadow-2xl mt-2 rounded-lg">
          {filteredProducts.length > 0 ? (
            <div className="flex flex-col justify-center gap-1">
              {filteredProductsById.map((product) => {
                return (
                  <Link
                    key={product.id}
                    href={`/category/${product.parentCategorySlug}/${product.subCategorySlug}/${product.slug}`}
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
