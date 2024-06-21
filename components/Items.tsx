import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePricesStore, Price } from "@/hooks/usePrice";

interface ItemProps {
  productId: string;
  productSlug: string;
}

const Items: React.FC<ItemProps> = ({ productId, productSlug }) => {
  const { Prices, fetchPrices } = usePricesStore();
  const [filteredPrices, setFilteredPrices] = useState<Price[]>([]);

  useEffect(() => {
    fetchPrices();
  }, [fetchPrices]);

  useEffect(() => {
    const getLatestPrices = () => {
      // Create a map to store the latest prices per store
      const latestPricesMap = new Map();

      const filtered = Prices.filter(
        (price) => String(price.product_id) === productId
      );

      filtered.forEach((price) => {
        const storeId = price.store_id?.id;
        latestPricesMap.set(storeId, price);
      });

      // Convert the map values to an array
      const latestPrices = Array.from(latestPricesMap.values());

      setFilteredPrices(latestPrices);
    };

    getLatestPrices();
  }, [Prices, productSlug, productId]);

  const LoadNum = 4;

  return (
    <div className="w-full m-2 mx-auto rounded-xl bg-gray-100 order-1 lg:order-2">
      <h1 className="text-start mt-4 ml-4 text-base lg:text-xl font-bold">
        Comparaison des Prix
      </h1>

      <div className="w-full p-4">
        {filteredPrices.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Offre Title</th>
                  <th>Magasin</th>
                  <th>Price</th>
                  <th>livraison info</th>
                  <th>Disponibilité</th>
                  <th>Offre</th>
                </tr>
              </thead>
              <tbody>
                {filteredPrices.map((price) => (
                  <tr className="bg-white" key={price.id}>
                    <td>
                      <p className=" text-[9px] w-20 font-semibold lg:text-sm lg:w-full">
                        {price.title}
                      </p>
                    </td>
                    <td>
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
                            className="w-16 lg:w-24 rounded-full"
                          />
                        </Link>
                      )}
                    </td>
                    <td>
                      <div className=" flex gap-1 mt-4 font-bold text-xs lg:text-base mb-2 blue">
                        <div>{price.value} </div>
                        <div>dt</div>
                      </div>
                    </td>
                    <td>
                      <div className="flex flex-col justify-center items-center">
                        <p className="text-xs">{price.delivery_time}</p>
                        <p className="text-xs">{price.delivery_price} dt</p>
                      </div>
                    </td>
                    <td>
                      <p
                        className={`${
                          price.availability === "Disponible"
                            ? "text-green-500"
                            : "text-red-500"
                        } font-semibold text-xs`}
                      >
                        {price.availability}
                      </p>
                    </td>
                    <td>
                      <p className="text-xs w-20 text-center">{price.offer}</p>
                    </td>
                    <td>
                      <a
                        href={price.product_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white blue-background py-1 lg:py-2 px-1 lg:px-4 rounded inline-block text-sm lg:text-base"
                      >
                        Acheter
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
