import React from "react";
import Banner from "./Banner";
import OurServices from "./services/OurServices";
import ClientLogoSlider from "./client/ClientLogoSlider";

const Home = () => {
  return (
    <div>
      <Banner />
      <OurServices />
      <ClientLogoSlider />
    </div>
  );
};

export default Home;
