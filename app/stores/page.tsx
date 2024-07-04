"use client";
import { useStoreStore } from "@/hooks/useStore";
import Image from "next/image";
import { useEffect } from "react";

const StoresPage = () => {
  const { Stores, fetchStores } = useStoreStore();

  useEffect(() => {
    fetchStores();
  }, [fetchStores]);

  return (
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
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <a
              href={store.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline font-bold"
            >
              Voir les produits
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StoresPage;
