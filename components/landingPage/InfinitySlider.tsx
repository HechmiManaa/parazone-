"use client";
import React from "react";
import { Brand } from "@/hooks/useBrand";
import Image from "next/image";

interface SlideProps {
  slides: Brand[];
}

const InfinitySlider: React.FC<SlideProps> = ({ slides }) => {
  return (
    <div className="slider-wrapper">
      <div className="slider-container">
        <div className="slider-track">
          {slides.concat(slides).map((brand, index) => (
            <div className="slide" key={index}>
              {brand.slug_title && (
                <div className="p-2">
                  <div className="flex items-center justify-center h-20 w-40 mb-4">
                    <Image
                      src={brand.logo}
                      alt={brand.logo}
                      width={250}
                      height={250}
                      className="w-28"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfinitySlider;
