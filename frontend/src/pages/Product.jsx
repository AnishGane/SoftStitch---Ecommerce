import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProduct from "../components/RelatedProduct";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, AddToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState(""); // [setSize]

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        // console.log(item);
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div className="border-t-2  pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* --------- Product data ---------*/}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/*--------- Product Image ---------*/}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          {/*--------- left side images ---------*/}
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => {
              return (
                <img
                  src={item}
                  alt=""
                  key={index}
                  className="w-[24%] sm:mb-3 sm:w-full flex-shrink-0 cursor-pointer"
                  onClick={() => setImage(item)}
                />
              );
            })}
          </div>
          {/*--------- Right Side Image : Big One ---------*/}
          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto" src={image} alt="" />
          </div>
        </div>

        {/*--------- Product Details ---------*/}
        <div className="flex-1 ">
          <h1 className="text-2xl mt-2 font-medium">{productData.name}</h1>

          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} className="w-3 5" alt="" />
            <img src={assets.star_icon} className="w-3 5" alt="" />
            <img src={assets.star_icon} className="w-3 5" alt="" />
            <img src={assets.star_icon} className="w-3 5" alt="" />
            <img src={assets.star_dull_icon} className="w-3 5" alt="" />
            <p className="pl-2">(122)</p>
          </div>

          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5 ">
            {productData.description}
          </p>

          <div className="flex flex-col my-8 gap-4">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  className={`border py-2 px-4 bg-gray-100 cursor-pointer ${
                    item === size ? "bg-red-500 text-white" : ""
                  }`}
                  onClick={() => setSize(item)}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => AddToCart(productData._id, size)}
            className="uppercase bg-black text-white py-3 px-8 text-sm active:bg-gray-700 cursor-pointer"
          >
            Add to Cart
          </button>

          <hr className="mt-12 sm:w-4/5" />

          <div className="flex flex-col gap-1 text-sm mt-16 text-gray-500">
            <p>100% Original Product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* -------------- Description and Review Section ------------*/}
      <div className="mt-6 sm:mt-3">
        <div className="flex gap-4">
          <b className="border text-sm px-5 py-3">Description</b>
          <p className="border text-sm px-5 py-3">Reviews (122)</p>
        </div>
        <div className="border flex flex-col gap-4 text-sm text-gray-500 p-6 mt-1">
          <p>
            This product is designed with premium materials to ensure durability
            and comfort. Our innovative manufacturing process guarantees high
            quality standards for every item we produce.
          </p>
          <p>
            We take pride in our craftsmanship and attention to detail, making
            this product a perfect addition to your collection. Satisfaction
            guaranteed or your money back.
          </p>
        </div>
      </div>

      {/* -------- Display related products -------- */}
      <RelatedProduct
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
