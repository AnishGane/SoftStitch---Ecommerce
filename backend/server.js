import express from "express";
import cors from "cors";
import "dotenv/config";
import axios from "axios";
import connectDB from "./config/MongoDB.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRouter.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

//App Config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// CORS configuration
const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:5174'], // Add your frontend URLs
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'token'],
  credentials: true
};

//middleware
app.use(express.json());
app.use(cors(corsOptions));

//api endpoint

app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

// Khalti
const KHALTI_BASE = process.env.KHALTI_BASE_URL; // sandbox or production
const SECRET_KEY = process.env.KHALTI_SECRET_KEY;
app.post('/api/khalti/initiate', async (req, res) => {
  const payload = {
    return_url: req.body.return_url,
    website_url: req.body.website_url,
    amount: req.body.amount,        // in paisa
    purchase_order_id: req.body.purchase_order_id,
    purchase_order_name: req.body.purchase_order_name,
    customer_info: req.body.customer_info,
  };

  try {
    const response = await axios.post(
      `${KHALTI_BASE}/epayment/initiate/`,
      payload,
      { headers: { Authorization: `Key ${SECRET_KEY}` } }
    );
    res.json(response.data); // includes pidx & payment_url
  } catch (err) {
    res.status(err.response?.status || 500).json(err.response?.data || { error: err.message });
  }
});

app.post('/api/khalti/verify', async (req, res) => {
  try {
    const { pidx } = req.body;
    const response = await axios.post(
      `${KHALTI_BASE}/epayment/lookup/`,
      { pidx },
      { headers: { Authorization: `Key ${SECRET_KEY}` } }
    );
    res.json(response.data); // includes status/state
  } catch (err) {
    res.status(err.response?.status || 500).json(err.response?.data || { error: err.message });
  }
});

app.listen(port, () => console.log(`Listening on localhost:${port}`));
