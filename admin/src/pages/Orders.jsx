import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { backendUrl, currency } from "../App";
import assets from "../assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) return null;
    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const updateOrderStatus = async ( orderId, status) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        { orderId, status },
        { headers: { token } }
      );
      if (response.data.success) {
        // toast.success("Order status updated successfully");
        await fetchAllOrders(); // Refresh orders list
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="p-4">
      <h3 className="text-2xl font-semibold mb-6">Orders</h3>
      <div className="space-y-4">
        {orders.map((order, idx) => (
          <div 
            key={order._id || idx} 
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700"
          >
            <img src={assets.parcel_icon} alt="parcel" className="w-12 h-12" />
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                {order.items.map((item, idx) => (
                  <p key={idx} className="text-gray-600 py-0.5">
                    {item.name} x {item.quantity} ({item.size})
                    {idx !== order.items.length - 1 && ","}
                  </p>
                ))}
              </div>
              <div className="space-y-1">
                <p className="font-medium mt-3 mb-2">{order.address.firstName} {order.address.lastName}</p>
                <p>{order.address.street},</p>
                <p>
                  {order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}
                </p>
                <p>{order.address.phone}</p>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm sm:text-[15px]">Items: {order.items.length}</p>
              <p className="mt-3">Method: {order.paymentMethod}</p>
              <p>Payment: {order.payment ? 'Done' : 'Pending'}</p>
              <p>Date: {new Date(order.date).toLocaleString()}</p>
            </div>
            <div className="text-sm sm:text-[15px] font-medium">
              {currency}{order.amount}
            </div>
            <select 
              className="border font-semibold rounded p-2"
              value={order.status}
              onChange={(e) => updateOrderStatus(order._id, e.target.value)}
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
