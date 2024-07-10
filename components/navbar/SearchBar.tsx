import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

  useEffect(() => {
    if (products.length === 0) fetchProducts();
    if (relations.length === 0) fetchRelations();
    if (categories.length === 0) fetchCategories();
  }, [
    products.length,
    relations.length,
    categories.length,
    fetchProducts,
    fetchRelations,
    fetchCategories,
  ]);

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

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter" && searchTerm.trim() !== "") {
        router.push(`/produit?search=${encodeURIComponent(searchTerm)}`);
        setSearchTerm("");
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [searchTerm, router]);

  useEffect(() => {
    if (searchTerm.length > 2) {
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
      setFilteredProducts(results);
    } else {
      setFilteredProducts([]);
    }
  }, [searchTerm, products]);

  const filteredProductsById = filteredProducts.filter((product) =>
    relations.some((relation) => relation.product_id === product.id)
  );

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
      {searchTerm.length > 2 && (
        <div className="absolute bg-white max-h-64 overflow-y-auto p-4 w-full shadow-2xl mt-2 rounded-lg">
          {filteredProducts.length > 0 ? (
            <div className="flex flex-col justify-center gap-1">
              {filteredProductsById.map((product) => (
                <Link
                  key={product.id}
                  href={`/produit/${product.slug}`}
                  passHref
                  onClick={() => setSearchTerm("")}
                >
                  <div className="cursor-pointer hover:text-blue-500">
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
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex flex-col justify-center gap-1">
              <div className="text-center text-gray-500">
                Aucun produit ne correspond à votre recherche
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
