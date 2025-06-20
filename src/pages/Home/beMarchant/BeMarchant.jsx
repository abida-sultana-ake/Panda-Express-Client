import React from "react";

const BeMarchant = () => {
  return (
    <div>
      <div data-aos="fade-right"
     data-aos-offset="300"
     data-aos-easing="ease-in-sine" className="hero bg-[url('/brands/be-a-merchant-bg.png')] bg-[#03373D] bg-no-repeat p-20 rounded-4xl">

        <div className="hero-content flex-col lg:flex-row-reverse">
          <img
            src="/public/Delevary/location-merchant.png"
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-5xl font-bold text-white">Merchant and Customer Satisfaction is Our First Priority</h1>
            <p className="py-6 text-gray-200">
              We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.
            </p>
            <button className="btn btn-wide rounded-2xl bg-[#CAEB66] mr-7">Become a Merchant</button>
            <button className="btn btn-outline rounded-2xl text-[#CAEB66] hover:text-black hover:bg-[#CAEB66]">Earn with Profast Courie</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeMarchant;
