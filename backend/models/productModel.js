import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: Array,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  subCategory: {
    type: String,
    required: true,
  },
  sizes: {
    type: Array,
    required: true,
  },
  bestseller: {
    type: Boolean,
    required: true,
  },
  date: {
    type: Number,
    required: true,
  },
});

// This line creates a model for the 'product' collection in MongoDB
// It first checks if the model already exists in mongoose.models.product
// If it exists, it uses that existing model to avoid model redefinition errors
// If it doesn't exist, it creates a new model using the productSchema we defined above
const productModel =
  mongoose.models.product || mongoose.model("Product", productSchema);

export default productModel;
