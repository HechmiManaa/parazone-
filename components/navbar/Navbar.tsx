"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Categories from "./Categories";
import { LuMenu } from "react-icons/lu";
import { MdOutlineClose } from "react-icons/md";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className=" shadow-sm">
      <div className="mx-auto px-4 md:px-10 pt-2 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-2 text-lg font-semibold">
            <Image
              alt="logo"
              src="/logo.png"
              className="w-24 lg:w-28"
              width={500}
              height={500}
            />
          </div>
        </Link>

        <ul className="hidden lg:flex justify-center items-center gap-2 text-sm">
          <li className="transition p-2 hover:bg-neutral-200 cursor-pointer rounded-lg">
            Catégories
          </li>
          <li className="transition p-2 hover:bg-neutral-200 cursor-pointer rounded-lg">
            <Link href="/stores">Stores</Link>
          </li>
          <li className="transition p-2 hover:bg-neutral-200 cursor-pointer rounded-lg">
            <Link href="/brands">Brands</Link>
          </li>
        </ul>

        {/*  phone UL */}

        {!isMenuOpen ? (
          <LuMenu
            className="lg:hidden text-neutral-700 cursor-pointer"
            onClick={() => handleMenuClick()}
            size={25}
          />
        ) : (
          <MdOutlineClose
            className="lg:hidden text-neutral-700 cursor-pointer"
            onClick={() => handleMenuClick()}
            size={25}
          />
        )}

        {isMenuOpen && (
          <ul className="absolute z-50 top-10 left-0 bg-white shadow-xl border-b-8 border-neutral-600  p-2 rounded-b-xl w-[100%] lg:flex justify-center items-center gap-2 text-sm">
            <li className="transition p-2 hover:bg-neutral-200 cursor-pointer rounded-lg">
              Catégories
            </li>

            <li className="transition p-2 hover:bg-neutral-200 cursor-pointer rounded-lg">
              <Link href="/stores">Stores</Link>
            </li>

            <li className="transition p-2 hover:bg-neutral-200 cursor-pointer rounded-lg">
              <Link href="/brands">Brands</Link>
            </li>
          </ul>
        )}

        {/*
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
        */}
      </div>
      {/*
      {isSearchOpen && (
        <div className="lg:hidden m-2">
          <SearchBar />
        </div>
      )}*/}

      <div className="w-full  pt-2">
        <Categories />
      </div>
    </div>
  );
};

export default Navbar;
