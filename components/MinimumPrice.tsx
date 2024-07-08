// minimumPrice.tsx
"use client";
import { usePricesStore } from "@/hooks/usePrice";
import React, { useEffect } from "react";

type Props = {
  product_id: string;
  onMinimumPrice: (minimumPrice: number) => void;
};

const MinimumPrice: React.FC<Props> = ({ product_id, onMinimumPrice }) => {
  const { Prices, fetchPrices } = usePricesStore();

  useEffect(() => {
    fetchPrices();
  }, [fetchPrices]);

  const filteredPrices = Prices.filter(
    (price) => String(price.product_id) === product_id
  ).sort((a, b) => a.value - b.value);

  const minimumPrice = filteredPrices[0]?.value; // Get the minimum price

  useEffect(() => {
    onMinimumPrice(minimumPrice || 0);
  }, [minimumPrice, onMinimumPrice]);

  return <div>{minimumPrice}</div>;
};

export default MinimumPrice;
