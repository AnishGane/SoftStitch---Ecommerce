import express from "express";

import {
  placeOrder,
  placeOrderKhalti,
  allOrders,
  userOrders,
  updateStatus,
} from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";

const orderRouter = express.Router();

// For Admin
orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateStatus);

// Payment Features
orderRouter.post("/place", authUser, placeOrder); //COD Method
orderRouter.post("/khalti", authUser, placeOrderKhalti); //Khalti Method

// For User
orderRouter.post("/userorders", authUser, userOrders);

export default orderRouter;
