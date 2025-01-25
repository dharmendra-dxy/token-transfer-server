require("dotenv").config();

const JWT_SECRET=process.env.JWT_SECRET;
const jwt= require("jsonwebtoken");


async function isAuthenticated(req,res,next){
    try{
        const token = req.cookies.token;

        if(!token){
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            });
        }

        const decode = await jwt.verify(token, JWT_SECRET);
        if(!decode){
            return res.status(401).json({
                message: "Invalid token",
                success: false,
            });
        }

        req.userid = decode.userid;
        next();
    }
    catch(error){
        console.log(error);
    }
}


module.exports = isAuthenticated;