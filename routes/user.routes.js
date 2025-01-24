const express = require("express");
const router= express.Router();

const {
    handlePostUserLogin,
    handlePostUserSignup,
    handleGetUserLogout,
} = require("../controllers/user.controller");


router.post("/signup", handlePostUserSignup);
router.post("/login", handlePostUserLogin);
router.get("/signup", handleGetUserLogout);

module.exports = router;