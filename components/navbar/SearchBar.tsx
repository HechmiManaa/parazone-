"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IoSearchOutline } from "react-icons/io5";
import { Product, useProductStore } from "@/hooks/useProductStore";
import Image from "next/image";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const router = useRouter();

  // Access products and fetchProducts from the store
  const { products, fetchProducts } = useProductStore();

  useEffect(() => {
    // Fetch products if they are not already loaded
    if (products.length === 0) {
      fetchProducts();
    }

    // Filter products based on search term
    if (searchTerm) {
      const results = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(results);
    } else {
      setFilteredProducts([]);
    }
  }, [searchTerm, products, fetchProducts]);

  const handleProductClick = (id: number) => {
    router.push(`/product/${id}`);
  };

  return (
    <div>
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
        <div className=" absolute bg-white p-10 w-2/3 shadow-2xl">
          {filteredProducts.length > 0 ? (
            <div className="flex flex-wrap justify-start gap-4">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    handleProductClick(product.id), setSearchTerm("");
                  }}
                  className="cursor-pointer hover:text-blue-500"
                >
                  <div className="flex justify-center items-center gap-2 w-48 border-2 ">
                    <Image
                      src={`https://admin.parazone.tn/assets/${product.url}`}
                      alt={product.name}
                      width={100}
                      height={100}
                      className="w-20"
                    />
                    <div className="text-xs">{product.name}</div>
                  </div>
                </div>
              ))}
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
