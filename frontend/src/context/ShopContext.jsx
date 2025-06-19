import { createContext, useEffect, useState } from "react";
// import { products } from "../assets/assets";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "₹";
  const deliveryFee = 50;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const AddToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Please select a size");
      return;
    }

    // Validate if the product exists
    const product = products.find((p) => p._id === itemId);
    if (!product) {
      toast.error("Product not found");
      return;
    }

    // Validate if the size is available for the product
    if (!product.sizes.includes(size)) {
      toast.error("Selected size is not available for this product");
      return;
    }

    try {
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

      // If user is logged in, update cart in backend first
      if (token) {
        const response = await axios.post(
          backendUrl + "/api/cart/add",
          { itemId, size },
          { headers: { token } }
        );

        if (!response.data.success) {
          throw new Error(
            response.data.message || "Failed to add item to cart"
          );
        }
      }

      // Only update local state after successful API call
      setCartItems(cartData);
      toast.success("Item added to cart successfully");
    } catch (error) {
      console.error("Add to cart error:", error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to add item to cart"
      );
    }
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

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      let itemsInfo = products.find((product) => product._id === item);
      for (const size in cartItems[item]) {
        try {
          if (cartItems[item][size] > 0) {
            totalAmount += cartItems[item][size] * itemsInfo.price;
          }
        } catch (error) {
          console.log(error.message);
        }
      }
    }
    return totalAmount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    try {
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

      // If user is logged in, update cart in backend first
      if (token) {
        const response = await axios.post(
          backendUrl + "/api/cart/update",
          { itemId, size, quantity },
          { headers: { token } }
        );
        if (!response.data.success) {
          throw new Error(
            response.data.message || "Failed to Update item to cart"
          );
        }
      }

      // Only update local state after successful API call
      setCartItems(cartData);
      toast.success(quantity === 0 ? "Item removed from cart" : "Item quantity updated successfully");
    } catch (error) {
      console.error("update to cart error:", error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to update cart"
      );
    }
  };

  const getProductData = async () => {
    try {
      // console.log('Fetching products from:', backendUrl + '/api/product/list');
      const response = await axios.get(backendUrl + "/api/product/list");
      // console.log('Response status:', response.status);
      // console.log('Response data:', response.data);

      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        console.error("API returned error:", response.data.message);
        toast.error(response.data.message || "Failed to fetch products");
      }
    } catch (error) {
      console.error("Error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      toast.error("Failed to load products. Please try again later.");
    }
  };

  const getUserCart = async (token) => {
    try {
      const response = await axios.post(backendUrl + "/api/cart/get", {}, { headers: { token } });
      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (err) {
      console.log(err.message);
      toast.error(err.message);
    }
  }

  useEffect(() => {
    getProductData();
    // Set username from localStorage if available
    const storedUsername = localStorage.getItem("username");
    if(storedUsername){
      setUsername(storedUsername);
    }
  }, []);

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      getUserCart(localStorage.getItem("token"));
    }
  }, [token]);

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
    setCartItems,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    token,
    setToken,
    username,
    setUsername
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
