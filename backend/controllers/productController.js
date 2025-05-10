import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// Function to add products
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      subCategory,
      price,
      sizes,
      bestseller,
    } = req.body;

    // Getting the 4 images
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item != undefined
    );

    // Creating the image url to be sent in image field with help of cloudinary
    let image_url = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    // Store the information in MongoDB
    const productData = {
      name,
      description,
      category,
      subCategory,
      price: Number(price),
      bestseller: bestseller == "true" ? true : false,
      sizes: JSON.parse(sizes),
      images: image_url,
      date: Date.now(),
    };

    const product = new productModel(productData);
    await product.save();

    // console.log(
    //   name,
    //   description,
    //   category,
    //   subCategory,
    //   price,
    //   sizes,
    //   bestseller
    // );
    // console.log(image_url);

    res.json({ success: true, message: "Product added successfully" });
  } catch (error) {
    console.log("Error in adding product:", error);
    res.json({
      message: `Error in adding product: ${error.message}`,
      success: false,
    });
  }
};

// Function to remove products
const removeProduct = async (req, res) => {};

// Function to list the products
const listProducts = async (req, res) => {};

// Function for single products info
const singleProduct = async (req, res) => {};

export { addProduct, removeProduct, listProducts, singleProduct };
