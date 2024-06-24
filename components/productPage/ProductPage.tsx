"use client";
import { Product, useProductStore } from "@/hooks/useProduct";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Price, usePricesStore } from "@/hooks/usePrice";
import { useCategoryStore } from "@/hooks/useCategory";
import { usePathname } from "next/navigation";
import { useRelationStore } from "@/hooks/useRelation";
import ProductRelatedProducts from "@/components/productPage/RelatedProducts";
import Items from "@/components/productPage/Items";

export default function ProductPage({ productSlug }: { productSlug: string }) {
  const [product, setProduct] = useState<Product | null>();
  const [filteredPrices, setFilteredPrices] = useState<Price[]>([]);

  const [showMore, setShowMore] = useState<boolean>(false);

  const { products, fetchProducts } = useProductStore();
  const { Prices, fetchPrices } = usePricesStore();
  const { categories, fetchCategories } = useCategoryStore();

  const { relations, fetchRelations } = useRelationStore();
  const pathname = usePathname();

  // pathname will be like "/category/visage/paux-grasses"
  const parts = pathname.split("/");
  const parentCategory_slug = parts[2];
  const subCategory_slug = parts[3];

  const subCategory = useMemo(
    () => categories.find((category) => category.slug === subCategory_slug),
    [subCategory_slug, categories]
  );

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  /*fetching the product by the Slug in the params*/
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
              p.slug.toLowerCase() ===
              decodeURIComponent(productSlug).toLowerCase()
          ) || null;
        setProduct(fetchedProduct);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProduct();
  }, [
    productSlug,
    fetchProducts,
    products,
    products.length,
    product,
    product?.id,
  ]);

  /*fetching all the prices*/
  useEffect(() => {
    fetchPrices();
  }, [fetchPrices]);

  useEffect(() => {
    fetchRelations();
  }, [fetchRelations]);

  /*fetching the prices by the product id*/

  useEffect(() => {
    const filtered = Prices.filter(
      (price) => String(price.product_id) === product?.id
    );
    setFilteredPrices(filtered);
  }, [Prices, productSlug, product?.id]);

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
      <div className="max-w-auto py-8 sm:px-6 lg:px-20 flex flex-col lg:flex-row lg:items-start lg:gap-x-8 mx-auto px-4 md:px-10 items-center justify-between">
        <div className="w-full lg:h-96 lg:w-96">
          <div className="flex justify-center lg:block border-2 rounded-lg border-gray-200 p-1">
            <Image
              src={`${product.product_img}`}
              alt={product.title}
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
            {product.title}
          </h3>

          <div className="mt-2">
            <div className="flex flex-col  ">
              <div className=" flex flex-col justify-center items-start text-sm text-gray-700">
                <div>
                  Marque:{" "}
                  <span className="blue font-semibold">
                    {product.brand_id?.title}
                  </span>
                </div>

                <div>
                  {product.brand_id?.logo && (
                    <div className="w-28 border-2 m-2">
                      <Image
                        src={`${product.brand_id?.logo}`}
                        alt={product.brand_id?.title}
                        className="rounded-lg h-32 w-32"
                        layout="responsive"
                        objectFit="cover"
                        width={400}
                        height={400}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="py-2">
                <div className="text-sm text-gray-700">
                  Référence:{" "}
                  <span className="blue font-semibold">{product?.id}</span>
                </div>
              </div>

              <div className="py-2">
                <div className="text-sm text-gray-700">
                  Category:{" "}
                  <span className="blue font-semibold">
                    {subCategory?.name}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <div className="text-gray-700 text-xs lg:text-base">
              {product.short_description.length > MAX_DESCRIPTION_LENGTH ? (
                <div>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: showMore
                        ? product.short_description
                        : `${product.short_description.substring(
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
                  dangerouslySetInnerHTML={{
                    __html: product.short_description,
                  }}
                ></div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* ---------------*/}

      {/* Related Products */}
      <div className="flex flex-col  lg:flex-row p-2">
        <ProductRelatedProducts
          categoryId={subCategory?.id}
          parentCategorySlug={parentCategory_slug}
          subCategorySlug={subCategory_slug}
          categoryName={subCategory?.name}
          productId={String(product.id)}
        />
        {/* ---------------*/}

        {/* Items */}
        <Items productId={product.id} productSlug={productSlug} />
      </div>
      {/* ---------------*/}

      {/* Long Description */}

      <div className="m-10">
        <h3 className="text-xl lg:text-2xl m-4 font-semibold tracking-tight text-gray-900">
          Description
        </h3>
        <div className="text-gray-700 text-xs lg:text-base">
          {product.long_description.length > MAX_DESCRIPTION_LENGTH ? (
            <div>
              <div
                className="text-xs lg:text-base"
                dangerouslySetInnerHTML={{
                  __html: showMore
                    ? product.long_description
                    : `${product.long_description.substring(
                        0,
                        MAX_DESCRIPTION_LENGTH
                      )}...`,
                }}
              ></div>
              <button
                onClick={handleToggleShowMore}
                className="mt-4 blue font-semibold hover:underline"
              >
                {showMore ? "Afficher moins" : "Afficher plus..."}
              </button>
            </div>
          ) : (
            <div
              dangerouslySetInnerHTML={{
                __html: product.long_description,
              }}
            ></div>
          )}
        </div>
      </div>
      {/* ---------------*/}
    </div>
  );
}
