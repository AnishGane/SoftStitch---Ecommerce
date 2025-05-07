import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 mb-10 mt-20 text-sm">
        <div>
          <img src={assets.logo} className="w-32 mb-5" alt="" />
          <p className="text-gray-600 leading-relaxed w-full md:w-2/3">
            Welcome to SoftStitch, your destination for quality fashion and
            comfort clothes. We're committed to providing exceptional products
            with outstanding customer service. Shop with confidence knowing that
            we stand behind everything we sell.
          </p>
        </div>

        <div>
          <p className="text-xl mb-5 font-medium">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        <div>
          <p className="text-xl mb-5 font-medium">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+06-123-456-78</li>
            <li>softstitchofficial@gmail.com</li>
          </ul>
        </div>
      </div>

      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright 2025@ softstitch.com - All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
