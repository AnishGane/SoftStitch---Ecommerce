import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import toast from "react-hot-toast";
import EsewaPayment from "../components/EsewaPayment";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    deliveryFee,
    products,
  } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });
  const [showEsewa, setShowEsewa] = useState(false);

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((data) => ({ ...data, [name]: value }));
  };

  const handlePaymentMethodChange = (selectedMethod) => {
    setMethod(selectedMethod);
  };

  const handleEsewaSuccess = async (refId) => {
    try {
      const orderId = localStorage.getItem("order_id");
      if (orderId) {
        // Fetch the order details if needed, or use stored data
        const address = formData;
        const amount = getCartAmount() + deliveryFee;
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
        await axios.post(
          backendUrl + "/api/order/esewa",
          {
            userId: token,
            items: orderItems,
            amount,
            address,
            refId,
          },
          { headers: { token } }
        );
        setCartItems({});
        toast.success("Payment successful and order placed!");
        navigate("/orders");
      } else {
        toast.error("Order ID not found. Cannot update payment status.");
      }
    } catch (err) {
      toast.error("Payment verification failed.");
    }
  };

  const handleEsewaError = (error) => {
    setShowEsewa(false);
    toast.error("eSewa payment failed. Please try again.");
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
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

      let orderData = {
        userId: token,
        address: formData,
        items: orderItems,
        amount: getCartAmount() + deliveryFee,
      };

      if (method === "esewa") {
        const response = await axios.post(
          backendUrl + "/api/order/place",
          {
            ...orderData,
            paymentMethod: "eSewa",
            payment: false,
            status: "Pending",
          },
          { headers: { token } }
        );
        if (response.data.success && response.data.orderId) {
          setShowEsewa(true);
          localStorage.setItem("order_id", response.data.orderId);
        } else {
          toast.error(response.data.message || "Failed to create order");
        }
        return;
      }

      // Handle COD payment
      if (method === "cod") {
        const response = await axios.post(
          backendUrl + "/api/order/place",
          orderData,
          { headers: { token } }
        );
        if (response.data.success) {
          setCartItems({}); //clearing cart data
          navigate("/orders");
        } else {
          toast.error(response.data.message || "Failed to place order");
        }
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
    >
      {/* ---------------- Left Side ----------------- */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            name="firstName"
            value={formData.firstName}
            type="text"
            placeholder="First Name"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            required
          />
          <input
            onChange={onChangeHandler}
            name="lastName"
            value={formData.lastName}
            type="text"
            placeholder="Last Name"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            required
          />
        </div>
        <input
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
          type="email"
          placeholder="Email address"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          required
        />
        <input
          onChange={onChangeHandler}
          name="street"
          value={formData.street}
          type="text"
          placeholder="Street"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          required
        />
        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
            type="text"
            placeholder="City"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            required
          />
          <input
            onChange={onChangeHandler}
            name="state"
            value={formData.state}
            type="text"
            placeholder="State"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            required
          />
        </div>
        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            name="zipcode"
            value={formData.zipcode}
            type="number"
            placeholder="Zipcode"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            required
          />
          <input
            onChange={onChangeHandler}
            name="country"
            value={formData.country}
            type="text"
            placeholder="Country"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            required
          />
        </div>
        <input
          onChange={onChangeHandler}
          name="phone"
          value={formData.phone}
          type="number"
          placeholder="Phone number"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          required
        />
      </div>

      {/* ---------------- Right Side ----------------- */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          {/* -------------- Payment Method Selection -------------- */}
          <div className="flex gap-3 flex-col lg:flex-row ">
            <div
              onClick={() => handlePaymentMethodChange("esewa")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 rounded-full border ${
                  method === "esewa" ? "bg-green-400" : ""
                }`}
              ></p>
              <p className="text-green-600 text-sm font-medium mx-4">eSewa</p>
            </div>
            <div
              onClick={() => handlePaymentMethodChange("cod")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 rounded-full border ${
                  method === "cod" ? "bg-green-400" : ""
                }`}
              ></p>
              <p className="text-gray-500 text-sm font-medium mx-4">
                CASH ON DELIVERY
              </p>
            </div>
          </div>

          <div className="mt-8 w-full text-end">
            <button
              type="submit"
              className="bg-black text-white py-3 px-16 text-sm cursor-pointer"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>

      {showEsewa && (
        <EsewaPayment
          amount={getCartAmount() + deliveryFee}
          taxAmount={0}
          serviceCharge={0}
          deliveryCharge={0}
          transactionUUID={`order_${Date.now()}`}
          productCode="EPAYTEST"
          backendUrl={backendUrl}
          successUrl={window.location.origin + "/payment/success"}
          failureUrl={window.location.origin + "/payment/cancel"}
          onSuccess={handleEsewaSuccess}
          onError={handleEsewaError}
        />
      )}
    </form>
  );
};

export default PlaceOrder;
