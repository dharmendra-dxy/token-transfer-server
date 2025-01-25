require("dotenv").config();

const User = require("../models/user.model");
const Account = require('../models/account.model');
const zod = require("zod");
const jwt = require("jsonwebtoken");
const JWT_SECRET=process.env.JWT_SECRET;


// zodSchema:

const signupZodSchema = zod.object({
    username: zod.string(),
    email: zod.string().email(),
    password: zod.string(),
});

const signinZodSchema = zod.object({
    email: zod.string().email(),
    password: zod.string(),
});

const updateProfileZodScehma = zod.object({
    username: zod.string(),
});


// [POST] handlePostUserSignup:
async function handlePostUserSignup(req,res){

    // check for input:
    const {success} = signupZodSchema.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message: "Invalid Inputs",
            success: false,
        })
    }

    // check for exisiting email:
    const exsistingUser= await User.findOne({
        email: req.body.email,
    })
    if(exsistingUser){
        return res.status(411).json({
            message: "Email alreay exists",
            success: false,
            user: exsistingUser,
        });
    }

    // create user:
    const user = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    });
    
    const userid = user._id;

    // create Account for the user and initialize money:
    await Account.create({
        userId: userid,
        balance: 1+ Math.random()*10000,
    });


    // create token for user using jwt:
    const token = jwt.sign({
        userid,
    }, JWT_SECRET);

    return res.status(200).json({
        message: "User created succesfully",
        token: token,
        success: true,
    });

    
}

// [POST] handlePostUserLogin:
async function handlePostUserLogin(req,res){

    const {email, password} = req.body;

    // zod validation:
   const {success} = signinZodSchema.safeParse(req.body);
   if(!success){
        return res.status(411).json({
            message: "Incorrect inputs",
            success: false,
        });
   } 

    // get user and compare password:
   const user = await User.signinUser(email, password);

    // if user: generate token and set cookies, else: invalid msg   
   if(user){

        // create token:
        const token = jwt.sign({
            userid: user._id,
        }, JWT_SECRET);

        // set cookies:
        res.cookie("token", token);

        return res.status(200).json({
            message: "Signed in successfully",
            success: true,
        });
   }
   else return res.status(411).json({
        message: "Invalid credentials",
        success: false,
   })

}

// [GET] handleGetUserLogout:
function handleGetUserLogout(req,res){

    // remove cookies:
    res.cookies("token","", {maxAge: 1});

    return res.status(200).json({
        message: "Logged out successfully",
        success: true,
    });
}

// [PUT] handlePutUserEditProfile
async function handlePutUserEditProfile(req,res){

    // check input:
    const {success} = updateProfileZodScehma.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message: "Enter relevant information",
            success: false,
        });
    }

    const userid = req.userid;
    const user = await User.findById(userid);
    if(!user){
        return res.status(404).json({
            message: "User not found",
            success: false,
        });
    }

    user.username = req.body.username;
    await user.save();

    return res.status(200).json({
        message: "User updated succesfully",
        success: true,
    });

}

// handleGetUserDetails
async function handleGetUserDetails(req,res){
    const filter = req.query.filter || "";

    const users = await User.find({
        username: {
            '$regex' : filter,
        },
    });

    return res.status(200).json({
        success: true,
        user: users.map(user => ({
            userid: user._id,
            username: user.username,
            email: user.email,
        })),
    });
}


module.exports = {
    handlePostUserLogin,
    handlePostUserSignup,
    handleGetUserLogout,
    handlePutUserEditProfile,
    handleGetUserDetails,
}

