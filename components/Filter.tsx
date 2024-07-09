"use client";
import React, { useState } from "react";
import { Brand } from "@/hooks/useBrand";
import { IoMdOptions } from "react-icons/io";

type FilterProps = {
  brands: Array<Brand & { productCount: number }>;
  onFilterChange: (
    selectedBrands: number[],
    selectedPrices: number[],
    priceRanges: Array<{
      id: number;
      label: string;
      range: { min: number; max: number };
    }>
  ) => void;
};

const Filter: React.FC<FilterProps> = ({ brands, onFilterChange }) => {
  const [selectedBrands, setSelectedBrands] = useState<number[]>([]);
  const [selectedPrices, setSelectedPrices] = useState<number | null>(null);

  const priceRanges = [
    { id: 1, label: "Under $50", range: { min: 0, max: 50 } },
    { id: 2, label: "$50 - $100", range: { min: 50, max: 100 } },
    { id: 3, label: "$100 - $200", range: { min: 100, max: 200 } },
    { id: 4, label: "Over $200", range: { min: 200, max: Infinity } },
  ];

  const handleBrandChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const brandId = parseInt(event.target.value);
    const newSelectedBrands = event.target.checked
      ? [...selectedBrands, brandId]
      : selectedBrands.filter((id) => id !== brandId);
    setSelectedBrands(newSelectedBrands);
    onFilterChange(
      newSelectedBrands,
      selectedPrices ? [selectedPrices] : [],
      priceRanges
    );
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const priceId = parseInt(event.target.value);
    setSelectedPrices(priceId);
    onFilterChange(selectedBrands, [priceId], priceRanges);
  };

  // open and close filter
  const [isFiltreOpen, setIsFiltreOpen] = useState(false);

  const handleMenuClick = () => {
    setIsFiltreOpen(!isFiltreOpen);
  };

  return (
    <div
      className={`ml-8 px-2 w-64 md:bg-white md:shadow-md rounded-xl ${
        isFiltreOpen ? "bg-white shadow-md" : ""
      } mb-8 absolute top-5 right-5 z-10 md:relative`}
    >
      {/* Button to toggle filter menu visibility */}
      <div className="block md:hidden rounded absolute top-5 right-5 z-10">
        <IoMdOptions onClick={handleMenuClick} size={25} />
      </div>

      {/* Filter menu content with animation */}
      <div
        className={`mt-4 ml-4  transition-all duration-500 ease-in-out transform  ${
          isFiltreOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden md:max-h-full md:opacity-100`}
      >
        <div className="mt-4 w-full mx-auto">
          <h4 className="text-sm font-semibold mb-2">Price Range</h4>
          {priceRanges.map((range) => (
            <label
              key={range.id}
              className="flex items-center mb-2 cursor-pointer"
            >
              <input
                type="radio"
                name="price-range"
                checked={selectedPrices === range.id}
                value={range.id}
                onChange={handlePriceChange}
                className="mr-2"
              />
              <span>{range.label}</span>
            </label>
          ))}
        </div>
        <div className="flex flex-col my-4">
          <h4 className="text-sm font-semibold mb-2">Brand</h4>
          <div className="overflow-auto h-96  border border-gray-300 rounded-lg w-full">
            {brands.map((brand) => (
              <label
                key={brand.id}
                className="flex items-center  cursor-pointer hover:bg-gray-100 p-2 rounded-md"
              >
                <input
                  type="checkbox"
                  value={brand.id}
                  checked={selectedBrands.includes(brand.id)}
                  onChange={handleBrandChange}
                  className="mr-2"
                />
                <span className="flex-grow">{brand.title}</span>
                <span className="text-sm text-gray-600">
                  ({brand.productCount})
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
