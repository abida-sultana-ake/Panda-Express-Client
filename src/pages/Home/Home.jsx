import React from "react";
import Banner from "./Banner";
import OurServices from "./services/OurServices";
import ClientLogoSlider from "./client/ClientLogoSlider";
import DeliveryProcess from "./delevary/DeliveryProcess";
import BeMarchant from "./beMarchant/BeMarchant";

const Home = () => {
  return (
    <div>
      <Banner />
      <OurServices />
      <ClientLogoSlider />
      <DeliveryProcess />
      <BeMarchant />
    </div>
  );
};

export default Home;
