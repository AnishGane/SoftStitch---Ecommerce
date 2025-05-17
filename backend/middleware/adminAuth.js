import jwt from "jsonwebtoken"
const adminAuth = async (req, res, next) =>{
    try {
        const {token} = req.headers;
        if(!token){
            return res.json({success:false, message: "Not an authorized Login"});
        }
        const token_decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(token_decoded !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            return res.json({success:false, message: "Not an authorized Login"});
        }
        // req.user = token_decoded;
        next();
      } catch (error) {
        console.log(error);
        res.status(401).json({ message: "Unauthorized" });
      }
}

export default adminAuth;