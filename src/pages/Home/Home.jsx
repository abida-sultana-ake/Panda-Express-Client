import React from "react";
import Banner from "./Banner";
import OurServices from "./services/OurServices";
import ClientLogoSlider from "./client/ClientLogoSlider";
import DeliveryProcess from "./delevary/DeliveryProcess";

const Home = () => {
  return (
    <div>
      <Banner />
      <OurServices />
      <ClientLogoSlider />
      <DeliveryProcess />
    </div>
  );
};

export default Home;
