import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/MongoDB.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRouter.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import esewaRoute from "./routes/esewaRoute.js";

//App Config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// CORS configuration
const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:5174"], // Add your frontend URLs
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "token"],
  credentials: true,
};

//middleware
app.use(express.json());
app.use(cors(corsOptions));

//api endpoint

app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/esewa", esewaRoute);

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => console.log(`Listening on localhost:${port}`));
