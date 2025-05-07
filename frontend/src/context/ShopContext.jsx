import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "₹";
  const deliveryFee = 50;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const navigate = useNavigate();

  /**
   * Adds a product to the shopping cart
   * @param {string} itemId - The unique identifier of the product
   * @param {string} size - The selected size of the product
   */
  const AddToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select a size");
      return;
    }
    // Create a deep copy of the current cart to avoid direct state mutation
    let cartData = structuredClone(cartItems);
    // Check if this product ID already exists in the cart
    if (cartData[itemId]) {
      // If this product exists, check if this specific size exists
      if (cartData[itemId][size]) {
        // If this size exists, increment the quantity
        cartData[itemId][size] += 1;
      } else {
        // If this size doesn't exist, add it with quantity 1
        cartData[itemId][size] = 1;
      }
    } else {
      // If this product doesn't exist in the cart at all, create a new entry
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);
  };

  // useEffect(() => {
  //   console.log(cartItems);
  // }, [cartItems]);

  const getCartCount = () => {
    let totalCount = 0;
    for (const item in cartItems) {
      for (const size in cartItems[item]) {
        try {
          if (cartItems[item][size] > 0) {
            totalCount += cartItems[item][size];
          }
        } catch (error) {
          console.log(error.message);
        }
      }
    }
    return totalCount;
  };

  const getCartAmount =  () => {
    let totalAmount = 0;
    for(const item in cartItems){
      let itemsInfo = products.find((product) => product._id === item);
      for(const size in cartItems[item]){
        try {
          if(cartItems[item][size] > 0){
            totalAmount += cartItems[item][size] * itemsInfo.price;
          }
        } catch (error) {
          console.log(error.message);
        }
      }
    }
    return totalAmount;
  }

  const updateQuantity = async (itemId, size, quantity) => {

    let cartData = structuredClone(cartItems);
    
    if (quantity === 0) {
      // Remove the size entry if quantity is 0
      delete cartData[itemId][size];
      
      // If no sizes left for this item, remove the entire item
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
    } else {
      cartData[itemId][size] = quantity;
    }
    
    setCartItems(cartData);
  };

  const value = {
    products,
    currency,
    deliveryFee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    AddToCart,
    cartItems,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
