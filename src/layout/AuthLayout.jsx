import React from "react";
import { Outlet } from "react-router";
import authImg from "../../public/Delevary/authImage.png";
import PandaExpressLogo from "../pages/pandaExpressLogo/PandaExpressLogo";

const AuthLayout = () => {
  return (
    <div className="bg-base-200 p-12">
        <div>
            <PandaExpressLogo />
        </div>
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="flex-1">
            <img src={authImg} className="max-w-sm rounded-lg shadow-2xl" />
        </div>
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
