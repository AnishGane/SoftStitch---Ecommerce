import orderModel from "../models/orderModel.js";

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
      cardData: {},
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
  } catch (error) {}
};

// Displaying all order data for admin panel
const allOrders = async (req, res) => {
  try {
  } catch (error) {}
};

// user Order Data for frontend
const userOrders = async (req, res) => {
  try {
  } catch (error) {}
};

// Update order status by admin panel
const updateStatus = async (req, res) => {
  try {
  } catch (error) {}
};

export { placeOrder, placeOrderKhalti, allOrders, userOrders, updateStatus };
