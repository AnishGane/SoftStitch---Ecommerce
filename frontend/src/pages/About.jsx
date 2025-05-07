import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>

      <div className='text-2xl text-center border-t pt-8'>
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img src={assets.about_img} className='w-full sm:max-w-[450px]' alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p className='text-justify'>Welcome to our premium clothing store, where style meets quality. Founded in 2024, we've been dedicated to providing our customers with the finest selection of contemporary fashion. Our carefully curated collection features pieces from both established designers and emerging talents, ensuring you always find something unique and on-trend.</p>
          <p className='text-justify'>At our core, we believe that fashion should be accessible, sustainable, and expressive. That's why we work directly with ethical manufacturers and source high-quality materials that stand the test of time. Our passionate team of fashion enthusiasts is always ready to help you discover pieces that not only look great but make you feel confident and comfortable. We're more than just a clothing store - we're a community that celebrates individual style and self-expression.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p className='text-justify'>To revolutionize the fashion industry by offering timeless, high-quality garments that empower individuals to express their unique identity. We strive to balance style with sustainability, ensuring our products leave a positive impact on both our customers and the planet. Through exceptional customer service and innovative design, we aim to create a shopping experience that inspires confidence and creativity in everyone who walks through our doors.</p>
        </div>
      </div>

      <div className='text-xl py-4'>
        <Title text1={'WHY TO'} text2={'CHOOSE US'} />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20 text-justify">
        <div className="border border-gray-400 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 ">
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>We pride ourselves on offering only the highest quality garments. Each piece undergoes rigorous quality checks to ensure exceptional craftsmanship and durability. From stitching to fabric selection, we maintain strict standards that exceed industry expectations, guaranteeing that every purchase represents true value and lasting style.</p>
        </div>
        <div className="border border-gray-400 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className='text-gray-600'>Our user-friendly website and mobile app make shopping effortless from anywhere, anytime. We offer flexible delivery options, easy returns, and responsive customer service for a smooth experience. Our intuitive interface helps you quickly find what you need, while personalized recommendations help discover styles that match your taste. We've streamlined the shopping process to respect your valuable time.</p>
        </div>
        <div className="border border-gray-400 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Expectional Customer Service:</b>
          <p className='text-gray-600'>Our dedicated customer service team is available 7 days a week to assist with any questions or concerns. We believe in building lasting relationships through personalized attention and prompt issue resolution. Whether you need styling advice or help with orders, our representatives are committed to providing an exceptional shopping experience that keeps you coming back.</p>
        </div>
      </div>

    </div>
  )
}

export default About