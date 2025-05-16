import express from "express";
import {
  addProduct,
  removeProduct,
  listProducts,
  singleProduct,
} from "../controllers/productController.js";
import upload from "../middleware/multer.js";

const productRouter = express.Router();

// Route to add a new product
productRouter.post(
  "/add",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);
// Route to remove a product
// productRouter.delete("/remove/:id", removeProduct);
productRouter.post("/remove", removeProduct);
// Route to list all products
productRouter.get("/list", listProducts);
// Route to get a single product by ID
// productRouter.get("/single/:id", singleProduct);
productRouter.post("/single", singleProduct);

export default productRouter;
