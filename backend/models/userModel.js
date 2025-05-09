import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    cartData: {
      type: Object,
      default: {},
    },
  },
  { minimize: false }
);
// The cartData field is defined as an Object type to store shopping cart information
// It has a default value of an empty object ({}) for new users
// The {minimize: false} option at the schema level prevents Mongoose from removing empty objects. This ensures that even if cartData is empty, it will still be stored in the database as {} rather than being omitted entirely.
// This is important for maintaining consistent document structure and avoiding potential issues when accessing the cartData property.

const userModel = mongoose.models.user || mongoose.model("User", userSchema);

export default userModel;
