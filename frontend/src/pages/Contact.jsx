import React from "react";
import { assets } from "../assets/assets";
import Title from "../components/Title";

const Contact = () => {
  return <div>

    <div className="text-2xl text-center border-t pt-10">
      <Title text1={"CONTACT"} text2={"US"} />
    </div>

    <div className="my-10 flex flex-col md:flex-row gap-10 justify-center mb-28">
      <img src={assets.contact_img} className="w-full sm:max-w-[480px]" alt="" />
      <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600 items-start">
        <p className="font-semibold text-xl text-gray-600">Our Store</p>
        <p className="text-gray-500">Dhudpati - 1, Bhaktapur <br /> Near Siddhapokhari <br /> Kathmandu Valley, Nepal</p>
        <p className="text-gray-500">Opening Hours: <br /> Sunday - Friday: 10:00 AM - 8:00 PM <br /> Saturday: 12:00 AM - 5:00 PM</p>
        <p className="text-gray-500 mt-2">Email: softstitchofficial@gmail.com
        <br /> Phone: +977-123456789</p>
        <p className="font-semibold text-xl text-gray-600">Careers at SoftStitch</p>
        <p className="text-gray-500">We're always looking for talented individuals to join our team. If you're passionate about fashion and customer service, send your resume to careers@softstitch.com</p>
        <button className="border-2 border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all cursor-pointer duration-500">Apply Now</button>
      </div>
    </div>

  </div>;
};

export default Contact;
