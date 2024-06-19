import React from "react";
import { CiDeliveryTruck, CiPill } from "react-icons/ci";
import { MdOutlineShield } from "react-icons/md";

const MoreInfo = () => {
  return (
    <>
      <section className="py-12 md:py-20 lg:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-950 rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="text-4xl mr-2">
                  <CiPill />
                </div>
                <h3 className="text-xl font-bold">Wide Product Selection</h3>
              </div>
              <p className="text-gray-500 dark:text-gray-400">
                Explore our extensive range of healthcare products, from
                vitamins and supplements to personal care items.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-950 rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="text-4xl mr-2">
                  <CiDeliveryTruck />
                </div>
                <h3 className="text-xl font-bold">Convenient Delivery</h3>
              </div>
              <p className="text-gray-500 dark:text-gray-400">
                Get your orders delivered right to your doorstep, ensuring a
                hassle-free shopping experience.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-950 rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="text-4xl mr-2">
                  <MdOutlineShield />
                </div>
                <h3 className="text-xl font-bold">Trusted Quality</h3>
              </div>
              <p className="text-gray-500 dark:text-gray-400">
                Rest assured that all our products meet the highest quality
                standards for your well-being.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-200 dark:bg-gray-800 py-12 md:py-20 lg:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Explore Our Services
            </h2>
            <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
              From consultations to personalized recommendations, we are here to
              support your healthcare needs.
            </p>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-950 rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <h3 className="text-xl font-bold">
                    Personalized Consultations
                  </h3>
                </div>
                <p className="text-gray-500 dark:text-gray-400">
                  Schedule a consultation with our healthcare experts to get
                  personalized recommendations.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-950 rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <h3 className="text-xl font-bold">Wellness Assessments</h3>
                </div>
                <p className="text-gray-500 dark:text-gray-400">
                  Discover your health and wellness needs with our comprehensive
                  assessments.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-950 rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <h3 className="text-xl font-bold">Appointment Scheduling</h3>
                </div>
                <p className="text-gray-500 dark:text-gray-400">
                  Book appointments with our healthcare professionals at your
                  convenience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MoreInfo;
