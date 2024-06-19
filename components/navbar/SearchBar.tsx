"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { IoSearchOutline } from "react-icons/io5";
import { Product, useProductStore } from "@/hooks/useProduct";
import Image from "next/image";
import Link from "next/link";
import { useCategoryStore } from "@/hooks/useCategory";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const { categories, fetchCategories } = useCategoryStore();
  const { products, fetchProducts } = useProductStore();
  const searchBarRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }

    if (searchTerm) {
      const results = products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(results);
    } else {
      setFilteredProducts([]);
    }
  }, [searchTerm, products, fetchProducts]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    // Clear the search term when the pathname changes (i.e., navigation happens)
    setSearchTerm("");
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

  return (
    <div ref={searchBarRef} className="relative z-20">
      <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2 w-full shadow-sm focus-within:border-blue-400 focus-within:ring focus-within:ring-blue-300 focus-within:ring-opacity-50 transition duration-300 ease-in-out">
        <IoSearchOutline size={20} className="text-gray-400 mr-4" />
        <input
          type="text"
          placeholder="Search for your product here..."
          className="border-none outline-none flex-grow"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {searchTerm && (
        <div className="absolute bg-white p-4 w-2/3 shadow-2xl mt-2 rounded-lg">
          {filteredProducts.length > 0 ? (
            <div className="flex flex-wrap justify-start gap-4">
              {filteredProducts.map((product) => {
                // Find the category for the current product
                const productCategory = categories.find(
                  (cat) => cat.id === product.category_id.id
                );
                // Find the parent category for the current product category
                const parentCategory = categories.find(
                  (cat) => cat.id === productCategory?.parent_id
                );

                return (
                  <Link
                    key={product.id}
                    href={`/category/${parentCategory?.slug}/${productCategory?.slug}/${product.slug}`}
                    className="cursor-pointer hover:text-blue-500"
                  >
                    <div className="flex justify-center items-center gap-2 w-48 border-2 rounded-lg p-2">
                      <Image
                        src={`https://admin.parazone.tn/assets/${product.product_img}`}
                        alt={product.title}
                        width={100}
                        height={100}
                        className="w-20 h-20 object-cover rounded-md"
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
