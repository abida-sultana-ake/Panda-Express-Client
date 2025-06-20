import React from "react";
import Marquee from "react-fast-marquee";
import { clientLogos } from "../../../data/clientLogos";

const ClientLogoMarquee = () => {
  return (
    <section className="py-12 px-4 md:px-8 lg:px-16 bg-base-200">
      <h2 className="text-3xl font-bold text-green-500 text-center mb-8">Trusted by Our Clients</h2>
      <Marquee
        pauseOnHover={true}
        speed={50}
        gradient={false}
      >
        {clientLogos.map((logo) => (
          <div key={logo.id} className="mx-8 flex justify-center items-center">
            <img
              src={logo.image}
              alt={logo.alt}
              className="h-6 w-auto object-contain grayscale hover:grayscale-0 transition duration-300"
            />
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default ClientLogoMarquee;