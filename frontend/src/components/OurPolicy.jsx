import React from "react";
import { assets } from "../assets/assets";

const OurPolicy = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center pb-10 sm:py-20 text-sm sm:text-md md:text-base text-gray-700">
      <div className="border-2 border-black px-4 py-10 sm:p-6 hover:-translate-y-1.5 transition easeO-in-out cursor-pointer">
        <img src={assets.exchange_icon} className="w-12 mb-5 m-auto" alt="" />
        <p className="font-semibold ">Easy Exchange Policy</p>
        <p className="text-gray-400">We offer hassle free exchange policy</p>
      </div>
      <div className="border-2 border-black px-4 py-10 sm:p-6 hover:-translate-y-1.5 transition ease-in-out cursor-pointer">
        <img src={assets.quality_icon} className="w-12 mb-5 m-auto" alt="" />
        <p className="font-semibold ">7 Days Return Policy</p>
        <p className="text-gray-400">We provide 7 days free return policy</p>
      </div>
      <div className="border-2 border-black px-4 py-10 sm:p-6 hover:-translate-y-1.5 transition ease-in-out cursor-pointer">
        <img src={assets.support_img} className="w-12 mb-5 m-auto" alt="" />
        <p className="font-semibold ">Best Customer Support</p>
        <p className="text-gray-400">We provide 24/7 customer support</p>
      </div>
    </div>
  );
};

export default OurPolicy;
