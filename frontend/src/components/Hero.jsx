import React from "react";
import { assets } from "../assets/assets";
import TrueFocus from "../lib/TrueFocus";

const Hero = () => {
  return (
    <div className="flex mt-3 flex-col sm:flex-row border-2 border-gray-500 ">
      {/* Hero Left Section */}
      <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
        <div className="text-[#414141]">
          <div className="flex items-center gap-4">
            <p className="w-8 md:w-11 bg-[#414141] h-[2px]"></p>
            <p className="font-medium text-sm md:text-base">COMFORT</p>
          </div>
          <TrueFocus
            sentence="In Every"
            manualMode={true}
            blurAmount={5}
            borderColor="rgb(0, 238, 255)"
            animationDuration={1}
            pauseBetweenAnimations={1}
          />
          <div className="flex items-center gap-4">
            <p className="font-semibold text-sm md:text-base">STITCH.</p>
            <p className="w-8 md:w-11 bg-[#414141] h-[1px]"></p>
          </div>
        </div>
      </div>
      {/* Hero Right Section */}
      <img src={assets.hero_banner_img} className="w-full h-[70vh] sm:w-1/2" alt="" loading="lazy" />
    </div>
  );
};

export default Hero;
