import React from "react";
import { HiArrowSmallRight } from "react-icons/hi2";
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
    <section className="px-6 md:px-20 pb-24 pt-10 background-i">
      <div className="flex max-xl:flex-col gap-16">
        <div className="flex flex-col justify-center flex-1">
          <p className="small-text">
            Your Trusted Parapharmacie Partner{" "}
            <HiArrowSmallRight className="mt-1" />
          </p>

          <h1 className="head-text">
            Discover Health & Wellness with Parazone
          </h1>

          <p className="mt-6">
            Discover a wide range of healthcare products and services at your
            fingertips.
          </p>
        </div>
        <div className="flex-1">
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
                <div key={image.alt}>
                  <Image
                    src={image.imgUrl}
                    alt={image.alt}
                    width={1000}
                    height={500}
                    className="object-cover"
                  />
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
