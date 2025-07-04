import { useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { backendUrl, cartItems, setCartItems, products, token } =
    useContext(ShopContext);

  const handleEsewaSuccess = (refId) => {
    // Prepare order data from cart
    let orderItems = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          const itemInfo = structuredClone(
            products.find((product) => product._id === items)
          );
          if (itemInfo) {
            itemInfo.size = item;
            itemInfo.quantity = cartItems[items][item];
            orderItems.push(itemInfo);
          }
        }
      }
    }
    // Get address from localStorage (or you can store it in context during PlaceOrder)
    const address = JSON.parse(localStorage.getItem("order_address"));
    const amount = parseInt(localStorage.getItem("order_amount"), 10);
    // Call backend to verify eSewa payment and place order
    axios
      .post(
        backendUrl + "/api/order/esewa",
        {
          userId: token, // If you store userId in token or get from context
          items: orderItems,
          amount,
          address,
          refId,
        },
        { headers: { token } }
      )
      .then((response) => {
        if (response.data.success) {
          setCartItems({});
          toast.success("Payment successful and order placed!");
        } else {
          toast.error(response.data.message || "Failed to place order");
        }
      })
      .catch((err) => {
        toast.error("Payment verification failed.");
      });
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const refId = params.get("refId");
    if (refId) {
      handleEsewaSuccess(refId);
    }
    // Redirect to orders page after 2 seconds
    const timer = setTimeout(() => {
      navigate("/orders");
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigate, location]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Payment Successful!</h1>
        <p className="text-gray-600">Redirecting to your orders...</p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
