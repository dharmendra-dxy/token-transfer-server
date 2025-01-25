const express = require("express");
const router= express.Router();
const isAuthenticated = require("../middlewares/auth.middleware");

const {
    handlePostUserLogin,
    handlePostUserSignup,
    handleGetUserLogout,
    handlePutUserEditProfile,
    handleGetUserDetails,
} = require("../controllers/user.controller");


router.post("/signup", handlePostUserSignup);
router.post("/login", handlePostUserLogin);
router.get("/signup", handleGetUserLogout);

router.put("/editprofile", isAuthenticated, handlePutUserEditProfile);

router.get("/getuser", handleGetUserDetails);


module.exports = router;