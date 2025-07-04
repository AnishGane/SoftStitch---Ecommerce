import express from "express";

import {
  placeOrder,
  allOrders,
  userOrders,
  updateStatus,
  placeOrderEsewa,
  updateOrderPaymentStatus,
} from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";

const orderRouter = express.Router();

// For Admin
orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateStatus);

// Payment Features
orderRouter.post("/place", authUser, placeOrder); //COD Method
orderRouter.post("/esewa", authUser, placeOrderEsewa);

// For User
orderRouter.post("/userorders", authUser, userOrders);
orderRouter.post("/updatePaymentStatus", authUser, updateOrderPaymentStatus);

export default orderRouter;
