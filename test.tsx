"use client";
import { Product, useProductStore } from "@/hooks/useProductStore";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Prices, usePricesStore } from "@/hooks/usePrices";

export default function ProductPage({ params }: { params: { id: number } }) {
  const id = Number(params.id);
  const [product, setProduct] = useState<Product | null>(null);
  //const [price, setPrice] = useState<Prices[]>([]);

  const [showMore, setShowMore] = useState<boolean>(false);

  const { products, fetchProducts } = useProductStore();
  const { Prices, fetchPrices } = usePricesStore();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        await fetchProducts();
        setProduct(products.find((p) => p.id === id) || null);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProduct();
  }, [id, fetchProducts, products]);

  //console.log("fg");
  if (!product) {
    return <div>Loading...</div>;
  }
  //console.log("ff");
  const handleToggleShowMore = () => {
    setShowMore((prevShowMore) => !prevShowMore);
  };

  const MAX_DESCRIPTION_LENGTH = 887; // Adjust as needed

  return (
    <div>
      {/* Main Product */}
      <div className=" max-w-auto py-8 sm:px-6 lg:px-20 flex flex-col lg:flex-row lg:items-start lg:gap-x-8 mx-auto px-4 md:px-10 items-center justify-between">
        {/* Product Image */}
        <div className="lg:w-1/3">
          <div className="flex justify-center lg:block border-2 rounded-lg border-gray-200 p-1">
            <Image
              src={`https://admin.parazone.tn/assets/${product.url}`}
              alt={product.name}
              className="rounded-lg h-32 w-32"
              layout="responsive"
              objectFit="cover"
              width={400}
              height={400}
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="lg:w-2/3 mt-4 lg:mt-0">
          <h3 className="text-3xl font-semibold tracking-tight text-gray-900">
            {product.name}
          </h3>

          <div className="mt-2">
            <p className="text-2xl text-gray-700">Brand: {product.brand}</p>
          </div>
          <div className="py-2">
            <p className="text-2xl text-gray-700">
              Category: {product.category_id.name}
            </p>
          </div>

          <div className="mt-6">
            <h4 className="sr-only">Product Description</h4>
            <div className="text-gray-700 prose">
              {product.description.length > MAX_DESCRIPTION_LENGTH ? (
                <div>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: showMore
                        ? product.description
                        : `${product.description.substring(
                            0,
                            MAX_DESCRIPTION_LENGTH
                          )}...`,
                    }}
                  ></div>
                  <button
                    onClick={handleToggleShowMore}
                    className="mt-4 text-blue-500 font-semibold hover:underline"
                  >
                    {showMore ? "Show Less" : "Show More"}
                  </button>
                </div>
              ) : (
                <div
                  dangerouslySetInnerHTML={{ __html: product.description }}
                ></div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Products */}
      <div className="hidden lg:block lg:w-1/3 pr-8 pl-20 pb-11">
        <div className="bg-gray-100 rounded-lg shadow-md p-4">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Related Products
          </h2>
          {products
            .filter((p) => p.id !== id)
            .slice(0, 3)
            .map((secondaryProduct, index) => (
              <Link
                href={`/product/${secondaryProduct.id}`}
                key={index}
                className="block border-b border-gray-300 pb-3 mb-3 last:border-0 last:pb-0 hover:bg-gray-200 transition-colors rounded-lg p-2"
              >
                <div className="flex items-center">
                  <div className="w-24 h-24 flex-shrink-0">
                    <Image
                      src={`https://admin.parazone.tn/assets/${secondaryProduct.url}`}
                      alt={secondaryProduct.name}
                      className="rounded-lg"
                      height={100}
                      width={100}
                      layout="responsive"
                      objectFit="cover"
                    />
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {secondaryProduct.name}
                    </h3>
                    <p className="text-gray-700">
                      Brand: {secondaryProduct.brand}
                    </p>
                    <p className="text-gray-700">
                      Category: {secondaryProduct.category_id.name}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>

      {/* items */}
      <div></div>
    </div>
  );
}
