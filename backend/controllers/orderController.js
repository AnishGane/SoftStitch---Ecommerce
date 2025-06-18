import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import axios from "axios";

//placing order using COD Methood
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    if (!userId || !items || !amount || !address) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };
    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, {
      cartData: {},
    });

    res.json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//placing order using Khalti Methood
const placeOrderKhalti = async (req, res) => {
  try {
    const { userId, items, amount, address, token } = req.body;
    
    if (!userId || !items || !amount || !address || !token) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Verify the payment with Khalti
    const response = await axios.post("https://khalti.com/api/v2/payment/verify/", {
      token: token,
      amount: amount * 100, // Convert to paisa (Khalti expects amount in paisa)
    }, {
      headers: {
        "Authorization": `Key ${process.env.KHALTI_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (data.idx) {
      // Payment successful, create order
      const orderData = {
        userId,
        items,
        amount,
        address,
        paymentMethod: "Khalti",
        payment: true,
        date: Date.now(),
        status: "Processing",
        // paymentDetails: {
        //   transactionId: data.idx,
        //   paymentMethod: "Khalti",
        // }
      };

      const newOrder = new orderModel(orderData);
      await newOrder.save();

      // Clear user's cart
      await userModel.findByIdAndUpdate(userId, {
        cartData: {},
      });

      res.json({ 
        success: true, 
        message: "Payment successful and order placed",
        order: newOrder
      });
    } else {
      res.status(400).json({ 
        success: false, 
        message: "Payment verification failed" 
      });
    }
  } catch (error) {
    console.error("Error processing Khalti payment:", error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Displaying all order data for admin panel
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});

    res.json({success: true, orders});
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// user Order Data for frontend
const userOrders = async (req, res) => {
  try {
    const {userId} = req.body;

    const orders = await orderModel.find({userId});

    res.json({success: true, orders});
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update order status by admin panel
const updateStatus = async (req, res) => {
  try {
    const {orderId, status} = req.body;
    await orderModel.findByIdAndUpdate(orderId, {status});
    res.json({success: true, message: "Order status updated"});
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { placeOrder, placeOrderKhalti, allOrders, userOrders, updateStatus };
