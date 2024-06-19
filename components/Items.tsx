import { Price, usePricesStore } from "@/hooks/usePrice";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface itemProps {
  productId: string;
  productSlug: string;
}

const Items: React.FC<itemProps> = ({ productId, productSlug }) => {
  const { Prices, fetchPrices } = usePricesStore();
  const [filteredPrices, setFilteredPrices] = useState<Price[]>([]);

  useEffect(() => {
    fetchPrices();
  }, [fetchPrices]);

  useEffect(() => {
    const filtered = Prices.filter(
      (price) => String(price.product_id) === productId
    );
    setFilteredPrices(filtered);
  }, [Prices, productSlug]);

  const LoadNum = 4;

  return (
    <div className=" w-full m-2  mx-auto rounded-xl bg-gray-100 order-1 lg:order-2">
      <h1 className=" text-start mt-4 ml-4  text-base lg:text-xl font-bold ">
        Prices Comparison
      </h1>

      <div className="w-full p-4 ">
        {filteredPrices.length > 0 ? (
          <ul className="flex flex-col gap-4 w-full p-2">
            {filteredPrices
              .sort((a, b) => a.value - b.value)
              .map((price) => (
                <li
                  key={price.id}
                  className="flex flex-col lg:flex-row justify-between items-center border border-gray-200 rounded-xl p-4 hover:bg-gray-200  transition cursor-pointer"
                >
                  <div className="w-full lg:w-1/3">
                    <p className="mb-2 text-xs font-semibold lg:text-sm w-full">
                      {price.title}
                    </p>
                  </div>
                  <div className="w-full flex items-center justify-around">
                    {price.store_id?.logo && (
                      <Link
                        href={price.store_id?.url}
                        passHref
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Image
                          src={`${price.store_id.logo}`}
                          alt="Store Logo"
                          width={100}
                          height={100}
                          className=" w-16 lg:w-24 rounded-full"
                        />
                      </Link>
                    )}
                    <p className="mt-4 font-bold text-xs lg:text-base mb-2">
                      {price.value} dt
                    </p>
                    <a
                      href={price.product_url}
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
          <div className="flex flex-col gap-6 justify-center items-center w-full">
            {[...Array(LoadNum)].map((_, index) => (
              <div className="flex flex-row gap-2 w-full" key={index}>
                <div className="animate-pulse bg-gray-300 w-full h-12 rounded-xl"></div>
                <div className="flex flex-col gap-2">
                  <div className="animate-pulse bg-gray-300 w-28 h-5 rounded-full"></div>
                  <div className="animate-pulse bg-gray-300 w-36 h-5 rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Items;
