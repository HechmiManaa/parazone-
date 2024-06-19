"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Categories from "./Categories";
import SearchBar from "./SearchBar";

import { FaSearch } from "react-icons/fa";

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleIconClick = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <div className=" shadow-sm">
      <div className="mx-auto px-4 md:px-10 py-2 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-2 text-lg font-semibold">
            <Image
              alt="logo"
              src="/logo.png"
              className="w-32 lg:w-36"
              width={500}
              height={1000}
            />
          </div>
        </Link>

        <div className="hidden lg:block w-[70%] ">
          <SearchBar />
        </div>

        <div className="flex items-center gap-5 ">
          <FaSearch
            className="lg:hidden text-neutral-700 cursor-pointer"
            onClick={() => handleIconClick()}
            size={20}
          />
        </div>
      </div>

      {isSearchOpen && (
        <div className="lg:hidden m-2">
          <SearchBar />
        </div>
      )}

      <div className="w-full blue-background">
        <Categories />
      </div>
    </div>
  );
};

export default Navbar;
