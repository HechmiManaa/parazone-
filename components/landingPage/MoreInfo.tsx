"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { useStoreStore } from "@/hooks/useStore";
import { useBrandStore } from "@/hooks/useBrand";
import InfinitySlider from "./InfinitySlider";
import Link from "next/link";

const MoreInfo = () => {
  const { Stores, fetchStores } = useStoreStore();
  const { Brands, fetchBrands } = useBrandStore();

  useEffect(() => {
    fetchStores();
    fetchBrands();
  }, [fetchStores, fetchBrands]);
  return (
    <>
      <section className="py-12 md:py-20 lg:py-28">
        <div className="container mx-auto px-4 md:px-2">
          <div className="text-center mb-12">
            <Link href="/magasins">
              <h2 className="text-xl font-extrabold tracking-tight text-gray-800 dark:text-gray-100 sm:text-4xl md:text-5xl lg:text-4xl leading-tight">
                Explorez nos magasins
              </h2>
            </Link>
            <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
              Découvrez les marques de confiance qui collaborent avec nous et
              explorez les meilleurs magasins disponibles.
            </p>
            <div className="mt-8 w-24 h-1 mx-auto bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full"></div>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {Stores.map((store) => (
              <div
                key={store.id}
                className="cursor-pointer bg-white hover:bg-gray-100 dark:bg-gray-950 rounded-lg shadow-md p-6 w-56 text-center flex flex-col items-center justify-between"
              >
                <div className="flex items-center justify-center mb-4">
                  <Image
                    src={store.logo}
                    alt={store.title}
                    width={100}
                    height={100}
                    className="object-cover rounded-full w-full"
                  />
                </div>

                <div className="text-sm text-gray-500 dark:text-gray-400">
                  <a
                    href={store.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline font-bold"
                  >
                    Visiter le magasin
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className=" dark:bg-gray-800 py-12 md:py-20 lg:py-28">
        <div className="container mx-auto px-2 md:px-6">
          <div className="mx-auto text-center">
            <Link href="/marques">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Explorez nos marques
              </h2>
            </Link>
            <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
              Découvrez les marques de confiance qui collaborent avec nous.
            </p>
            <div className="mt-8 flex justify-center items-center overflow-hidden slider">
              <InfinitySlider slides={Brands} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MoreInfo;
