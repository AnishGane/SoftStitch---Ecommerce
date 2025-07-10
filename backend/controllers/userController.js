import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// Route for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    // doesnot let user to login if no email registered
    if (!user) {
      return res
        .status(400)
        .json({ message: "User doestn't exist", success: false });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Invalid credentials", success: false });
    } else {
      const token = createToken(user._id);
      res.json({ user, success: true, token, username: user.name });
    }
  } catch (error) {
    console.log("Error in user login:", error);
    res.json({
      message: `Error in user login: ${error.message}`,
      success: false,
    });
  }
};

// Route for user register
const userRegister = async (req, res) => {
  // res.json({msg:"Register API Working"});
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const userExists = await UserModel.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ message: "User already exists", success: false });
    }

    // Validating email format and strong password
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ message: "Invalid email format", success: false });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
    }

    // hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = await UserModel({
      name,
      email,
      password: hashedpassword,
    });

    const user = await newUser.save();

    const token = createToken(user._id);
    res.json({ success: true, token, username: user.name });
  } catch (error) {
    console.log("Error in user registration:", error);
    res.json({
      message: `Error in user registration: ${error.message}`,
      success: false,
    });
  }
};

// Route for admin login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email == process.env.ADMIN_EMAIL &&
      password == process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export { loginUser, userRegister, adminLogin };
