import React from "react";
import ServiceCard from "./ServiceCard";
import { services } from "../../../data/servicesData";

const OurServices = () => {
  return (
    <section className="py-12 px-4 md:px-8 lg:px-16">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-green-500 mb-4">Our Services</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>
      </div>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            icon={service.icon}
            title={service.title}
            description={service.description}
          />
        ))}
      </div>
    </section>
  );
};

export default OurServices;
