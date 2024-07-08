import React, { useState } from "react";
import { Brand } from "@/hooks/useBrand";

type FilterProps = {
  brands: Array<Brand & { productCount: number }>;
  onFilterChange: (
    selectedBrands: number[],
    selectedPriceRanges: { min: number; max: number }[]
  ) => void;
};

const Filter: React.FC<FilterProps> = ({ brands, onFilterChange }) => {
  const [selectedBrands, setSelectedBrands] = useState<number[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<
    { min: number; max: number }[]
  >([]);

  const handleBrandChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const brandId = parseInt(event.target.value);
    const newSelectedBrands = event.target.checked
      ? [...selectedBrands, brandId]
      : selectedBrands.filter((id) => id !== brandId);
    setSelectedBrands(newSelectedBrands);
    onFilterChange(newSelectedBrands, selectedPriceRanges);
  };

  const handlePriceRangeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const priceRangeId = parseInt(event.target.value);
    const newSelectedPriceRanges = event.target.checked
      ? [priceRanges.find((range) => range.id === priceRangeId)!.range!]
      : [];
    setSelectedPriceRanges(newSelectedPriceRanges);
    onFilterChange(selectedBrands, newSelectedPriceRanges);
  };

  // Example price ranges, adjust as per your actual price data
  const priceRanges = [
    { id: 1, label: "Under $50", range: { min: 0, max: 50 } },
    { id: 2, label: "$50 - $100", range: { min: 50, max: 100 } },
    { id: 3, label: "$100 - $200", range: { min: 100, max: 200 } },
    { id: 4, label: "Over $200", range: { min: 200, max: Infinity } },
  ];

  return (
    <div className="bg-white p-8 rounded shadow-md mb-8">
      <h3 className="text-base font-semibold mb-4">Filter by</h3>
      <div className="mt-4">
        <h4 className="text-sm font-semibold mb-2">Price Range</h4>
        {priceRanges.map((range) => (
          <label
            key={range.id}
            className="flex items-center mb-2 cursor-pointer"
          >
            <input
              type="radio"
              name="price-range"
              value={range.id}
              checked={selectedPriceRanges.some(
                (r) => r.min === range.range.min && r.max === range.range.max
              )}
              onChange={handlePriceRangeChange}
              className="mr-2"
            />
            <span>{range.label}</span>
          </label>
        ))}
      </div>
      <div className="flex flex-col">
        <h4 className="text-sm font-semibold mb-2">Brand</h4>
        {brands.map((brand) => (
          <label
            key={brand.id}
            className="flex items-center mb-2 cursor-pointer"
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
  );
};

export default Filter;
