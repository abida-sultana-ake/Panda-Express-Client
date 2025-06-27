import React from "react";
import logo from "../../assets/brands/logo.png";
import { Link } from "react-router";

const PandaExpressLogo = () => {
  return (
    <Link to="/">
      <div className="flex items-end">
        <img src={logo} alt="logo" className="mb-2" />
        <p className="text-3xl -ml-4 font-extrabold">Panda Express</p>
      </div>
    </Link>
  );
};

export default PandaExpressLogo;