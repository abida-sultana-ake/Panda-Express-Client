import React from "react";

const ServiceCard = ({ icon, title, description }) => {
  const IconComponent = icon;
  return (
    <div className="card w-full bg-base-100 shadow-md hover:shadow-xl transition-shadow duration-300">
      <div className="card-body items-center text-center">
        <IconComponent className="text-4xl text-green-500 mb-3" />
        <h2 className="card-title text-lg font-semibold">{title}</h2>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
