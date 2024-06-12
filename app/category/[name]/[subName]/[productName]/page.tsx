"use client";
import { Product, useProductStore } from "@/hooks/useProductStore";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Prices, usePricesStore } from "@/hooks/usePrices";
import { useCategoryStore } from "@/hooks/useCategoryStore";

export default function ProductPage({
  params,
}: {
  params: { productName: string };
}) {
  const productName = params.productName;

  const modifiedName = productName.toLowerCase().replace(/--/g, " ");

  const [product, setProduct] = useState<Product | null>();
  const [filteredPrices, setFilteredPrices] = useState<Prices[]>([]);

  const [showMore, setShowMore] = useState<boolean>(false);

  const { products, fetchProducts } = useProductStore();
  const { Prices, fetchPrices } = usePricesStore();
  const { categories, fetchCategories } = useCategoryStore();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  {
    /*fetching the product by the name in the params*/
  }
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (product === null && products.length === 0) {
          // Fetch products only if not already available
          await fetchProducts();
        }
        const fetchedProduct =
          products.find(
            (p) =>
              p.name.toLowerCase() ===
              decodeURIComponent(modifiedName).toLowerCase()
          ) || null;
        setProduct(fetchedProduct);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProduct();
  }, [productName, fetchProducts, products, products.length]);

  {
    /*fetching all the prices*/
  }
  useEffect(() => {
    fetchPrices();
  }, [fetchPrices]);

  {
    /*fetching the prices by the product id*/
  }
  useEffect(() => {
    const filtered = Prices.filter((price) => price.product_id === product?.id);
    setFilteredPrices(filtered);
  }, [Prices, productName]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleToggleShowMore = () => {
    setShowMore((prevShowMore) => !prevShowMore);
  };

  const MAX_DESCRIPTION_LENGTH = 887; // Adjust as needed

  return (
    <div>
      {/* Main Product */}
      <div className=" max-w-auto py-8 sm:px-6 lg:px-20 flex flex-col lg:flex-row lg:items-start lg:gap-x-8 mx-auto px-4 md:px-10 items-center justify-between">
        {/* Product Image */}
        <div className="w-full lg:h-96 lg:w-96">
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
          <h3 className="text-xl lg:text-2xl font-semibold tracking-tight text-gray-900">
            {product.name}
          </h3>

          <div className="mt-2">
            <p className="text-sm text-gray-700">Brand: {product.brand}</p>
          </div>
          <div className="py-2">
            <p className="text-sm text-gray-700">
              Category: {product.category_id.name}
            </p>
          </div>

          <div className="mt-6">
            <div className="text-gray-700 text-xs lg:text-base">
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
                    className="mt-4 blue font-semibold hover:underline"
                  >
                    {showMore ? "Show Less" : "Show More..."}
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

      <div className="flex flex-col  lg:flex-row p-2">
        {/* Secondary Products */}
        <div className="p-2  w-full lg:w-1/4 order-2 lg:order-1">
          <div className="bg-gray-100 rounded-lg shadow-md p-4">
            <h2 className="text-base lg:text-xl font-bold text-gray-900 mb-4">
              Related Products
            </h2>
            {products
              .filter((p) => p.name !== productName)
              .slice(0, 4)
              .map((relatedProduct, index) => {
                const relatedParentCategory = categories.find(
                  (cat) => cat.id === relatedProduct.category_id.parent_id
                );
                return (
                  <Link
                    href={`/category/${relatedParentCategory?.name
                      .toLowerCase()
                      .replace(/ /g, "-")}/${relatedProduct.category_id.name
                      .toLowerCase()
                      .replace(
                        / /g,
                        "-"
                      )}/${relatedProduct.name.toLowerCase()}`}
                    key={index}
                    className="block border-b border-gray-300 pb-3 mb-3 last:border-0 last:pb-0 hover:bg-gray-200 transition-colors rounded-lg p-2"
                  >
                    <div className="flex items-center">
                      <div className="w-20 h-20 flex-shrink-0">
                        <Image
                          src={`https://admin.parazone.tn/assets/${relatedProduct.url}`}
                          alt={relatedProduct.name}
                          className="rounded-lg"
                          height={100}
                          width={100}
                          layout="responsive"
                          objectFit="cover"
                        />
                      </div>
                      <div className="ml-4 flex-1">
                        <h3 className="text-xs font-semibold text-gray-900">
                          {relatedProduct.name}
                        </h3>
                        <p className="text-xs text-gray-700">
                          Brand: {relatedProduct.brand}
                        </p>
                        <p className="text-xs text-gray-700">
                          Category: {relatedProduct.category_id.name}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>

        {/* items */}
        <div className=" w-full m-2  mx-auto rounded-xl bg-gray-100 order-1 lg:order-2">
          <h1 className=" text-start mt-4 ml-4  text-base lg:text-xl font-bold ">
            Prices Comparison
          </h1>

          <div className="w-full p-4 ">
            {filteredPrices.length > 0 ? (
              <ul className="flex flex-col gap-4 w-full p-2">
                {filteredPrices
                  .sort((a, b) => a.price - b.price)
                  .map((price) => (
                    <li
                      key={price.id}
                      className="flex flex-col lg:flex-row justify-between items-center border border-gray-200 rounded-xl p-4 hover:bg-gray-200  transition cursor-pointer"
                    >
                      <div className="w-full lg:w-1/3">
                        <p className="mb-2 text-xs font-semibold lg:text-sm w-full">
                          Product Name: {price.title}
                        </p>
                      </div>
                      <div className="w-full flex items-center justify-around">
                        {price.store_id.logo_url_ && (
                          <Link
                            href={price.store_id.website}
                            passHref
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Image
                              src={`https://admin.parazone.tn/assets/${price.store_id.logo_url_}`}
                              alt="Store Logo"
                              width={100}
                              height={100}
                              className=" w-16 lg:w-24 rounded-full"
                            />
                          </Link>
                        )}
                        <p className="mt-4 font-bold text-xs lg:text-base mb-2">
                          {price.price} dt
                        </p>
                        <a
                          href={price.price_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white blue-background py-1 lg:py-2 px-1 lg:px-4 rounded inline-block text-sm lg:text-base"
                        >
                          Acheter
                        </a>
                      </div>
                    </li>
                  ))}
              </ul>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
