import userModel from "../models/userModel.js";

// add to user cart
const addToCart = async (req, res) => {
    try {
        const {userId, itemId, size} = req.body;

        if (!userId || !itemId || !size) {
            return res.status(400).json({success: false, message: "Missing required fields"});
        }

        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({success: false, message: "User not found"});
        }

        let cartData = userData.cartData || {};
        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size] += 1;
            }else{
                cartData[itemId][size] = 1;
            }
        }else{
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }  
        
        await userModel.findByIdAndUpdate(userId, {cartData});

        res.status(200).json({success: true, message: "Item added to cart"});
    } catch (error) {
        console.error("Add to cart error:", error);
        res.status(500).json({success: false, message: "Internal server error"});
    }
}

//update the user cart
const updateCart = async (req, res) => {
    try{
        const {userId, itemId, size, quantity} = req.body;

        if (!userId || !itemId || !size || quantity === undefined) {
            return res.status(400).json({success: false, message: "Missing required fields"});
        }

        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({success: false, message: "User not found"});
        }

        let cartData = userData.cartData || {};
        if(quantity === 0){
            if (cartData[itemId] && cartData[itemId][size]) {
                delete cartData[itemId][size];
                if(Object.keys(cartData[itemId]).length === 0){
                    delete cartData[itemId];
                }
            }
        }else{
            if (!cartData[itemId]) {
                cartData[itemId] = {};
            }
            cartData[itemId][size] = quantity;
        }

        await userModel.findByIdAndUpdate(userId, {cartData});

        res.status(200).json({success: true, message: "Cart updated"});
    }catch(error){
        console.error("Update cart error:", error);
        res.status(500).json({success: false, message: "Internal server error"});
    }
}

// get user cart data
const getUserCart = async (req, res) => {
    try{
        const {userId} = req.body;
        
        if (!userId) {
            return res.status(400).json({success: false, message: "User ID is required"});
        }

        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({success: false, message: "User not found"});
        }

        let cartData = userData.cartData || {};
        res.status(200).json({success: true, cartData});
    }catch(error){
        console.error("Get cart error:", error);
        res.status(500).json({success: false, message: "Internal server error"});
    }
}

export { addToCart, updateCart, getUserCart }