import React from "react";
import { deliverySteps } from "../../../data/deliverySteps";

const DeliveryProcess = () => {
  return (
    <section className="py-12 px-4 md:px-8 lg:px-16">
      <h2 className="text-3xl text-green-500 font-bold text-center mb-8">Our Delivery Process</h2>
      <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
        {deliverySteps.map((step) => (
          <div key={step.id} className="flex items-center gap-4">
            {/* Image */}
            <img src={step.image} alt={step.title} className="h-20 w-20 object-contain" />
            
            {/* Horizontal Dashed Line */}
            <div className="h-16 border-l-2 border-dashed border-gray-400"></div>
            
            {/* Text Part */}
            <div>
              <h3 className="text-xl font-semibold">{step.title}</h3>
              <p className="text-gray-500 text-sm max-w-xs">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DeliveryProcess;
