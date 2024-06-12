"use client";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";

const heroImages = [
  { imgUrl: "/products/ecran.jpg", alt: "ecran" },
  { imgUrl: "/products/bodypowder.jpg", alt: "bodypowder" },
  { imgUrl: "/products/handsoap.jpg", alt: "handsoap" },
];

const Hero = () => {
  return (
    <div className="hero-carousel">
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        interval={2000}
        showArrows={false}
        showStatus={false}
      >
        {heroImages.map((image) => (
          <Image
            src={image.imgUrl}
            alt={image.alt}
            width={1000}
            height={500}
            className="object-cover "
            key={image.alt}
          />
        ))}
      </Carousel>
    </div>
  );
};

export default Hero;
