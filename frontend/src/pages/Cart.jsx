import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    let tempData = [];
    for (const item in cartItems) {
      for (const size in cartItems[item]) {
        tempData.push({
          _id: item,
          size: size,
          quantity: cartItems[item][size],
        });
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  return (
    <div className="border-t- pt-14">
      <div className="text-2xl mb-3">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>

      {cartData.length > 0 ? (
        <div>
          {cartData.map((item, index) => {
            const productData = products.find(
              (product) => product._id === item._id
            );
            return (
              <div
                key={index}
                className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
              >
                {/* ----- Image and Descriptions */}
                <div className="flex items-start gap-6">
                  <img
                    className="w-16 sm:w-20"
                    src={productData.image[0]}
                    alt=""
                  />
                  <div>
                    <p className="text-sm sm:text-lg font-medium">
                      {productData.name}
                    </p>
                    <div className="flex items-center gap-5 mt-2">
                      <p>
                        {currency} {productData.price}
                      </p>
                      <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
                        {item.size}
                      </p>
                    </div>
                  </div>
                </div>
                <input
                  type="number"
                  min={1}
                  defaultValue={item.quantity}
                  className="border max-w-10 sm:max-w-20 px-1 py-1 sm:px-2"
                  onChange={(e)=>e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value))}
                />
                <img
                  src={assets.bin_icon}
                  className="w-4 mr-4 sm:w-5 cursor-pointer"
                  alt=""
                  onClick={()=>updateQuantity(item._id, item.size, 0)}
                />
              </div>
            );
          })}
          {/* --------- Cart Total and Proceed cta --------- */}
          <div className="flex justify-end my-20 ">
            <div className="w-full sm:w-[450px]">
              <CartTotal/>
                <div className="w-full text-end">
                  <button onClick={()=>navigate('/place-order')} className="bg-black text-white text-sm my-8 px-8 py-3">PROCEED TO CHECKOUT</button>
                </div>
              </div>
          </div>
          {/* --------- Cart Total and Proceed cta ends --------- */}
          </div>
      ) : (
        <div className="text-center py-10 border-t border-b">
          <p className="text-xl sm:text-3xl text-black font-medium">No items in your cart</p>
          <p className="text-sm text-gray-400 mt-2">Add some products to your cart to see them here</p>
        </div>
      )}
    </div>
  );
};

export default Cart;
