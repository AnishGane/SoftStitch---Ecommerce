import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    if (products && products.length > 0) {
      // First try to get products marked as bestseller
      let bestProducts = products.filter((item) => item.bestseller === true);
      
      // If no bestseller products found, get the first 5 products
      if (bestProducts.length === 0) {
        bestProducts = products.slice(0, 5);
      }
      
      setBestSeller(bestProducts);
    }
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8">
        <Title text1={"BEST"} text2={"SELLERS"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Explore our most popular items that customers love. Our bestsellers
          represent the perfect blend of quality, style, and value that have
          consistently impressed our shoppers. These customer favorites are
          tried and true essentials for your wardrobe.
        </p>
      </div>

      {/* Rendering Best Seller Products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 lg:grid-cols-5 gap-y-6">
        {bestSeller.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            name={item.name}
            image={item.image}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
