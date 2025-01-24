require("dotenv").config();

const JWT_SECRET=process.env.JWT_SECRET;
const jwt= require("jsonwebtoken");

// authMiddleware:
function authMiddleware(req,res,next){
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startswith('Bearer')){
        return res.status(401).json({
            message: "No auth headers found",
            success: false,
        });
    }

    const token = authHeader.split(' ')[1];

    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        if(decoded.userid){
            req.userid = decoded.userid;
            next();
        }
        else{
            return res.status(403).json({
                message: "Invalid token",
                success: false,
            });
        }
    }
    catch(error){
        return res.status(403).json({
            message: "Error while authentication",
            success: false,
            error: error,
        });
    }
}

module.exports = authMiddleware;